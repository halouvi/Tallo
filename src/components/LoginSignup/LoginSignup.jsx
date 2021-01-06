import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { LOGIN, SIGNUP } from '../../store/user/UserActions';


export const LoginSingup = props => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [userCred, setUserCred] = useState({
    name: '',
    email: '',
    password: '',
    imgUrl: ''
  });

  useEffect(() => {
    console.log(props);
  }, [])

  const onHandleChange = (ev, type) => {
    const field = ev.target.name;
    const value = ev.target.value;
    if (type === 'login') setUser({ ...user, [field]: value })
    else setUserCred({ ...userCred, [field]: value })
    console.log(userCred);
  }

  const login = async (ev) => {
    ev.preventDefault();
    await dispatch(LOGIN(user));
    
  }

  const signup = (ev) => {
    ev.preventDefault();
    dispatch(SIGNUP(userCred));
  }


  return (
    <div className="login-signup-section">
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
        <input type="text" name="name" value={userCred.name} onChange={(event) => onHandleChange(event, 'signup')} id="" />
        <label htmlFor="">Email:</label>
        <input type="text" name="email" value={userCred.email} onChange={(event) => onHandleChange(event, 'signup')} id="" />
        <label htmlFor="">Password:</label>
        <input type="text" name="password" value={userCred.password} onChange={(event) => onHandleChange(event, 'signup')} id="" />
        <button>Signup</button>
      </form>
    </div>
  )
}
