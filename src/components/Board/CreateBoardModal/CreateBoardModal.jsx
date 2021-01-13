import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { ADD_BOARD } from '../../../store/board/BoardActions'


export const CreateBoardModal = props => {
  const [newBoard, setNewBoard] = useState({
    title: '',
  })
  const dispatch = useDispatch();
  const history = useHistory();
  // const outClick = useRef();

  // useEffect(() => {
  //   document.addEventListener('keyup', closeModal)
  //   document.getElementById('root').addEventListener('mouseup', closeModal)
  //   return () => {
  //     document.removeEventListener('keyup', closeModal)
  //     document.getElementById('root').removeEventListener('mouseup', closeModal)
  //   }
  // }, [])

  // const closeModal = ev => {
  //   if (ev.key === 'Escape' || outClick.current === ev.target) history.push('/board')
  // }

  const onHandleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    setNewBoard({ ...newBoard, [field]: value })
    console.log(newBoard);
  }

  const addBoard = async () => {
    await dispatch(ADD_BOARD(newBoard));
    // history.push('/board');
    history.push('/');
  }


  return (
    <div className="create-board-section">
      <div className="create-board-container">
        <label htmlFor="">Board Title:</label>
        <input name="title" type="text" value={newBoard.title} onChange={onHandleChange} />
        <button onClick={addBoard}>Create Board</button>
      </div>
    </div>
  )
}
