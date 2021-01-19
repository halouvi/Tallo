import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { LOGIN, SIGNUP } from '../../store/user/UserActions';
import { uploadImg } from '../../service/imgUploadService.js'
import { useHistory } from 'react-router';
import { useRef } from 'react';

export const LoginSingup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const outClick = useRef();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [userCred, setUserCred] = useState({
    fullname: '',
    email: '',
    password: '',
    imgUrl: '',
    boards: []
  });

  useEffect(() => {
    document.addEventListener('keyup', closeModal)
    document.getElementById('root').addEventListener('mouseup', closeModal)
    return () => {
      document.removeEventListener('keyup', closeModal)
      document.getElementById('root').removeEventListener('mouseup', closeModal)
    }
  }, [])

  const closeModal = ({ key, target, type }) => {
    if (type === 'keyup' && key === 'Escape') history.goBack()
    else if (type === 'mouseup' && !outClick.current.contains(target)) history.goBack()
  }

  const onHandleChange = (ev, type) => {
    const field = ev.target.name;
    const value = ev.target.value;
    if (type === 'login') setUser({ ...user, [field]: value })
    else setUserCred({ ...userCred, [field]: value })
  }

  const login = async (ev) => {
    ev.preventDefault();
    await dispatch(LOGIN(user));
    history.push('/board');
  }

  const signup = async (ev) => {
    ev.preventDefault();
    await dispatch(SIGNUP(userCred));
    history.push('/board');
  }

  const onUploadImg = async (ev) => {
    const res = await uploadImg(ev);
    console.log(res.url);
    setUserCred({ ...userCred, imgUrl: res.url })
  }

  return (
    <div className="login-signup-section">
      <div className="login-signup-container" ref={outClick}>
        <button className="exit-btn" onClick={history.goBack}>X</button>
        <h2>Login</h2>
        <form action="" className="login-form" onSubmit={login}>
          <label htmlFor="">Email:</label>
          <input type="text" name="email" value={user.email} onChange={(event) => onHandleChange(event, 'login')} id="" />
          <label htmlFor="">Password:</label>
          <input type="text" name="password" value={user.password} onChange={(event) => onHandleChange(event, 'login')} id="" />
          <button>Login</button>
        </form>
        <div className="forms-seperator">
          -Or-
        </div>
        <h2>Signup</h2>
        <form action="" className="signup-form" onSubmit={signup}>
          <label htmlFor="">Full Name:</label>
          <input type="text" name="fullname" value={userCred.fullname} onChange={(event) => onHandleChange(event, 'signup')} id="" />
          <label htmlFor="">Email:</label>
          <input type="text" name="email" value={userCred.email} onChange={(event) => onHandleChange(event, 'signup')} id="" />
          <label htmlFor="">Password:</label>
          <input type="text" name="password" value={userCred.password} onChange={(event) => onHandleChange(event, 'signup')} id="" />
          <label htmlFor="imgUrl">
            <p>Upload a Profile Picture:</p>
            <img src="https://cdn.onlinewebfonts.com/svg/img_192880.png" alt=""/>
          </label>
          <input className="upload-img" type="file" name="imgUrl" onChange={onUploadImg} id="imgUrl" />
          <button>Signup</button>
        </form>
      </div>
    </div>
  )
}
