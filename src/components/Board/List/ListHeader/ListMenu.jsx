import { useDispatch, useSelector } from 'react-redux'
import { DELETE_LIST } from '../../../../store/board/BoardActions'

export const ListMenu = ({ togglePopover }) => {
  const listId = useSelector(state => state.boardReducer.list?._id)

  const dispatch = useDispatch()

  const removeList = ev => {
    dispatch(DELETE_LIST(listId))
    togglePopover(ev)
  }

  return (
    <div className="list-menu reusable flex col">
      <span className="title asc">Delete List?</span>
      <div className="flex">
        <button className="btn gray" onClick={removeList}>
          Delete
        </button>
        <button className="btn gray" onClick={togglePopover}>
          Cancel
        </button>
      </div>
    </div>
  )
}
