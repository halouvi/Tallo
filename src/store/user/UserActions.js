import userService from '../../service/userService.js'
import { boardTypes, CLEAR_BOARD } from '../board/BoardActions.js'

export const userTypes = {
  SET_LOGGED_USER: 'SET_LOGGED_USER',
  SET_NEW_USER_BOARD: 'SET_NEW_USER_BOARD',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  SET_USER_BOARDS: 'SET_USER_BOARDS'
}

export const GET_USERS = query => async (dispatch, getState) => {
  return await userService.query(query)
}

export const TOKEN_LOGIN = () => async dispatch => {
  try {
    const { user, board } = await userService.tokenLogin()
    dispatch({ type: userTypes.SET_LOGGED_USER, payload: user })
    dispatch({ type: boardTypes.SET_BOARD, payload: board })
  } catch (err) {
  } finally {
    dispatch({ type: userTypes.SET_IS_LOADING, payload: false })
  }
}

export const LOGIN = creds => async dispatch => {
  try {
    const { user, board } = await userService.login(creds)
    dispatch({ type: userTypes.SET_LOGGED_USER, payload: user })
    dispatch({ type: boardTypes.SET_BOARD, payload: board })
  } catch (err) {
  } finally {
    dispatch({ type: userTypes.SET_IS_LOADING, payload: false })
  }
}

export const SIGNUP = creds => async dispatch => {
  const user = await userService.signup(creds)
  dispatch({ type: userTypes.SET_LOGGED_USER, payload: user })
}

export const LOGOUT = () => async dispatch => {
  await userService.logout()
  dispatch({ type: userTypes.SET_LOGGED_USER, payload: null })
  dispatch(CLEAR_BOARD())
}
