import { useDispatch } from 'react-redux'
import { LOGIN, SIGNUP } from '../../store/user/UserActions'
import { mediaService } from '../../service/mediaService.js'
import { useHistory } from 'react-router'
import { useKey, useToggle, useUpdateEffect } from 'react-use'
import { userService } from '../../service/userService'
import { useState } from 'react'
import { TextField } from '@material-ui/core'
import { useInput } from 'hooks/useInput'

export const LoginSingup = () => {
  const dispatch = useDispatch()
  const { goBack, push } = useHistory()
  const [emailAvailable, setEmailAvailable] = useToggle(true)
  const [timer, setTimer] = useState(null)
  const [creds, setCreds] = useInput({ email: '', password: '' })
  const [user, setUser] = useInput({
    name: '',
    email: '',
    password: '',
    imgUrl: '',
    boards: []
  })

  useKey('Escape', goBack)

  useUpdateEffect(() => {
    clearTimeout(timer)
    setEmailAvailable(true)
    if (!user.email) return
    setTimer(
      setTimeout(async () => {
        const res = await userService.validateEmail(user.email)
        setEmailAvailable(res)
      }, 300)
    )
  }, [user.email])

  const login = async ev => {
    ev.preventDefault()
    dispatch(LOGIN(creds))
    push('/board')
  }

  const signup = async ev => {
    ev.preventDefault()
    if (!emailAvailable) return
    dispatch(SIGNUP(user))
    push('/board')
  }

  const uploadImg = async ev => {
    const { secure_url } = await mediaService.uploadImg(ev)
    setUser({ imgUrl: secure_url })
  }

  return (
    <div className="modal-screen" onClick={goBack}>
      <div className="login-signup gb20" onClick={ev => ev.stopPropagation()}>
        <form className="login-form gb10" onSubmit={login}>
          <div className="flex ac jb">
            <h2>Login</h2>
            <button className="btn " onClick={goBack}>
              X
            </button>
          </div>
          <TextField
            variant="outlined"
            label="Email"
            size="small"
            type="email"
            name="email"
            value={creds.email}
            onChange={setCreds}
          />

          <TextField
            variant="outlined"
            label="Password"
            size="small"
            type="password"
            name="password"
            value={creds.password}
            onChange={setCreds}
          />
          <button className="btn blue large">Login</button>
        </form>
        {/* <div className="forms-seperator">-Or-</div> */}
        <form className="signup-form gb10" onSubmit={signup}>
          <h2>Signup</h2>
          <TextField
            variant="outlined"
            label="Name"
            size="small"
            name="name"
            value={user.name}
            onChange={setUser}
          />
          <TextField
            variant="outlined"
            label="Email"
            size="small"
            type="email"
            name="email"
            value={user.email}
            onChange={setUser}
          />

          <TextField
            variant="outlined"
            label="Password"
            size="small"
            type="password"
            name="password"
            value={user.password}
            onChange={setUser}
          />
          <label>
            <p>Upload a Profile Picture:</p>
            <img
              src="https://res.cloudinary.com/ariecloud/image/upload/v1611571897/tallo/PinClipart.com_button-clipart_321890_rkdp7l.png"
              alt=""
            />
            <input className="upload-img" type="file" name="imgUrl" onChange={uploadImg} />
          </label>
          <button className="btn blue large">Signup</button>
        </form>
      </div>
    </div>
  )
}
