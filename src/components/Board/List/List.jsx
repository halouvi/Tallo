import { ClickAwayListener } from '@material-ui/core'
import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { ADD_CARD, HANDLE_DROP } from '../../../store/board/BoardActions'
import { CardPreview } from '../CardPreview/CardPreview'
import { useToggle, useUpdateEffect } from 'react-use'
import { ListHeader } from './ListHeader/ListHeader'
import { AddCard } from './AddCard/AddCard'

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
    accept: ['CARD', 'LIST'],
    canDrop: ({ sourceId, type }, monitor) =>
      monitor.isOver() &&
      (type === 'LIST' ||
        (type === 'CARD' && (!cards[0] || (!cards[1] && cards[0]._id === sourceId)))),
    collect: monitor => {
      if (monitor.canDrop()) {
        const { left, width } = rectRef.current.getBoundingClientRect()
        const mouseX = monitor.getClientOffset().x
        return {
          posOffset: left + width / 2 > mouseX ? 0 : 1,
          hoverWidth: monitor.getItem().width,
          hoverHeight: monitor.getItem().height,
          listOver: monitor.getItemType() === 'LIST',
          cardOver: monitor.getItemType() === 'CARD'
        }
      } else return {}
    },
    drop: item => dispatch(HANDLE_DROP({ ...item, posOffset, targetId: listId }))
  })

  return (
    <div
      ref={!isDragLayer ? drop : null}
      className={`list-drop-container${isDragging ? ' hidden' : ''}`}>
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
              <div className="placeholder-card" style={{ height: `${hoverHeight}px` }} />
            )}
          </div>
          <AddCard listId={listId} />
        </div>
        {listOver && !!posOffset && (
          <div
            className="placeholder right"
            style={{
              width: `${hoverWidth}px`,
              height: `${hoverHeight}px`
            }}
          />
        )}
      </div>
    </div>
  )
}
