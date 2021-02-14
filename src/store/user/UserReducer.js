import { userTypes } from './UserActions'

const initState = {
  isLoading: true,
  user: null
}

export const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case userTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload
      }
    case userTypes.SET_LOGGED_USER:
      return {
        ...state,
        user: payload
      }
    case userTypes.SET_USER_BOARDS:
      return {
        ...state,
        user: { ...state.user, boards: payload }
      }
    case userTypes.SET_NEW_USER_BOARD:
      return {
        ...state,
        user: { ...state.user, boards: [...state.user.boards, payload] }
      }
    default:
      return state
  }
}
