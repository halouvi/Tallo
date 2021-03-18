import { userService } from '../../pages/service/userService.js'
import { boardTypes, CLEAR_BOARD } from '../board/BoardActions.js'

export const userTypes = {
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_LOGGED_USER: 'SET_LOGGED_USER',
  SET_NEW_USER_BOARD: 'SET_NEW_USER_BOARD',
  SET_USER_BOARDS: 'SET_USER_BOARDS'
}

export const DEMO_LOGIN = () => async dispatch => {
  var res
  try {
    res = await userService.login()
  } catch (err) {
    try {
      res = await userService.login({ email: 'deni@avdija.com', password: '123' })
    } catch (err) {
      console.error(`DEMO_LOGIN ${err}`)
    }
  } finally {
    if (res) {
      dispatch({ type: userTypes.SET_LOGGED_USER, payload: res.user })
      dispatch({ type: boardTypes.SET_BOARD, payload: res.board })
    }
    dispatch({ type: userTypes.SET_IS_LOADING, payload: false })
  }
}

export const LOGIN = creds => async dispatch => {
  try {
    const { user, board } = await userService.login(creds)
    dispatch({ type: userTypes.SET_LOGGED_USER, payload: user })
    dispatch({ type: boardTypes.SET_BOARD, payload: board })
  } catch (err) {
    console.error(`LOGIN ${err}`)
  }
}

export const SIGNUP = creds => async dispatch => {
  try {
    const { user } = await userService.signup(creds)
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
