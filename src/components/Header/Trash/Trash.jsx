import { Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'

export const Trash = () => {
  const isDragging = useSelector(state => state.boardReducer.isDragging)

  return (
    <Droppable droppableId="TRASH" type="CARD">
      {({ droppableProps, placeholder, innerRef }, { isDraggingOver }) => (
        <section
          ref={innerRef}
          {...droppableProps}
          className={`trash ${!isDragging ? ' invisible' : isDraggingOver ? ' red' : 'trans'}`}>
          Drop here to delete
          <div className="hidden">{placeholder}</div>
        </section>
      )}
    </Droppable>
  )
}
