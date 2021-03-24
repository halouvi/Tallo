import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from 'store/user/UserActions'
import { useHistory } from 'react-router'
import { MenuList } from '@material-ui/core'

export default function UserMenu({ togglePopover }) {
  const user = useSelector(state => state.userReducer.user) || {}

  const dispatch = useDispatch()
  const history = useHistory()

  const toHome = ev => {
    history.push('/')
    togglePopover(ev)
  }

  const onLogout = ev => {
    dispatch(LOGOUT())
    history.push('/')
    togglePopover(ev)
  }

  const onLogin = ev => {
    history.push('/login-signup')
    togglePopover(ev)
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
