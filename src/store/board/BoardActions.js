import { boardService } from '../../service/BoardService'

export const types = {
  GET_BOARD_BY_ID: 'GET_BOARD_BY_ID',
  UPDATE_BOARD: 'UPDATE_BOARD',
  SET_BOARD:'SET_BOARD'
}

export const getBoardById = id => async dispatch => {
  const board = await boardService.getById(id)
  dispatch({ type: types.SET_BOARD, payload: board })
}

export const updateBoard = updatedBoard => async dispatch => {
  const savedBoard = await boardService.update(updatedBoard)
  dispatch({ type: types.SET_BOARD, payload: savedBoard })
}