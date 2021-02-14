import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../../../service/userService'
import { UPDATE_BOARD } from '../../../../store/board/BoardActions'
import { CardAvatar } from '../../avatars/CardAvatar'
import { TextField } from '@material-ui/core'

export const BoardMembers = ({ setAnchorEl }) => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.boardReducer.board.users)
  const userId = useSelector(state => state.userReducer.user._id)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [filteredRes, setFilteredRes] = useState([])

  const handleInput = ({ target: { value } }) => setSearchTerm(value)

  useUpdateEffect(async () => {
    setSearchRes(searchTerm ? await userService.query(searchTerm) : [])
  }, [searchTerm])

  useUpdateEffect(() => {
    setFilteredRes(searchRes.filter(res => !users.some(user => res._id === user._id)))
  }, [searchRes, users])

  const toggleUser = ({ currentTarget: { value } }) => {
    dispatch(
      UPDATE_BOARD({
        name: 'users',
        value: users.some(({ _id }) => _id === value)
          ? users.filter(({ _id }) => _id !== value)
          : [...users, filteredRes.find(({ _id }) => _id === value)]
      })
    )
  }

  return (
    <div className="members reusable flex col gb12">
      <div className="flex ac jb">
        <i className="invisible btn trans small">X</i>
        <span className="title bold asc">Members</span>
        <button className="btn trans small" onClick={() => setAnchorEl(null)}>
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
        {users.map(user => (
          <button
            className={`btn trans sbl${user._id === userId ? ' logged-user' : ''}`}
            key={user._id}
            value={user._id}
            onClick={toggleUser}>
            <CardAvatar user={user} size="small" />
            <span className="capital">{user.fullname}</span>
            <span>{user._id !== userId ? 'X' : '(You)'}</span>
          </button>
        ))}
      </div>
      {filteredRes[0] && (
        <>
          <b>Users</b>
          <div className="flex col gb2">
            {filteredRes.map(user => (
              <button
                className="btn trans sbl"
                key={user._id}
                value={user._id}
                onClick={toggleUser}>
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
