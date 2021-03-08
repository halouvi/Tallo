import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import { capitalize, colorPicker } from '../../service/utilService'

export const CardAvatar = ({ user, size = 'medium', tooltip, className }) => {
  return (
    <Tooltip title={capitalize(user.name)} arrow disableHoverListener={!tooltip}>
      <div className={className}>
        <Avatar
          alt={capitalize(user.name)}
          src={user.imgUrl || '/'}
          className={`avatar ${size} ${user.imgUrl ? 'white' : colorPicker(user.name)}`}
        />
      </div>
    </Tooltip>
  )
}
