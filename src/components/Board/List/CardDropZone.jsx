import { useDrop } from 'react-dnd'
// import { useDispatch } from 'react-redux'
// import { HANDLE_DROP } from '../../../store/board/BoardActions'

export const CardDropZone = ({ listId }) => {
  // const dispatch = useDispatch()

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: item => (item.overListId = listId),
  })

  return <div className="drop-zone" ref={drop} />
}
