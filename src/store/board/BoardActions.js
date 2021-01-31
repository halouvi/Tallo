import { boardService } from '../../service/boardService'
import utilService from '../../service/utilService'
import { socketService, socketTypes } from '../../service/socketService.js'
import { cloneDeep as clone } from 'lodash'
import { userTypes } from '../user/UserActions'

export const boardTypes = {
  SET_BOARD: 'SET_BOARD',
  SET_USERS: 'SET_USERS',
  SET_CARD: 'SET_CARD',
  SET_LIST: 'SET_LIST',
  RESET_BOARD: 'RESET_BOARD'
}

var timer

export const CLEAR_BOARD = () => dispatch => {
  dispatch({ type: boardTypes.RESET_BOARD, payload: null })
}

export const CLEAR_CARD = () => dispatch => {
  dispatch({ type: boardTypes.SET_LIST, payload: null })
  dispatch({ type: boardTypes.SET_CARD, payload: null })
}

export const ADD_BOARD = board => async (dispatch, getState) => {
  const prevBoard = clone(getState().boardReducer.board)
  const prevUserBoards = clone(getState().userReducer.user.boards)
  try {
    const { boardId } = await boardService.add(board)
    dispatch({ type: boardTypes.SET_BOARD, payload: { _id: boardId, ...board } })
    dispatch({ type: userTypes.SET_NEW_USER_BOARD, payload: { _id: boardId, title: board.title } })
  } catch (error) {
    dispatch({ type: boardTypes.SET_BOARD, payload: prevBoard })
    dispatch({ type: userTypes.SET_USER_BOARDS, payload: prevUserBoards })
  }
}

export const GET_BOARD_BY_ID = id => async dispatch => {
  try {
    const board = await boardService.getById(id)
    dispatch({ type: boardTypes.SET_BOARD, payload: board })
  } catch (error) {}
}

export const ADD_LIST = list => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  list._id = utilService.makeId()
  nextBoard.lists.push(list)
  dispatch(SAVE_BOARD(nextBoard))
}

export const REMOVE_LIST = listId => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const listIdx = nextBoard.lists.findIndex(list => list._id === listId)
  nextBoard.lists.splice(listIdx, 1)
  dispatch(SAVE_BOARD(nextBoard))
}

export const UPDATE_LIST = ({ name, value, listId }) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const list = nextBoard.lists.find(list => list._id === listId)
  list[name] = value
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
  const { lists } = getState().boardReducer.board || {}
  if (lists) {
    const { list, card } = findItems(lists, cardId)
    dispatch({ type: boardTypes.SET_LIST, payload: list })
    dispatch({ type: boardTypes.SET_CARD, payload: card })
  }
}

export const DELETE_CARD = cardId => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  var { cardIdx, list } = findItems(nextBoard.lists, cardId)
  list.cards.splice(cardIdx, 1)
  dispatch(SAVE_BOARD(nextBoard))
}

export const UPDATE_CARD = ({ name, value, cardId }) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  var { card } = findItems(nextBoard.lists, cardId)
  card[name] = value
  card = _activityLog(card, name)
  dispatch(SAVE_BOARD(nextBoard))
}

export const HANDLE_DROP = ({
  type,
  sourceListId,
  sourceCardId,
  targetListId,
  targetCardId,
  posOffset
}) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const { lists } = nextBoard

  if (type === 'LIST') {
    const sourceListIdx = lists.findIndex(list => list._id === sourceListId)
    const [list] = lists.splice(sourceListIdx, 1)
    const targetListIdx = lists.findIndex(list => list._id === targetListId)
    lists.splice(targetListIdx + posOffset, 0, list)
  } else if (type === 'CARD') {
    const sourceList = lists.find(list => list._id === sourceListId)
    const sourceCardIdx = sourceList.cards.findIndex(card => card._id === sourceCardId)
    const [card] = sourceList.cards.splice(sourceCardIdx, 1)
    const targetList = lists.find(list => list._id === targetListId)
    let targetCardIdx = targetList.cards.findIndex(card => card._id === targetCardId || 0)
    if (posOffset === null) {
      //when transfering card via menu and not DnD
      posOffset = sourceListId === targetListId && targetCardIdx >= sourceCardIdx ? 1 : 0
      if (!targetCardId) targetCardIdx = targetList.cards.length
    }
    targetList.cards.splice(targetCardIdx + posOffset, 0, card)
  }
  dispatch(SAVE_BOARD(nextBoard))
}

export const UPDATE_BOARD = ({ name, value }) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  nextBoard[name] = value
  dispatch(SAVE_BOARD(nextBoard))
}

export const SAVE_BOARD = nextBoard => (dispatch, getState) => {
  const prevBoard = clone(getState().boardReducer.board)
  dispatch({ type: boardTypes.SET_BOARD, payload: nextBoard })
  clearTimeout(timer)
  timer = setTimeout(async () => {
    try {
      await boardService.update(nextBoard)
      socketService.emit(socketTypes.BOARD_UPDATED, nextBoard._id)
    } catch (error) {
      dispatch({ type: boardTypes.SET_BOARD, payload: prevBoard })
      console.error('Could not update board', error)
    }
  }, 1500)
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
  const loggedUser = JSON.parse(sessionStorage.loggedUser)
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
