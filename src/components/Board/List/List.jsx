import { ClickAwayListener } from '@material-ui/core'
import { useState, useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { HANDLE_DROP } from '../../../store/board/BoardActions'
import { CardPreview } from '../CardPreview/CardPreview'
import { ListHeader } from './ListHeader/ListHeader'
import { AddCard } from './AddCard/AddCard'
import { CardDropZone } from './CardDropZone'

export const List = ({ list, isDragLayer }) => {
  const rectRef = useRef(null)
  const dispatch = useDispatch()

  const { _id: listId, cards } = list

  const [isDragging, drag] = useDrag({
    collect: monitor => monitor.isDragging(),
    item: { type: 'LIST' },
    begin: () => {
      const { height, width } = rectRef.current.getBoundingClientRect()
      return {
        type: 'LIST',
        list,
        sourceId: listId,
        width,
        height
      }
    }
  })

  const [{ cardOver, listOver, hoverWidth, hoverHeight, posOffset }, drop] = useDrop({
    accept: !isDragLayer ? ['LIST', 'CARD'] : '',
    collect: monitor => {
      const { left, width } = rectRef.current?.getBoundingClientRect() || {}
      const mouseX = monitor.getClientOffset()?.x
      return {
        posOffset: left + width / 2 > mouseX ? 0 : 1,
        hoverWidth: monitor.getItem()?.width || 0,
        hoverHeight: monitor.getItem()?.height || 0,
        listOver: monitor.isOver() && monitor.getItemType() === 'LIST',
        cardOver: monitor.getItem()?.overListId === listId
      }
    },
    canDrop: ({ type }) => type === 'LIST' || cardOver,
    drop: item => dispatch(HANDLE_DROP({ ...item, posOffset, targetId: listId }))
  })

  // useEffect(() => {
  //   cardOver && console.log(listId)
  // }, [cardOver])

  return (
    <div ref={drop} className={`list-drop-container${isDragging ? ' hidden' : ''}`}>
      <div ref={rectRef} className="rect-ref flex">
        {listOver && !posOffset && (
          <div
            className="placeholder left"
            style={{
              width: `${hoverWidth}px`,
              height: `${hoverHeight}px`
            }}
          />
        )}
        <div ref={!isDragLayer ? drag : null} className={`list gray flex col gb6`}>
          <ListHeader list={list} />
          <div className="cards flex col">
            {cards.map(card => (
              <CardPreview key={card._id} card={card} />
            ))}
            {cardOver && (
              <div className="card-placeholder" style={{ height: `${hoverHeight}px` }} />
            )}
          </div>
          <AddCard listId={listId} />
        </div>
        {listOver && !!posOffset && (
          <div
            className="list-placeholder right"
            style={{
              width: `${hoverWidth}px`,
              height: `${hoverHeight}px`
            }}
          />
        )}
      </div>
      <CardDropZone listId={listId} />
    </div>
  )
}
