import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_BOARD } from '../../../../store/board/BoardActions'
import { GET_USERS } from '../../../../store/user/UserActions'

export const BoardMembers = ({ boardMembers, setAnchorEl }) => {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(boardMembers)
  }, [])

  const onHandleChange = async (ev) => {
    const value = ev.target.value;
    if(value) {
      dispatch(GET_USERS(value)).then(res => setUsers(res));
    } else setUsers([])
  }

  const addMember = member => {
    console.log('adding user...', member);
    dispatch(UPDATE_BOARD({ name: 'users', value: [...boardMembers, member] }))
  }

  const removeMember = memberId => {
    const membersFiltered = boardMembers.filter(member => member._id !== memberId)
    dispatch(UPDATE_BOARD({ name: 'users', value: membersFiltered }))
  }

  return (
    <div className="members reusable flex col">
      <button className="close-btn pos-tr" onClick={() => setAnchorEl(null)}>
        X
      </button>
      <span className="title bold asc">Members</span>
      <input
        type="text"
        placeholder="Search Members"
        onChange={onHandleChange}
      />
      <div className="list flex col">
        {users && users[0] && users?.map(
          user =>
          boardMembers.some(member => member._id === user._id) && (
              <div className="flex jb" key={user._id}>
                <span>{user.fullname}</span>
                <button onClick={() => removeMember(user._id)}>X</button>
              </div>
            )
        )}
      </div>
      {users && users[0] && (
        <div className="list flex col">
          <span className="bold">Users</span>
          {users.map(user =>
          boardMembers.every(member => member._id !== user._id) && (
            <div className="flex jb" key={user._id}>
              <span>{user.fullname}</span>
              <button onClick={() => addMember(user)}>+</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
