import { Button, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'
import { CardAvatar } from '../../../Avatars/CardAvatar'
import { PopoverHeader } from '../../PopoverHeader'

export const CardMembersPopover = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.boardReducer.board.users) || []
  const { _id: cardId = '', members = [] } = useSelector(state => state.boardReducer.card) || {}

  const [{ activeMembers, searchTerm, searchRes }, setState] = useState({
    activeMembers: [],
    searchTerm: '',
    searchRes: []
  })

  const updateState = ev => {
    setState({
      activeMembers: users.filter(({ _id }) => members.includes(_id)),
      searchTerm: ev ? ev.target.value : searchTerm,
      searchRes: users.filter(
        ({ _id, name }) =>
          !members.includes(_id) && RegExp(ev ? ev.target.value : searchTerm, 'i').test(name)
      )
    })
  }

  useEffect(updateState, [users, members])

  const toggleMember = userId => {
    dispatch(
      UPDATE_CARD({
        cardId,
        name: 'members',
        value: members.includes(userId)
          ? members.filter(memberId => memberId !== userId)
          : [...members, userId]
      })
    )
  }

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
        {activeMembers.map(user => (
          <Button
            key={user._id}
            classes={{ label: 'flex ac js gr10 sbl' }}
            onClick={() => toggleMember(user._id)}>
            <CardAvatar user={user} size="small" />
            <span className="capital tas">{user.name}</span>
            <span>X</span>
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
              onClick={() => toggleMember(user._id)}>
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
