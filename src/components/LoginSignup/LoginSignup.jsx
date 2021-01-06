import { Popover } from '@material-ui/core'
import { useState } from 'react'


export const LoginSingup = props => {
  const [user, setUser] = useState({});


  return (
    <div className="login-signup-section">
        <h2>Login</h2>
        <input type="text" name="" id=""/>
        <h2>Signup</h2>
        <input type="text" name="" id=""/>

    </div>
  )
}
