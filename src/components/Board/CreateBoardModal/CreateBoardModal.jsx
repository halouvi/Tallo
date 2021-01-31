import utilService from '../../../service/utilService'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ADD_BOARD } from '../../../store/board/BoardActions'

export const CreateBoardModal = ({ setIsModalOpen }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.userReducer.user)
  const [newBoard, setNewBoard] = useState({
    title: '',
    labels: [
      { _id: utilService.makeId(), name: 'Not Started', color: 'red' },
      { _id: utilService.makeId(), name: 'In Progress', color: 'orange' },
      { _id: utilService.makeId(), name: 'QA', color: 'yellow' },
      { _id: utilService.makeId(), name: 'Done', color: 'green' },
      { _id: utilService.makeId(), name: 'Production', color: 'blue' }
    ],
    users: [user],
    lists: [
      { _id: utilService.makeId(), title: 'To Do', cards: [] },
      { _id: utilService.makeId(), title: 'Doing', cards: [] },
      { _id: utilService.makeId(), title: 'Done', cards: [] },
      { _id: utilService.makeId(), title: 'QA', cards: [] }
    ],
    activity: []
  })

  useEffect(() => {
    document.addEventListener('keyup', closeModal)
    return () => document.removeEventListener('keyup', closeModal)
  }, [])

  const closeModal = ({ type, key }) => {
    if (type === 'click' || key === 'Escape') setIsModalOpen(false)
  }

  const handleInput = ({ target: { name, value } }) => {
    setNewBoard({ ...newBoard, [name]: value })
  }

  const addBoard = () => {
    dispatch(ADD_BOARD(newBoard))
    history.push('/board')
  }

  return (
    <div className="modal-screen flex col ac js" onClick={closeModal}>
      <div className="create-board-section" onClick={ev => ev.stopPropagation()}>
        <div className="create-board-container">
          <div className="title-container">
            <h2>Add a Board</h2>
            <button className="exit-btn" onClick={closeModal}>
              X
            </button>
          </div>
          <label htmlFor="">Board Title:</label>
          <input name="title" type="text" value={newBoard.title} onChange={handleInput} />
          <button onClick={addBoard}>Create Board</button>
        </div>
      </div>
    </div>
  )
}
