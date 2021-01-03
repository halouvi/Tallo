import { types } from './BoardActions'

const initState = {
  board: null,
}

export const boardReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.SET_BOARD:
      return {
        ...state,
        board: payload,
      }
    default:
      return state
  }
}
