import userService from '../../service/UserService.js'

export const types = {
  GET_USER_BY_ID: 'GET_USER_BY_ID',
  SET_LOGGED_USER: 'SET_LOGGED_USER'
}

export const GET_USER_BY_ID = id => async dispatch => {
  const user = await userService.getById(id);
  return user;
  // dispatch({ type: types.GET_USER_BY_ID, payload: user })
}

export const LOGIN = ({email, password}) => async dispatch => {
  const user = await userService.login({email, password});
  dispatch({ type: types.SET_LOGGED_USER, user })
}

export const SIGNUP = ({fullname, email, password, imgUrl}) => async dispatch => {
  const user = await userService.signup({fullname, email, password, imgUrl});
  dispatch({ type: types.SET_LOGGED_USER, user })
}

export const LOGOUT = () => async dispatch => {
  await userService.logout();
  const user = {};
  dispatch({ type: types.SET_LOGGED_USER, user })
}

