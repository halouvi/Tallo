import { Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'

export const Trash = () => {
  const dragType = useSelector(state => state.boardReducer.dragType)

  const classPicker = ({ isDraggingOver }) => {
    return `trash ${dragType !== 'CARD' ? ' invisible' : isDraggingOver ? ' red' : 'trans'}`
  }

  return (
    <Droppable droppableId="TRASH" type="CARD">
      {({ droppableProps, placeholder, innerRef }, snapshot) => (
        <section ref={innerRef} {...droppableProps} className={classPicker(snapshot)}>
          Drop here to delete
          <div className="hidden">{placeholder}</div>
        </section>
      )}
    </Droppable>
  )
}
