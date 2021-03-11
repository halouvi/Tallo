import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { HANDLE_DROP } from '../../../store/board/BoardActions'
import { CardPreview } from '../CardPreview/CardPreview'
import { ListHeader } from './ListHeader/ListHeader'
import { AddCard } from './AddCard/AddCard'
import { useRect } from 'react-use-rect'
import { useEffect, useState } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useSetState } from 'react-use'

export const List = ({ list, isDragLayer }) => {
  const dispatch = useDispatch()

  const { _id: listId, cards } = list

  const [{ width, height, left }, rectRef] = useRect()

  const [isDragging, drag, preview] = useDrag({
    collect: monitor => monitor.isDragging(),
    item: { type: 'list', sourceId: listId, list, width, height }
  })
  useEffect(() => preview(getEmptyImage()), [])


  const [posOffset, setPosOffset] = useState(0)
  const [{ cardOver, listOver, hoverWidth, hoverHeight }, drop] = useDrop({
    accept: !isDragLayer ? ['list', 'card'] : '',
    hover: (item, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        setPosOffset(left + width / 2 > monitor.getClientOffset().x ? 0 : 1)
      }
    },
    collect: monitor =>
      monitor.isOver({ shallow: true })
        ? {
            hoverWidth: monitor.getItem()?.width,
            hoverHeight: monitor.getItem()?.height,
            cardOver: monitor.getItemType() === 'card',
            listOver: monitor.getItemType() === 'list'
          }
        : {},
    canDrop: () => listOver || cardOver,
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
        <div ref={drag} className={`list gray flex col gb6`}>
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
    </div>
  )
}
