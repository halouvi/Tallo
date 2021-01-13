import { boardService } from '../../service/boardService'
import utilService from '../../service/utilService'

export const types = {
  SET_BOARD: 'SET_BOARD',
  SET_USERS: 'SET_USERS',
  SET_CARD: 'SET_CARD',
  SET_LIST: 'SET_LIST',
}



export const ADD_BOARD = newBoard => async dispatch => {
  const { board, users } = await boardService.add(newBoard)
  dispatch({ type: types.SET_BOARD, payload: board })
  dispatch({ type: types.SET_USERS, payload: users })
}

export const GET_BOARD_BY_ID = id => async dispatch => {
  const { board, users } = await boardService.getById(id)
  dispatch({ type: types.SET_BOARD, payload: board })
  dispatch({ type: types.SET_USERS, payload: users })
}

export const GET_BOARD_USER_BY_ID = id => (dispatch, getState) => {
  const users = getState().boardReducer.users
  const user = users.find(user => user._id === id)
  return user
}

export const ADD_CARD = (card, listId) => (dispatch, getState) => {
  const prevBoard = getState().boardReducer.board
  const updatedBoard = JSON.parse(JSON.stringify(prevBoard))
  card._id = utilService.makeId()
  card = _activityLog(card, 'card')
  var listIdx = updatedBoard.lists.findIndex(list => list._id === listId)
  updatedBoard.lists[listIdx].cards.push(card)
  dispatch(_saveBoard(updatedBoard))
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
  var { card } = _findItems(updatedBoard, cardId)
  card[field] = value
  card = _activityLog(card, field)
  await dispatch(_saveBoard(updatedBoard))
  dispatch(GET_CARD_BY_ID(cardId))
}

export const UPDATE_LIST = ({ name, value, listId }) => (dispatch, getState) => {
  const updatedBoard = JSON.parse(JSON.stringify(getState().boardReducer.board))
  const list = updatedBoard.lists.find(list => list._id === listId)
  list[name] = value
  dispatch(_saveBoard(updatedBoard))
}

export const UPDATE_BOARD = ({ field, value }) => (dispatch, getState) => {
  const updatedBoard = JSON.parse(JSON.stringify(getState().boardReducer.board))
  updatedBoard[field] = value
  dispatch(_saveBoard(updatedBoard))
}

export const _saveBoard = updatedBoard => async (dispatch, getState) => {
  const prevBoard = JSON.parse(JSON.stringify(getState().boardReducer.board))
  dispatch({ type: types.SET_BOARD, payload: updatedBoard })
  try {
    await boardService.update(updatedBoard)
  } catch (error) {
    dispatch({ type: types.SET_BOARD, payload: prevBoard })
    console.error('Could not update board', error)
  }
}

const _findItems = (board, cardId) => {
  const list = board.lists.find((list, index) => {
    return list.cards.find(card => card._id === cardId)
  })
  const card = list.cards.find(card => card._id === cardId)
  return { list, card }
}

const _activityLog = (card, field) => {
  const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'))
  var activity
  switch (field) {
    case 'card':
      activity = 'Added this card'
      break
    case 'desc':
      activity = 'Changed card description'
      break
    case 'members':
      activity = 'Changed card members list'
      break
    case 'title':
      activity = 'Changed card title'
      break
    case 'labels':
      activity = 'Changed card labels'
      break
    case 'attachments':
      activity = 'Added an attachment to card'
      break
    case 'dueDate':
      activity = "Changed card's due date"
      break
    case 'checklist':
      activity = 'Changed a checklist item'
      break
    default:
      break
  }
  card.activity.unshift({ activity, createdAt: Date.now(), createdBy: loggedUser._id })
  return card
}
