import { useSetState, useUpdateEffect } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../../../service/userService'
import { UPDATE_BOARD } from '../../../../store/board/BoardActions'
import { CardAvatar } from '../../../Avatars/CardAvatar'
import { TextField } from '@material-ui/core'
import { PopoverHeader } from '../../PopoverHeader'

export const BoardMembersPopover = ({ setAnchorEl }) => {
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
    setState({ filteredRes: searchRes.filter(res => !users.some(user => res._id === user._id)) })
  }, [searchRes, users])

  const toggleUser = user => {
    dispatch(
      UPDATE_BOARD({
        name: 'users',
        value: users.includes(user) ? users.filter(currUser => currUser !== user) : [...users, user]
      })
    )
  }

  return (
    <div className="members popover-cmp flex col gb12">
      <PopoverHeader title="Board Members" />
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
            className={`btn  sbl${user._id === userId ? ' logged-user' : ''}`}
            key={user._id}
            onClick={() => toggleUser(user)}>
            <CardAvatar user={user} size="small" />
            <span className="capital">{user.name}</span>
            <span>{user._id !== userId ? 'X' : '(You)'}</span>
          </button>
        ))}
      </div>
      {filteredRes[0] && (
        <>
          <b>Users</b>
          <div className="flex col gb2">
            {filteredRes.map(user => (
              <button className="btn  sbl" key={user._id} onClick={() => toggleUser(user)}>
                <CardAvatar user={user} size="small" />
                <span className="capital fg1">{user.name}</span>
                <span>+</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
