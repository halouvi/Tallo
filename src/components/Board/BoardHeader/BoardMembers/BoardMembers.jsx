import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { UPDATE_BOARD } from '../../../../store/board/BoardActions'
import { GET_USERS } from '../../../../store/user/UserActions'

export const BoardMembers = ({ users, setAnchorEl }) => {
  const [searchRes, setSearchRes] = useState([])
  const dispatch = useDispatch()

  // useEffect(() => console.log(searchRes), [searchRes])

  const handleInput = async ({ target: { value } }) => {
    if (value) dispatch(GET_USERS(value)).then(res => setSearchRes(res))
    else setSearchRes([])
  }

  const addUser = ({ target: { value: userId } }) => {
    console.log(userId)
    dispatch(UPDATE_BOARD({ name: 'users', value: [...users, userId] }))
  }

  const removeUser = ({ target: { value: userId } }) => {
    const usersFiltered = users.filter(user => user._id !== userId)
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
            ({ _id, fullname }) => (
              // users.some(member => member._id === _id) && (
              <button className="flex jb" key={_id} value={_id} onClick={removeUser}>
                <span>{fullname}</span>
                <span>X</span>
              </button>
            )
            // )
          )}
      </div>
      {searchRes[0] && (
        <div className="list flex col">
          <span className="bold">Users</span>
          {searchRes?.map(
            res => (
              // users.every(user => user._id !== res._id) && (
              <button className="flex ac jb" key={res._id} value={res._id} onClick={addUser}>
                <span>{res.fullname}</span>
                <span>+</span>
              </button>
            )
            // )
          )}
          {/* <pre>{searchRes[0]?._id}</pre> */}
        </div>
      )}
    </div>
  )
}
