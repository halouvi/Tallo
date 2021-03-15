import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../../../../store/user/UserActions'
import { useHistory } from 'react-router'
import { usePopover } from '../../Popover'
import { MenuList } from '@material-ui/core'

export default function UserMenu({ togglePopover }) {
  const user = useSelector(state => state.userReducer.user) || {}

  // const [anchorEl, setAnchorEl] = React.useState(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const toHome = ev => {
    togglePopover(ev)
    history.push('/')
  }

  const onLogout = ev => {
    togglePopover(ev)
    dispatch(LOGOUT())
    history.push('/')
  }

  const onLogin = ev => {
    togglePopover(ev)
    history.push('/login-signup')
  }

  return (
    <MenuList className="popover-cmp small flex col list-br">
      <MenuItem onClick={toHome}>Home</MenuItem>
      {user._id ? (
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      ) : (
        <MenuItem onClick={onLogin}>Login/Signup</MenuItem>
      )}
    </MenuList>
  )
}
