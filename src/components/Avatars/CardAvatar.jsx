import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import { capitalize, colorPicker } from '../../service/utilService'

export const CardAvatar = ({
  user: { name, imgUrl },
  size = 'medium',
  tooltip,
  className,
  onClick = () => {}
}) => {
  return (
    <Tooltip title={capitalize(name)} arrow disableHoverListener={!tooltip}>
      <div className={className} onClick={onClick}>
        <Avatar
          alt={capitalize(name)}
          src={imgUrl || '/'}
          className={`avatar ${size} ${imgUrl ? 'white' : colorPicker(name)}`}
        />
      </div>
    </Tooltip>
  )
}
