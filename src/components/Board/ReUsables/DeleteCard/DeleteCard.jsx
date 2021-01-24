import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { DELETE_CARD } from '../../../../store/board/BoardActions'

export const DeleteCard = ({ card, togglePopover }) => {
  const dispatch = useDispatch()
  const { push } = useHistory()

  const deleteCard = () => {
    dispatch(DELETE_CARD(card._id))
    push('/board')
  }
  
  return (
    <div className="reusable flex col">
      <span className="title asc">Delete Card?</span>
      <div className="flex">
        <button className="modal-btn" onClick={deleteCard}>
          Delete
        </button>
        <button className="modal-btn" onClick={togglePopover}>
          Cancel
        </button>
      </div>
    </div>
  )
}
