import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { HANDLE_DROP } from 'store/board/BoardActions'
import { useRect } from 'react-use-rect'
import { memo, useEffect, useMemo, useState } from 'react'
import { ListHeader } from 'components/Board/List/ListHeader/ListHeader'
import { CardPreview } from 'components/Board/CardPreview/CardPreview'
import { AddCard } from 'components/Board/List/AddCard/AddCard'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useListener } from 'react-bus'

export const List = memo(({ list, idx }) => {
  const { _id: listId, cards } = list

  const [isTitleBlurred, setIsTitleBlurred] = useState(true)
  return (
    <Draggable draggableId={listId} index={idx} disableInteractiveElementBlocking={isTitleBlurred}>
      {({ draggableProps, dragHandleProps, innerRef }, { isDragging, isDropAnimating }) => (
        <div {...draggableProps} ref={innerRef} className={`list`}>
          <Droppable droppableId={listId} type="CARD">
            {({ droppableProps, placeholder, innerRef }, { isDraggingOver }) => (
              <>
                <div {...droppableProps} ref={innerRef} className="drop-zone" />
                <div
                  className={`container gray flex col gb6${
                    isDropAnimating ? ' dropping' : isDragging ? ' dragging' : ''
                  }`}>
                  <ListHeader
                    list={list}
                    dragHandleProps={dragHandleProps}
                    setIsTitleBlurred={setIsTitleBlurred}
                  />
                  <div className="cards flex col">
                    {cards.map((card, idx) => (
                      <CardPreview key={card._id} card={card} idx={idx} />
                    ))}
                    <div className={!isDraggingOver ? 'hidden' : ''}>{placeholder}</div>
                  </div>
                  <AddCard listId={listId} />
                </div>
              </>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
})
