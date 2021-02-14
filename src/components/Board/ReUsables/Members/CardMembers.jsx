import { TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'
import { CardAvatar } from '../../avatars/CardAvatar'

export const CardMembers = ({ card, togglePopover, setAnchorEl }) => {
  const { _id: cardId, members } = card || {}
  const { users } = useSelector(state => state.boardReducer.board) || {}
  const [searchTerm, setSearchTerm] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [membersToShow, setMembersToShow] = useState([])
  const dispatch = useDispatch()

  const handleInput = ({ target: { value } }) => setSearchTerm(value)

  useEffect(() => {
    setMembersToShow(users.filter(({ _id }) => members.includes(_id)))
    setSearchRes(
      users.filter(
        ({ _id, fullname }) =>
          !members.includes(_id) && fullname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, users, members])

  const toggleMember = ({ currentTarget: { value } }) => {
    dispatch(
      UPDATE_CARD({
        cardId,
        name: 'members',
        value: members.includes(value)
          ? members.filter(memberId => memberId !== value)
          : [...members, value]
      })
    )
  }

  return (
    <div className="members reusable flex col gb12">
      <div className="flex ac jb">
        <i className="invisible btn trans small">X</i>
        <span className="title bold asc">Members</span>
        <button className="btn trans small" onClick={togglePopover}>
          X
        </button>
      </div>
      <TextField
        size="small"
        label="Search Members"
        variant="outlined"
        value={searchTerm}
        onChange={handleInput}
      />
      <div className="flex col gb2">
        {membersToShow.map(user => (
          <button className="btn trans sbl" key={user._id} value={user._id} onClick={toggleMember}>
            <CardAvatar user={user} size="small" />
            <span className="capital">{user.fullname}</span>
            <span>X</span>
          </button>
        ))}
      </div>
      {searchRes[0] && (
        <>
          <b>Board Members</b>
          <div className="flex col gb2">
            {searchRes.map(user => (
              <button
                className="btn trans sbl"
                key={user._id}
                value={user._id}
                onClick={toggleMember}>
                <CardAvatar user={user} size="small" />
                <span className="capital">{user.fullname}</span>
                <span>+</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
