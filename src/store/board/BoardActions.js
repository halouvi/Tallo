import { boardService } from '../../service/BoardService'
import utilService from '../../service/utilService'
import { socketService, socketTypes } from '../../service/socketService.js'
import { cloneDeep as clone } from 'lodash'
import { SET_BOARDS } from '../user/UserActions'

export const boardTypes = {
  SET_BOARD: 'SET_BOARD',
  SET_USERS: 'SET_USERS',
  SET_CARD: 'SET_CARD',
  SET_LIST: 'SET_LIST',
  RESET_BOARD: 'RESET_BOARD'
}

var timer

export const CLEAR_BOARD_STORE = () => dispatch => {
  dispatch({ type: boardTypes.RESET_BOARD, payload: null })
}

export const CLEAR_CARD = () => dispatch => {
  dispatch({ type: boardTypes.SET_LIST, payload: null })
  dispatch({ type: boardTypes.SET_CARD, payload: null })
}

export const ADD_BOARD = newBoard => async dispatch => {
  const { board, users, userBoards } = await boardService.add(newBoard)
  console.log(board)
  dispatch({ type: boardTypes.SET_BOARD, payload: board })
  dispatch({ type: boardTypes.SET_USERS, payload: users })
  dispatch(SET_BOARDS(userBoards))
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

export const GET_CARD_BY_ID = cardId => (dispatch, getState) => {
  const { lists } = getState().boardReducer.board || {}
  if (lists) {
    const { list, card } = findItems(lists, cardId)
    dispatch({ type: boardTypes.SET_LIST, payload: list })
    dispatch({ type: boardTypes.SET_CARD, payload: card })
  }
}
export const ADD_CARD = (card, listId) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  card._id = utilService.makeId()
  card = _activityLog(card, 'card')
  var listIdx = nextBoard.lists.findIndex(list => list._id === listId)
  nextBoard.lists[listIdx].cards.push(card)
  dispatch(SAVE_BOARD(nextBoard))
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
  posOffset = null
}) => (dispatch, getState) => {
  const nextLists = clone(getState().boardReducer.board.lists)

  if (type === 'LIST') {
    const sourceListIdx = nextLists.findIndex(list => list._id === sourceListId)
    const [list] = nextLists.splice(sourceListIdx, 1)
    const targetListIdx = nextLists.findIndex(list => list._id === targetListId)
    nextLists.splice(targetListIdx + posOffset, 0, list)
  } else if (type === 'CARD') {
    const sourceList = nextLists.find(list => list._id === sourceListId)
    const sourceCardIdx = sourceList.cards.findIndex(card => card._id === sourceCardId)
    const [card] = sourceList.cards.splice(sourceCardIdx, 1)
    const targetList = nextLists.find(list => list._id === targetListId)
    let targetCardIdx = targetList.cards.findIndex(card => card._id === targetCardId)
    if (posOffset === null) {
      //transfer card via menu and not DnD
      if (sourceListId === targetListId && targetCardIdx >= sourceCardIdx) {
        posOffset = 1
      } else if (!targetCardId) {
        targetCardIdx = targetList.cards.length
      }
    }
    targetList.cards.splice(targetCardIdx + posOffset, 0, card)
  }
  dispatch(UPDATE_BOARD({ name: 'lists', value: nextLists }))
}

export const UPDATE_BOARD = ({ name, value }) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  nextBoard[name] = value
  dispatch(SAVE_BOARD(nextBoard))
}

export const SAVE_BOARD = nextBoard => (dispatch, getState) => {
  const prevBoard = clone(getState().boardReducer.board)
  // const cardId = getState().boardReducer.card._id
  dispatch({ type: boardTypes.SET_BOARD, payload: nextBoard })
  // if (cardId) dispatch(GET_CARD_BY_ID(cardId))
  clearTimeout(timer)
  timer = setTimeout(async () => {
    try {
      await boardService.update(nextBoard)
      socketService.emit(socketTypes.BOARD_UPDATED, nextBoard._id)
    } catch (error) {
      dispatch({ type: boardTypes.SET_BOARD, payload: prevBoard })
      // dispatch(GET_CARD_BY_ID(cardId))
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
