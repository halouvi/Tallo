import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { UPDATE_BOARD } from '../../../../store/board/BoardActions'
import { GET_USERS } from '../../../../store/user/UserActions'

export const BoardMembers = ({ users, setAnchorEl }) => {
  const [searchRes, setSearchRes] = useState([])
  const dispatch = useDispatch()

  useEffect(() => console.log(searchRes), [searchRes])

  const handleInput = async ({ target: { value } }) => {
    if (value) dispatch(GET_USERS(value)).then(res => setSearchRes(res))
    else setSearchRes([])
  }

  const addUser = user => {
    dispatch(UPDATE_BOARD({ name: 'users', value: [...users, user] }))
  }

  const removeUser = user => {
    const usersFiltered = users.filter(usr => usr._id !== user._id)
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
        {users[0] &&
          users.map(
            user => (
              // users.some(member => member._id === _id) && (
              <div className="flex jb" key={user._id} onClick={() => removeUser(user)}>
                <span>{user.fullname}</span>
                <button>X</button>
              </div>
            )
            // )
          )}
      </div>
      {searchRes[0] && (
        <div className="list flex col">
          <span className="bold">Users</span>
          {searchRes?.map(
            user =>
              users.every(usr => usr._id !== user._id) && (
                <div className="flex ac jb" key={user._id} onClick={() => addUser(user)}>
                  <span>{user.fullname}</span>
                  <button>+</button>
                </div>
              )
          )}
          {/* <pre>{searchRes[0]?._id}</pre> */}
        </div>
      )}
    </div>
  )
}
