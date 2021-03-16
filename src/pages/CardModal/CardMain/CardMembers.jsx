import { Portal } from '@material-ui/core'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CardAvatars } from '../../../components/Avatars/CardAvatars'
import { usePopover } from '../../../components/Popover/Popover'
import { CardMembersPopover } from '../../../components/Popover/PopoverCmps/Members/CardMembersPopover'

export const CardMembers = ({ members }) => {
  const users = useSelector(state => state.boardReducer.board.users)
  const activeUsers = users.filter(({ _id }) => members.includes(_id))
  const togglePopover = usePopover()
  const anchorId = 'CardMembersAnchor'

  const [{ left, width, bottom }, setRect] = useState({})

  const openPopover = ev => {
    setRect(ev.currentTarget.getBoundingClientRect())
    togglePopover(ev, CardMembersPopover, false, anchorId)
  }
  return (
    <div>
      {activeUsers[0] && (
        <div className={`ml32 gb6 pointer`} onClick={openPopover}>
          <h4>Members</h4>
          <CardAvatars users={activeUsers} max={12} size="medium" />
        </div>
      )}
      <Portal>
        <div
          style={{ position: 'absolute', top: `${bottom}px`, left: `${left + width / 2}px` }}
          anchorid={anchorId}
        />
      </Portal>
    </div>
  )
}
