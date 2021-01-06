import { types } from './UserActions'

const initState = {
  user: {},
}

export const userReducer = (state = initState, { type, user }) => {
  switch (type) {
    case types.SET_LOGGED_USER:
      return {
        ...state,
        user,
      }
    default:
      return state
  }
}
