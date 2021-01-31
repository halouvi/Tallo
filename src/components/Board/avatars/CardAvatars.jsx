import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { makeStyles } from '@material-ui/core'
import { blue, deepOrange, green, pink } from '@material-ui/core/colors'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500]
  },
  green: {
    color: '#fff',
    backgroundColor: green[500]
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500]
  }
}))

export const CardAvatars = ({ members }) => {
  const { users } = useSelector(state => state.boardReducer.board)

  const classes = useStyles()
  const colorsPick = idx => {
    switch (+idx) {
      case 0:
        return classes.blue
      case 1:
        return classes.green
      case 2:
        return classes.pink
      case 3:
        return classes.orange
      default:
        break
    }
  }

  return (
    users[0] && (
      <AvatarGroup max={4}>
        {members?.map((member, idx) => {
          const { fullname, imgUrl } = users.find(user => user._id === member) || {}
          return (
            fullname && (
              <Avatar
                key={member}
                alt={fullname}
                src={imgUrl ? imgUrl : '/'}
                className={colorsPick(idx)}
                // style={{zIndex:0}}
              />
            )
          )
        })}
      </AvatarGroup>
    )
  )
}
