import { boardService } from '../../service/BoardService'

export const types = {
  SET_BOARD: 'SET_BOARD',
  SET_CARD: 'SET_CARD',
  SET_LIST: 'SET_LIST',
}

export const GET_BOARD_BY_ID = id => async dispatch => {
  const board = await boardService.getById(id)
  dispatch({ type: types.SET_BOARD, payload: board })
}

export const UPDATE_BOARD = updatedBoard => async dispatch => {
  try {
    const res = await boardService.update(updatedBoard)
    dispatch({ type: types.SET_BOARD, payload: res })
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export const GET_CARD_BY_ID = cardId => async (dispatch, getState) => {
  const board = getState().boardReducer.board
  const { list, card } = _findItems(board, cardId)
  dispatch({ type: types.SET_LIST, payload: list })
  dispatch({ type: types.SET_CARD, payload: card })
}

export const UPDATE_CARD = ({ field, value, cardId }) => async (dispatch, getState) => {
  const prevBoard = getState().boardReducer.board
  const updatedBoard = JSON.parse(JSON.stringify(prevBoard))
  const { card } = _findItems(updatedBoard, cardId)
  card[field] = value
  await dispatch(UPDATE_BOARD(updatedBoard))
  dispatch(GET_CARD_BY_ID(cardId))
}

export const UPDATE_LIST = ({ field, value, listId }) => (dispatch, getState) => {
  const prevBoard = getState().boardReducer.board
  const updatedBoard = JSON.parse(JSON.stringify(prevBoard))
  const list = updatedBoard.lists.find(list => list._id === listId)
  list[field] = value
  dispatch(UPDATE_BOARD(updatedBoard))
}

const _findItems = (board, cardId) => {
  const list = board.lists.find((list, index) => {
    return list.cards.find(card => card._id === cardId)
  })
  const card = list.cards.find(card => card._id === cardId)
  return { list, card }
}
