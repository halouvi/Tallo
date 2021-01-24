import userService from '../../service/userService.js'
import { CLEAR_BOARD_STORE } from '../board/BoardActions.js';

export const types = {
  GET_USER_BY_ID: 'GET_USER_BY_ID',
  SET_LOGGED_USER: 'SET_LOGGED_USER',
  SET_USER_BOARDS: 'SET_USER_BOARDS'
}


export const SET_BOARDS = userBoards => dispatch => {
  // const users = await userService.query(q);
  // return users;
  userService.setUserBoards(userBoards);
  console.log(userBoards);
  dispatch({ type: types.SET_USER_BOARDS, userBoards })
}

export const GET_USERS = q => async dispatch => {
  const users = await userService.query(q);
  return users;
  // dispatch({ type: types.GET_USER_BY_ID, payload: user })
}

export const GET_USER_BY_ID = id => async dispatch => {
  const user = await userService.getById(id);
  return user;
  // dispatch({ type: types.GET_USER_BY_ID, payload: user })
}

export const LOGIN = ({email, password}) => async dispatch => {
  const {user, userBoards} = await userService.login({email, password});
  dispatch({ type: types.SET_LOGGED_USER, user })
  dispatch({ type: types.SET_USER_BOARDS, userBoards })
}

export const SIGNUP = ({fullname, email, password, imgUrl, boards}) => async dispatch => {
  const user = await userService.signup({fullname, email, password, imgUrl, boards});
  dispatch({ type: types.SET_LOGGED_USER, user })
}

export const LOGOUT = () => async dispatch => {
  await userService.logout();
  const user = {};
  const userBoards = [];
  dispatch({ type: types.SET_LOGGED_USER, user })
  dispatch({ type: types.SET_USER_BOARDS, userBoards })
  dispatch(CLEAR_BOARD_STORE())
}

