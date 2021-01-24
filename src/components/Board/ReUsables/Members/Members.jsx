import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'

export const Members = ({ card: { members, _id }, togglePopover }) => {
  const { users } = useSelector(state => state.boardReducer.board)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchRes, setSearchRes] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    setSearchRes(
      users.filter(
        user =>
          members.every(member => member !== user._id) &&
          (user.fullname.includes(searchTerm) || user.email.includes(searchTerm))
      )
    )
  }, [searchTerm, members])

  const addMember = member => {
    dispatch(UPDATE_CARD({ name: 'members', value: [...members, member], _id }))
  }

  const removeMember = memberId => {
    const membersFiltered = members.filter(member => member !== memberId)
    dispatch(UPDATE_CARD({ name: 'members', value: membersFiltered, _id }))
  }

  return (
    <div className="members reusable flex col">
      <button className="close-btn pos-tr" onClick={togglePopover}>
        X
      </button>
      <span className="title bold asc">Members</span>
      <input
        type="text"
        placeholder="Search Members"
        value={searchTerm}
        onChange={ev => setSearchTerm(ev.target.value)}
      />
      <div className="list flex col">
        {users.map(
          user =>
            members.some(member => member === user._id) && (
              <div className="flex jb" key={user._id}>
                <span>{user.fullname}</span>
                <button onClick={() => removeMember(user._id)}>X</button>
              </div>
            )
        )}
      </div>
      {searchTerm && (
        <div className="list flex col">
          <span className="bold">Board Members</span>
          {searchRes.map(user => (
            <div className="flex jb" key={user._id}>
              <span>{user.fullname}</span>
              <button onClick={() => addMember(user._id)}>+</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
