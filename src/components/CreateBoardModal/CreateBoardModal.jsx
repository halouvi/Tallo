import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useKey } from 'react-use'
import { ADD_BOARD } from '../../store/board/BoardActions'

export const CreateBoardModal = ({ toggleModal }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [title, setTitle] = useState('')

  useKey('Escape', toggleModal)

  const handleInput = ({ target: { value } }) => setTitle(value)

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
            <input value={title} onChange={handleInput} />
          </label>
          <button onClick={addBoard}>Create Board</button>
        </div>
      </div>
    </div>
  )
}
