import { useSelector } from 'react-redux'
import { CardAvatars } from '../../avatars/CardAvatars'
import { CardMembersPopup } from '../../ReUsables/Members/CardMembers'

export const CardMembers = ({ togglePopover = () => {} }) => {
  const members = useSelector(state => state.boardReducer.card.members)
  const users = useSelector(state => state.boardReducer.board.users)
  const activeUsers = users.filter(({ _id }) => members.includes(_id))

  return members[0] ? (
    <div className="members wfc ml32 gb6 pointer" onClick={ev => togglePopover(ev, CardMembersPopup)}>
      <h4>Members</h4>
      <CardAvatars users={activeUsers} max={12} size="medium" />
    </div>
  ) : (
    <></>
  )
}
