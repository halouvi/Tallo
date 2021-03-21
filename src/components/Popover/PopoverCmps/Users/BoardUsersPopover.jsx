import { useSetState, useUpdateEffect } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../../../service/userService'
import { DELETE_FROM_BOARD, UPDATE_BOARD } from '../../../../store/board/BoardActions'
import { CardAvatar } from '../../../Avatars/CardAvatar'
import { Button, TextField } from '@material-ui/core'
import { PopoverHeader } from '../../PopoverHeader'
import x from 'assets/img/x.svg'

export const BoardUsersPopover = ({ setAnchorEl }) => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.boardReducer.board.users)
  const userId = useSelector(state => state.userReducer.user._id)
  const [{ searchTerm, searchRes, filteredRes }, setState] = useSetState({
    searchTerm: '',
    searchRes: [],
    filteredRes: []
  })

  const handleInput = ({ target: { value } }) => setState({ searchTerm: value })

  useUpdateEffect(async () => {
    setState({ searchRes: searchTerm ? await userService.query(searchTerm) : [] })
  }, [searchTerm])

  useUpdateEffect(() => {
    setState({ filteredRes: searchRes.filter(res => users.every(user => res._id !== user._id)) })
  }, [searchRes, users])

  const toggleUser = user => {
    console.log(users.includes(user))
    dispatch(
      users.includes(user)
        ? DELETE_FROM_BOARD({ name: 'users', value: user._id })
        : UPDATE_BOARD({ name: 'users', value: user })
    )
  }

  const isMe = _id => _id === userId

  return (
    <div className="popover-cmp flex col gb6">
      <PopoverHeader title="Board Members" />
      <TextField
        size="small"
        variant="outlined"
        label="Search Members"
        value={searchTerm}
        onChange={handleInput}
      />
      <div className="flex col gb6 ">
        {users.map(user => (
          <Button
            className={isMe(user._id) ? 'first' : ''}
            classes={{ label: 'flex ac js gr10 sbl' }}
            key={user._id}
            disabled={isMe(user._id)}
            onClick={() => toggleUser(user)}>
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
              onClick={() => toggleUser(user)}>
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
