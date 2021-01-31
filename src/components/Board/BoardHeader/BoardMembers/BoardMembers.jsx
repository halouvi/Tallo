import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_BOARD } from '../../../../store/board/BoardActions'
import { GET_USERS } from '../../../../store/user/UserActions'

export const BoardMembers = ({ setAnchorEl }) => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.boardReducer.board.users) || {}
  const loggedUser = useSelector(state => state.userReducer.user._id) || {}
  const [searchRes, setSearchRes] = useState([])
  const [filteredRes, setFilteredRes] = useState([])

  useUpdateEffect(() => {
    setFilteredRes(searchRes.filter(res => !users.some(user => user._id === res._id)))
  }, [searchRes, users])

  const handleInput = ({ target: { value } }) => {
    if (value) dispatch(GET_USERS(value)).then(res => setSearchRes(res))
    else setSearchRes([])
  }

  const addUser = ({ currentTarget: { value } }) => {
    const user = searchRes.find(user => user._id === value)
    dispatch(UPDATE_BOARD({ name: 'users', value: [...users, user] }))
  }

  const removeUser = ({ currentTarget: { value } }) => {
    if (value === loggedUser) return
    const usersFiltered = users.filter(user => user._id !== value)
    dispatch(UPDATE_BOARD({ name: 'users', value: usersFiltered }))
  }

  return (
    <div className="members reusable board-members flex col">
      <button className="close-btn pos-tr" onClick={() => setAnchorEl(null)}>
        X
      </button>
      <span className="title bold asc">Members</span>
      <input type="text" placeholder="Search Members" onChange={handleInput} />
      <div className="list flex col">
        {users.map(({ _id, fullname }) => (
          <button
            className={`flex ac jb${_id === loggedUser ? ' logged-user' : ''}`}
            key={_id}
            value={_id}
            onClick={removeUser}>
            <span>{fullname}</span>
            <span>X</span>
          </button>
        ))}
      </div>
      {filteredRes[0] && (
        <div className="list flex col">
          <span className="bold">Users</span>
          {filteredRes.map(({ _id, fullname }) => (
            <button className="flex ac jb" key={_id} value={_id} onClick={addUser}>
              <span>{fullname}</span>
              <span>+</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
