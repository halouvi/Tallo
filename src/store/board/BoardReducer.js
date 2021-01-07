import { types } from './BoardActions'

const initState = {
  board: null,
  list: null,
  card: null,
  boardUsers: null
}

export const boardReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.SET_BOARD:
      return {
        ...state,
        board: payload,
        boardUsers: [...payload.users]
      }
    case types.SET_LIST:
      return {
        ...state,
        list: payload,
      }
    case types.SET_CARD:
      return {
        ...state,
        card: payload,
      }
    default:
      return state
  }
}
