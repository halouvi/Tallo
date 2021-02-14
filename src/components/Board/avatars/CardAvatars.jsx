import AvatarGroup from '@material-ui/lab/AvatarGroup'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import { capitalize, colorPicker } from '../../../service/utilService'

export const CardAvatars = ({ users, max, size = 'medium' }) => {
  return (
    <AvatarGroup max={max}>
      {users.map(({ _id, fullname, imgUrl }) => (
        <Tooltip title={capitalize(fullname)} arrow key={_id}>
          <Avatar
            src={imgUrl || '/'}
            alt={capitalize(fullname)}
            className={`avatar ${size} ${imgUrl ? 'white' : colorPicker(fullname)}`}
          />
        </Tooltip>
      ))}
    </AvatarGroup>
  )
}
