import utilService from '../../../service/utilService'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useKey, useSetState } from 'react-use'
import { ADD_BOARD } from '../../../store/board/BoardActions'

export const CreateBoardModal = ({ toggleModal }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.userReducer.user)
  const [newBoard, setNewBoard] = useSetState({
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

  useKey('Escape', toggleModal)

  const handleInput = ({ target: { name, value } }) => setNewBoard({ [name]: value })

  const addBoard = () => {
    dispatch(ADD_BOARD(newBoard))
    toggleModal()
    history.push('/board')
  }

  return (
    <div className="modal-screen flex col ac js" onClick={toggleModal}>
      <div className="create-board-section" onClick={ev => ev.stopPropagation()}>
        <div className="create-board-container">
          <div className="title-container">
            <h2>Add a Board</h2>
            <button className="exit-btn" onClick={toggleModal}>
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
