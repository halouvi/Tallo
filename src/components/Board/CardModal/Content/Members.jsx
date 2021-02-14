import { useSelector } from 'react-redux'
import { CardAvatars } from '../../avatars/CardAvatars'
import { CardMembers } from '../../ReUsables/Members/CardMembers'

export const Members = ({ togglePopover = () => {} }) => {
  const members = useSelector(state => state.boardReducer.card.members)
  const users = useSelector(state => state.boardReducer.board.users)

  const membersWithUserData = users.filter(({ _id }) => members.includes(_id))

  return members[0] ? (
    <div className="members wfc gb6 pointer ml30" onClick={ev => togglePopover(ev, CardMembers)}>
      <h4>Members</h4>
      <CardAvatars users={membersWithUserData} max={12} size="medium" />
    </div>
  ) : (
    <></>
  )
}
