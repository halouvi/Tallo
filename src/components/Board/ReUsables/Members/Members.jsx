import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'

export const Members = ({ card: { members, _id: cardId }, setAnchorEl }) => {
  const { users } = useSelector(state => state.boardReducer.board)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const searchRes = users?.filter(user =>
    members.every(member => member._id !== user._id) &&
    (user.name.includes(searchTerm) || user.email.includes(searchTerm))
  )
  const addMember = member => {
    dispatch(UPDATE_CARD({ field: 'members', value: [...members, member], cardId }))
  }

  const removeMember = memberId => {
    const membersClone = members.filter(member => member._id !== memberId)
    dispatch(UPDATE_CARD({ field: 'members', value: membersClone, cardId }))
  }

  return (
    <div className="members flex col">
      <span className="title asc">Members</span>
      <button className="close-btn pos-tr" onClick={() => setAnchorEl(null)}>
        X
      </button>
      <input
        type="text"
        placeholder="Search Members"
        value={searchTerm}
        onChange={ev => setSearchTerm(ev.target.value)}
      />
      <div className="list flex col">
        {members.map(member => (
          <div className="flex jb" key={member._id}>
            <span>{member.name}</span>
            <button onClick={() => removeMember(member._id)}>X</button>
          </div>
        ))}
      </div>
      {searchTerm && (
        <div>
          <span>BOARD MEMBERS</span>
          <div className="list flex col">
            {searchRes.map(user => (
              <div className="flex jb" key={user._id}>
                <span>{user.name}</span>
                <button onClick={() => addMember(user)}>+</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
