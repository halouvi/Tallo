import { boardTypes } from './BoardActions'

const initState = {
  board: null,
  list: null,
  card: null,
  dragType: null
}

export const boardReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case boardTypes.RESET_STATE:
      return initState
    case boardTypes.SET_BOARD:
      return {
        ...state,
        board: payload
      }
    case boardTypes.SET_ITEMS:
      return {
        ...state,
        list: payload.list,
        card: payload.card
      }
    case boardTypes.SET_DRAG_TYPE:
      return {
        ...state,
        dragType: payload
      }
    default:
      return state
  }
}
