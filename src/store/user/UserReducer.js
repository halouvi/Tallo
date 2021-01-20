import { types } from './UserActions'

const initState = {
  user: sessionStorage.loggedUser? JSON.parse(sessionStorage.loggedUser): {},
  userBoards: []
}

export const userReducer = (state = initState, { type, user, userBoards }) => {
  switch (type) {
    case types.SET_LOGGED_USER:
      return {
        ...state,
        user: user,
      }
    case types.SET_USER_BOARDS:
      return {
        ...state,
        userBoards: userBoards,
      }
    default:
      return state
  }
}
