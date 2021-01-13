import { boardTypes } from './BoardActions'

const initState = {
  board: null,
  users: null,
  // list: null,
  // card: null,
}

export const boardReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case boardTypes.SET_BOARD:
      return {
        ...state,
        board: payload,
      }
    case boardTypes.SET_USERS:
      return {
        ...state,
        users: payload,
      }
    // case boardTypes.SET_LIST:
    //   return {
    //     ...state,
    //     list: payload,
    //   }
    // case boardTypes.SET_CARD:
    //   return {
    //     ...state,
    //     card: payload,
    //   }
    default:
      return state
  }
}
