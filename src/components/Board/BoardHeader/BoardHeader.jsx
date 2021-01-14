import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GET_USERS } from '../../../store/user/UserActions'
import CustomizedMenus from './BoardsSelect/BoardsSelect'
import SimplePopover from './Popover/Popover'

export const BoardHeader = ({ userBoards, boardTitle, boardMembers }) => {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch();

  const onHandleChange = async (ev) => {
    const value = ev.target.value;
    if(value) {
      const res = dispatch(GET_USERS(value));
      setUsers(res);
    } else setUsers([])
  }

  const history = useHistory()


  return (
    <div className="board-header-section">
      <CustomizedMenus userBoards={userBoards}></CustomizedMenus>
      <h2>{boardTitle}</h2>
      <SimplePopover boardMembers={boardMembers}></SimplePopover>
      <input type="text" onChange={onHandleChange} />
    </div>
  )
}
