import { Button, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'
import { CardAvatar } from '../../../Avatars/CardAvatar'
import { PopoverHeader } from '../../PopoverHeader'
import x from 'assets/img/x.svg'

export const CardUsersPopover = () => {
  const dispatch = useDispatch()
  const gUsers = useSelector(state => state.boardReducer.board.users) || []
  const { _id: cardId = '', users = [] } = useSelector(state => state.boardReducer.card) || {}

  const [{ activeUsers, searchTerm, searchRes }, setState] = useState({
    activeUsers: [],
    searchTerm: '',
    searchRes: []
  })

  const updateState = ev => {
    setState({
      activeUsers: gUsers.filter(({ _id }) => users.includes(_id)),
      searchTerm: ev?.target.value ?? searchTerm,
      searchRes: gUsers.filter(
        ({ _id, name }) =>
          !users.includes(_id) && RegExp(ev?.target.value ?? searchTerm, 'i').test(name)
      )
    })
  }

  const toggleUser = ({ currentTarget: { value } }) => {
    dispatch(
      UPDATE_CARD({
        cardId,
        name: 'users',
        value: users.includes(value) ? users.filter(userId => userId !== value) : [...users, value]
      })
    )
  }

  useEffect(updateState, [gUsers, users])

  return (
    <div className="popover-cmp flex col gb6">
      <PopoverHeader title="Card Members" />
      <TextField
        size="small"
        variant="outlined"
        label="Search Members"
        value={searchTerm}
        onChange={updateState}
      />
      <div className="flex col gb6">
        {activeUsers.map(user => (
          <Button
            key={user._id}
            classes={{ label: 'flex ac js gr10 sbl' }}
            value={user._id}
            onClick={toggleUser}>
            <CardAvatar user={user} size="small" />
            <span className="capital tas">{user.name}</span>
            <img src={x} alt="" className="icon small" />{' '}
          </Button>
        ))}
      </div>
      {searchRes[0] && (
        <div className="flex col gb6">
          <span className="tac">Board Members</span>
          {searchRes.map(user => (
            <Button
              key={user._id}
              classes={{ label: 'flex ac js gr10 sbl' }}
              value={user._id}
              onClick={toggleUser}>
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
