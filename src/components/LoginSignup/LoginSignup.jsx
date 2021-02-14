import { useDispatch } from 'react-redux'
import { LOGIN, SIGNUP } from '../../store/user/UserActions'
import { mediaService } from '../../service/mediaService.js'
import { useHistory } from 'react-router'
import { useRef } from 'react'
import { useKey, useSetState, useToggle, useUpdateEffect } from 'react-use'
import { userService } from '../../service/userService'
import { useEffect } from 'react'
import { useState } from 'react'
import { TextField } from '@material-ui/core'

export const LoginSingup = () => {
  const dispatch = useDispatch()
  const { goBack, push } = useHistory()
  const [emailAvailable, setEmailAvailable] = useState(true)
  const [timer, setTimer] = useState(null)
  const [creds, setCreds] = useSetState({
    email: '',
    password: ''
  })
  const [user, setUser] = useSetState({
    fullname: '',
    email: '',
    password: '',
    imgUrl: '',
    boards: []
  })

  useKey('Escape', goBack)

  // const handleInputLogin = ev => console.log(ev.target.name)
  const handleInputLogin = ({ target: { name, value } }) => setCreds({ [name]: value })
  const handleInputSignup = ({ target: { name, value } }) => setUser({ [name]: value })

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
            <button className="btn trans" onClick={goBack}>
              X
            </button>
          </div>
          <TextField
            size="small"
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            value={creds.email}
            onChange={handleInputLogin}
          />

          <TextField
            size="small"
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            value={creds.password}
            onChange={handleInputLogin}
          />
          <button className="btn blue large">Login</button>
        </form>
        {/* <div className="forms-seperator">-Or-</div> */}
        <form className="signup-form gb10" onSubmit={signup}>
          <h2>Signup</h2>
          <TextField
            size="small"
            label="Name"
            name="fullname"
            variant="outlined"
            value={user.fullname}
            onChange={handleInputSignup}
          />
          <TextField
            size="small"
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            value={user.email}
            onChange={handleInputSignup}
          />

          <TextField
            size="small"
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            value={user.password}
            onChange={handleInputSignup}
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
