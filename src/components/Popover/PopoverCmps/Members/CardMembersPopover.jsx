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
    <div className="popover-cmp flex col gb6">
      <PopoverHeader title="Card Members" />
      <TextField
        className="mb6"
        size="small"
        variant="outlined"
        label="Search Members"
        value={searchTerm}
        onChange={updateState}
      />
      {activeMembers.map(user => (
        <Button key={user._id} className=" flex js" value={user._id} onClick={toggleMember}>
          <CardAvatar className="" user={user} size="small" />
          <span className="capital ml6 fg1 tas">{user.name}</span>X
        </Button>
      ))}
      {searchRes[0] && (
        <>
          <b className="tac">Board Members</b>
          {searchRes.map(user => (
            <Button
              key={user._id}
              className=" flex js"
              value={user._id}
              onClick={toggleMember}>
              <CardAvatar className="" user={user} size="small" />
              <span className="capital ml6 fg1 tas">{user.name}</span>X
            </Button>
          ))}
        </>
      )}
    </div>
  )
}
