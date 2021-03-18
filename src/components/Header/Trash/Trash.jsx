import { img } from 'assets/img'
import { Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { ReactSVG } from 'react-svg'

export const Trash = () => {
  const dragType = useSelector(state => state.boardReducer.dragType)

  const classPicker = ({ isDraggingOver }) => {
    return `trash ${dragType !== 'CARD' ? ' invisible' : isDraggingOver ? ' red' : 'trans'}`
  }

  const isTrashOpen = ({ isDraggingOver }) => {
    return `trashcan${isDraggingOver ? ' hovererd' : ''}`
  }

  return (
    <Droppable droppableId="TRASH" type="CARD">
      {({ droppableProps, placeholder, innerRef }, snapshot) => (
        <section ref={innerRef} {...droppableProps} className={classPicker(snapshot)}>
          <span className={isTrashOpen(snapshot)}>
            <span></span>
            <i></i>
          </span>
          Drop here to delete
          <div className="hidden">{placeholder}</div>
        </section>
      )}
    </Droppable>
  )
}
