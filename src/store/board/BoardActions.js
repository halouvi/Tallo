import { boardService } from '../../service/boardService'
import utilService from '../../service/utilService'
import { socketService, socketTypes } from '../../service/socketService.js'
import { cloneDeep as clone } from 'lodash'

export const boardTypes = {
  SET_BOARD: 'SET_BOARD',
  SET_USERS: 'SET_USERS',
  SET_CARD: 'SET_CARD',
  SET_LIST: 'SET_LIST',
}



export const ADD_BOARD = newBoard => async dispatch => {
  const { board, users } = await boardService.add(newBoard)
  console.log(board);
  dispatch({ type: boardTypes.SET_BOARD, payload: board })
  dispatch({ type: boardTypes.SET_USERS, payload: users })
}

export const GET_BOARD_BY_ID = id => async dispatch => {
  const { board, users } = await boardService.getById(id)
  dispatch({ type: boardTypes.SET_BOARD, payload: board })
  dispatch({ type: boardTypes.SET_USERS, payload: users })
}

export const GET_BOARD_USER_BY_ID = id => (dispatch, getState) => {
  const users = getState().boardReducer.users
  const user = users.find(user => user._id === id)
  return user
}

export const ADD_LIST = (list) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  list._id = utilService.makeId()
  nextBoard.lists.push(list)
  dispatch(SAVE_BOARD(nextBoard))
}

export const REMOVE_LIST = (listId) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const listIdx = nextBoard.lists.findIndex(list => list._id === listId)
  nextBoard.lists.splice(listIdx, 1)
  dispatch(SAVE_BOARD(nextBoard))
}

export const ADD_CARD = (card, listId) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  card._id = utilService.makeId()
  card = _activityLog(card, 'card')
  var listIdx = nextBoard.lists.findIndex(list => list._id === listId)
  nextBoard.lists[listIdx].cards.push(card)
  dispatch(SAVE_BOARD(nextBoard))
}

export const GET_CARD_BY_ID = cardId => (dispatch, getState) => {
  const { lists } = getState().boardReducer.board
  return findItems(lists, cardId)
}

export const UPDATE_CARD = ({ name, value, cardId }) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  var { card } = findItems(nextBoard.lists, cardId)
  card[name] = value
  card = _activityLog(card, name)
  dispatch(SAVE_BOARD(nextBoard))
}

export const UPDATE_LIST = ({ name, value, listId }) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const { list } = nextBoard.lists.find(list => list._id === listId)
  list[name] = value
  dispatch(SAVE_BOARD(nextBoard))
}

export const UPDATE_BOARD = ({ name, value }) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  nextBoard[name] = value
  dispatch(SAVE_BOARD(nextBoard))
}

export const SAVE_BOARD = nextBoard => async (dispatch, getState) => {
  const prevBoard = clone(getState().boardReducer.board)
  dispatch({ type: boardTypes.SET_BOARD, payload: nextBoard })
  try {
    await boardService.update(nextBoard)
    socketService.emit(socketTypes.BOARD_UPDATED, nextBoard._id)
  } catch (error) {
    dispatch({ type: boardTypes.SET_BOARD, payload: prevBoard })
    console.error('Could not update board', error)
  }
}

export const findItems = (lists, cardId) => {
  var card
  var cardIdx
  var listIdx
  var list = lists.find((list, lstIdx) =>
    list.cards.find((crd, crdIdx) => {
      if (crd._id === cardId) {
        card = crd
        cardIdx = crdIdx
        listIdx = lstIdx
        return true
      } else return false
    })
  )
  return { list, listIdx, card, cardIdx }
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
