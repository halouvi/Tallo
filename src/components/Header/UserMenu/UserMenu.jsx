import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../../store/user/UserActions'
import { useHistory } from 'react-router'

export default function UserMenu({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClick = ({ currentTarget }) => setAnchorEl(currentTarget)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toHome = () => {
    handleClose()
    history.push('/')
  }

  const onLogout = () => {
    handleClose()
    dispatch(LOGOUT())
    history.push('/')
  }
  const onLogin = () => {
    handleClose()
    history.push('/login-signup')
  }

  return (
    <div className="simple-menu-section">
      <div
        className="menu-btn"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        {user?.imgUrl ? (
          <img src={user.imgUrl} alt="" className={anchorEl ? 'border' : ''} />
        ) : (
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        )}
      </div>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}>
        <MenuItem onClick={toHome}>Home</MenuItem>
        {user?._id ? (
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        ) : (
          <MenuItem onClick={onLogin}>Login/Signup</MenuItem>
        )}
      </Menu>
    </div>
  )
}
