import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { HANDLE_DROP } from 'store/board/BoardActions'
import { useRect } from 'react-use-rect'
import { memo, useState } from 'react'
import { ListHeader } from 'components/Board/List/ListHeader/ListHeader'
import { CardPreview } from 'components/Board/CardPreview/CardPreview'
import { AddCard } from 'components/Board/List/AddCard/AddCard'

export const List = memo(({ list }) => {
  const dispatch = useDispatch()

  const { _id: listId, cards } = list

  const [{ width, height, left }, rectRef] = useRect()

  const [isDragging, drag] = useDrag({
    collect: mon => mon.isDragging(),
    item: { type: 'list', sourceId: listId, list, width, height }
  })

  const [hovPos, setHovPos] = useState(0)
  const [{ type: hovType, width: hovWidth, height: hovHeight }, drop] = useDrop({
    accept: ['list', 'card'],
    collect: mon => (mon.isOver({ shallow: true }) ? mon.getItem() : {}),
    hover: (_, mon) => hovHeight && setHovPos(left + width / 2 > mon.getClientOffset().x ? 0 : 1),
    canDrop: () => hovType,
    drop: item => dispatch(HANDLE_DROP({ ...item, hovPos, targetId: listId }))
  })

  return (
    <div ref={drop} className={`list-drop-container${isDragging ? ' hidden' : ''}`}>
      <div ref={rectRef} className="rect-ref flex">
        {hovType === 'list' && (
          <div
            className="list-placeholder"
            style={{
              order: hovPos,
              paddingLeft: `${hovPos * 12}px`,
              width: `${hovWidth}px`,
              height: `${hovHeight}px`
            }}
          />
        )}
        <div ref={drag} className={`list gray flex col gb6`}>
          <ListHeader list={list} />
          <div className="cards flex col">
            {cards.map(card => (
              <CardPreview key={card._id} card={card} />
            ))}
            {hovType === 'card' && (
              <div className="card-placeholder" style={{ height: `${hovHeight}px` }} />
            )}
          </div>
          <AddCard listId={listId} />
        </div>
      </div>
    </div>
  )
})
