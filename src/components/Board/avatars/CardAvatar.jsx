import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import { capitalize, colorPicker } from '../../../service/utilService'

export const CardAvatar = ({ user: { fullname, imgUrl }, size = 'medium', tooltip, className }) => {
  return (
    <Tooltip title={capitalize(fullname)} arrow disableHoverListener={!tooltip}>
      <div className={className}>
        <Avatar
          alt={capitalize(fullname)}
          src={imgUrl || '/'}
          className={`avatar ${size} ${imgUrl ? 'white' : colorPicker(fullname)}`}
        />
      </div>
    </Tooltip>
  )
}
