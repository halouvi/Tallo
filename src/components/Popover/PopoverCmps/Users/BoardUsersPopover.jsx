import { useUpdateEffect } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../../../service/userService'
import { DELETE_FROM_BOARD, UPDATE_BOARD } from '../../../../store/board/BoardActions'
import { CardAvatar } from '../../../Avatars/CardAvatar'
import { Button, TextField } from '@material-ui/core'
import { PopoverHeader } from '../../PopoverHeader'
import x from 'assets/img/x.svg'
import { useInput } from 'hooks/useInput'
import { useState } from 'react'

const USERS = 'users'

export const BoardUsersPopover = () => {
  const users = useSelector(state => state.boardReducer.board.users)
  const userId = useSelector(state => state.userReducer.user._id)

  const [searchTerm, setSearchTerm] = useInput('')
  const [searchRes, setSearchRes] = useState([])
  const [filteredRes, setFilteredRes] = useState([])

  useUpdateEffect(async () => {
    setSearchRes(searchTerm ? await userService.query(searchTerm) : [])
  }, [searchTerm])

  useUpdateEffect(() => {
    setFilteredRes(searchRes.filter(res => users.every(user => res._id !== user._id)))
  }, [searchRes, users])


  const dispatch = useDispatch()
  const addUser = user => dispatch(UPDATE_BOARD({ name: USERS, value: user }))
  const removeUser = userId => dispatch(DELETE_FROM_BOARD({ name: USERS, value: userId }))

  const isMe = _id => _id === userId

  return (
    <div className="popover-cmp flex col gb6">
      <PopoverHeader title="Board Members" />
      <TextField
        autoFocus
        size="small"
        value={searchTerm}
        onChange={setSearchTerm}
        variant="outlined"
        label="Search Members"
      />
      <div className="flex col gb6 ">
        {users.map(user => (
          <Button
            className={isMe(user._id) ? 'first' : ''}
            classes={{ label: 'flex ac js gr10 sbl' }}
            key={user._id}
            disabled={isMe(user._id)}
            onClick={() => removeUser(user._id)}>
            <CardAvatar user={user} size="small" />
            <span className="capital tas">{user.name}</span>
            {isMe(user._id) ? <b>(You)</b> : <img src={x} alt="" className="icon small" />}
          </Button>
        ))}
      </div>
      {filteredRes[0] && (
        <div className="flex col gb6">
          <span className="tac">Members</span>
          {filteredRes.map(user => (
            <Button
              classes={{ label: 'flex ac js gr10 sbl' }}
              key={user._id}
              onClick={() => addUser(user)}>
              <CardAvatar user={user} size="small" />
              <span className="capital tas">{user.name}</span>
              <span>+</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
