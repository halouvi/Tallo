import AvatarGroup from '@material-ui/lab/AvatarGroup'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import { capitalize, colorPicker } from 'pages/service/utilService'

export const CardAvatars = ({ users, max, className, size = 'medium' }) => {
  return (
    <div className={className}>
      <AvatarGroup max={max}>
        {users.map(({ _id, name, imgUrl }) => (
          <Tooltip title={capitalize(name)} arrow key={_id}>
            <Avatar
              src={imgUrl || '/'}
              alt={capitalize(name)}
              className={`avatar ${size} ${imgUrl ? 'white' : colorPicker(name)}`}
            />
          </Tooltip>
        ))}
      </AvatarGroup>
    </div>
  )
}
