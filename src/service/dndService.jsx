import { usePopover } from 'components/Popover/Popover'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { boardTypes, HANDLE_DROP } from 'store/board/BoardActions'

export const DndProvider = ({ children }) => {
  const dispatch = useDispatch()
  const togglePopover = usePopover()

  const onDragStart = ev => {
    document.activeElement.blur()
    togglePopover(ev)
    dispatch({ type: boardTypes.SET_DRAG_TYPE, payload: ev.type })
  }

  const onDragEnd = res => {
    dispatch(HANDLE_DROP(res))
    dispatch({ type: boardTypes.SET_DRAG_TYPE, payload: null })
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  )
}
