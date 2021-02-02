import userService from '../../service/userService.js'
import { boardTypes, CLEAR_BOARD } from '../board/BoardActions.js'

export const userTypes = {
  SET_LOGGED_USER: 'SET_LOGGED_USER',
  SET_NEW_USER_BOARD: 'SET_NEW_USER_BOARD',
  SET_USER_BOARDS: 'SET_USER_BOARDS'
}

export const TOKEN_LOGIN = () => async dispatch => {
  try {
    const { user, board } = await userService.tokenLogin()
    dispatch({ type: userTypes.SET_LOGGED_USER, payload: user })
    dispatch({ type: boardTypes.SET_BOARD, payload: board })
  } catch (err) {
    throw err
  }
}

export const LOGIN = creds => async dispatch => {
  try {
    const { user, board } = await userService.login(creds)
    dispatch({ type: userTypes.SET_LOGGED_USER, payload: user })
    dispatch({ type: boardTypes.SET_BOARD, payload: board })
  } catch (err) {
    console.error(err)
  }
}

export const SIGNUP = creds => async dispatch => {
  try {
    const user = await userService.signup(creds)
    dispatch({ type: userTypes.SET_LOGGED_USER, payload: user })
  } catch (err) {
    console.error(err)
  }
}

export const LOGOUT = () => async dispatch => {
  try {
    await userService.logout()
    dispatch({ type: userTypes.SET_LOGGED_USER, payload: null })
    dispatch(CLEAR_BOARD())
  } catch (err) {
    console.error(err)
  }
}
