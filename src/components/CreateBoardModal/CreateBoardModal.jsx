import { useInput } from 'hooks/useInput'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useKey, useLockBodyScroll } from 'react-use'
import { ADD_BOARD } from 'store/board/BoardActions'

export const CreateBoardModal = ({ toggleModal }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [title, setTitle] = useInput('')

  useKey('Escape', toggleModal)
  
  useLockBodyScroll()

  const addBoard = () => {
    dispatch(ADD_BOARD(title))
    toggleModal()
    history.push('/board')
  }

  return (
    <div className="modal-screen" onClick={toggleModal}>
      <div className="create-board-section" onClick={ev => ev.stopPropagation()}>
        <div className="create-board-container">
          <div className="title-container">
            <h2>Add a Board</h2>
            <button className="exit-btn" onClick={toggleModal}>
              X
            </button>
          </div>
          <label className="flex col">
            Board Title:
            <input value={title} onChange={setTitle} />
          </label>
          <button onClick={addBoard}>Create Board</button>
        </div>
      </div>
    </div>
  )
}
