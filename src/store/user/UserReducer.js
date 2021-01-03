import { types } from './UserActions'

const initState = {
  user: {},
}

export const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.GET_USER_BY_ID:
      return {
        ...state,
        user: payload,
      }
    default:
      return state
  }
}
