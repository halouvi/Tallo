import { ListHeader } from 'components/Board/List/ListHeader/ListHeader'
import { CardPreview } from 'components/Board/CardPreview/CardPreview'
import { AddCard } from 'components/Board/List/AddCard/AddCard'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { usePopover } from 'components/Popover/Popover'
import { useToggle } from 'react-use'

export const List = ({ list, idx }) => {
  const { _id: listId, cards } = list

  const [isTitleBlurred, setIsTitleBlurred] = useToggle(true)

  const dragClass = ({ isDropAnimating, isDragging }) => {
    return isDropAnimating ? ' dropping' : isDragging ? ' dragging' : ''
  }

  const placeholderClass = ({ isDraggingOver }) => {
    return `placeholder${!isDraggingOver ? ' hidden' : ''}`
  }

  const togglePopover = usePopover()

  return (
    <Draggable draggableId={listId} index={idx} disableInteractiveElementBlocking={isTitleBlurred}>
      {({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
        <div {...draggableProps} ref={innerRef} className={`list flex col`}>
          <div className={`list-container gray flex col${dragClass(snapshot)}`}>
            <ListHeader
              list={list}
              dragHandleProps={dragHandleProps}
              setIsTitleBlurred={setIsTitleBlurred}
            />
            <Droppable droppableId={listId} type="CARD">
              {({ droppableProps, placeholder, innerRef }, snapshot) => (
                <div
                  {...droppableProps}
                  ref={innerRef}
                  className="cards flex col gb6"
                  onScroll={togglePopover}>
                  {cards.map((card, idx) => (
                    <CardPreview key={card._id} card={card} idx={idx} />
                  ))}
                  <div className={placeholderClass(snapshot)}>{placeholder}</div>
                </div>
              )}
            </Droppable>
            <AddCard listId={listId} />
          </div>
        </div>
      )}
    </Draggable>
  )
}
