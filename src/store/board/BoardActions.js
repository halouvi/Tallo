import { boardService } from '../../service/BoardService'
import { socketService, socketTypes } from '../../service/socketService.js'
import { userTypes } from '../user/UserActions'
import { cloneDeep as clone } from 'lodash'

export const boardTypes = {
  RESET_STATE: 'RESET_STATE',
  SET_BOARD: 'SET_BOARD',
  SET_ITEMS: 'SET_ITEMS'
}

export const CLEAR_BOARD = () => dispatch => dispatch({ type: boardTypes.RESET_STATE })

export const CLEAR_ITEMS = () => dispatch => {
  dispatch({
    type: boardTypes.SET_ITEMS,
    payload: { list: null, card: null }
  })
}

export const ADD_BOARD = title => async (dispatch, getState) => {
  const userId = getState().userReducer.user._id
  const board = boardService.createNewBoard(title, userId)
  try {
    const { boardId } = await boardService.add(board)
    dispatch({ type: boardTypes.SET_BOARD, payload: { _id: boardId, ...board } })
    dispatch({ type: userTypes.SET_NEW_USER_BOARD, payload: { _id: boardId, title: board.title } })
  } catch (err) {
    console.error(err)
  }
}

export const GET_BOARD_BY_ID = id => async dispatch => {
  try {
    const board = await boardService.getById(id)
    dispatch({ type: boardTypes.SET_BOARD, payload: board })
  } catch (err) {
    console.error(`GET_BOARD_BY_ID ERROR: ${err}`)
  }
}

export const UPDATE_BOARD = ({ name, value }) => (dispatch, getState) => {
  name === 'users' && console.log({ name, value })
  const nextBoard = clone(getState().boardReducer.board)
  if (name === 'users') _removeUserFromCards(nextBoard, value)
  nextBoard[name] = value
  dispatch(SAVE_BOARD(nextBoard))
}

let timer
export const SAVE_BOARD = nextBoard => (dispatch, getState) => {
  const { board, list, card } = getState().boardReducer || {}
  const prevBoard = clone(board)
  const itemId = card?._id || list?._id
  dispatch({ type: boardTypes.SET_BOARD, payload: nextBoard })
  if (itemId) dispatch(GET_BY_ID(itemId))
  clearTimeout(timer)
  timer = setTimeout(async () => {
    try {
      await boardService.update(nextBoard)
      socketService.emit(socketTypes.BOARD_UPDATED, nextBoard._id)
    } catch (err) {
      dispatch({ type: boardTypes.SET_BOARD, payload: prevBoard })
      if (itemId) dispatch(GET_BY_ID(itemId))
      console.error('Could not update board', err)
    }
  }, 2500)
}

export const ADD_LIST = title => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const list = boardService.createNewList(title)
  nextBoard.lists.push(list)
  dispatch(SAVE_BOARD(nextBoard))
}

export const UPDATE_LIST = ({ name, value, listId }) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const { list } = _findItems(nextBoard, listId)
  list[name] = value
  dispatch(SAVE_BOARD(nextBoard))
}

export const DELETE_LIST = listId => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const { listIdx } = _findItems(nextBoard, listId)
  nextBoard.lists.splice(listIdx, 1)
  dispatch(SAVE_BOARD(nextBoard))
}

export const GET_BY_ID = itemId => (dispatch, getState) => {
  const board = getState().boardReducer.board
  const { list, card } = _findItems(board, itemId)
  dispatch({ type: boardTypes.SET_ITEMS, payload: { list, card } })
}

export const ADD_CARD = (title, listId) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const card = boardService.createNewCard(title)
  dispatch(_activityLog(card, 'addCard'))
  const { list } = _findItems(nextBoard, listId)
  list.cards.push(card)
  dispatch(SAVE_BOARD(nextBoard))
}

export const UPDATE_CARD = ({ name, value, cardId }) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const { card } = _findItems(nextBoard, cardId)
  card[name] = value
  dispatch(_activityLog(card, name))
  dispatch(SAVE_BOARD(nextBoard))
}

export const DELETE_CARD = cardId => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  const { cardIdx, list } = _findItems(nextBoard, cardId)
  list.cards.splice(cardIdx, 1)
  dispatch(SAVE_BOARD(nextBoard))
}

export const HANDLE_DROP = ({ type, sourceId, targetId, hovPos }) => (dispatch, getState) => {
  const nextBoard = clone(getState().boardReducer.board)
  if (type === 'list') {
    const { listIdx: sourceIdx } = _findItems(nextBoard, sourceId)
    const [list] = nextBoard.lists.splice(sourceIdx, 1)
    const { listIdx: targetIdx } = _findItems(nextBoard, targetId)
    nextBoard.lists.splice(targetIdx + hovPos, 0, list)
  } else {
    const { list: sourceList, cardIdx: sourceIdx } = _findItems(nextBoard, sourceId)
    const [card] = sourceList.cards.splice(sourceIdx, 1)
    const { list: targetList, cardIdx: targetIdx } = _findItems(nextBoard, targetId)
    if (hovPos === null) {
      // hovPos is set to null when transfering card via menu and not DnD
      // this calculation needs to happen after the dragged card has been spliced
      hovPos = sourceList === targetList && targetIdx >= sourceIdx ? 1 : 0
    }
    targetList.cards.splice(targetIdx + hovPos, 0, card)
  }
  dispatch(SAVE_BOARD(nextBoard))
}

const _findItems = (board, targetId) => {
  var list, listIdx, card, cardIdx
  board.lists.find((currList, currListIdx) => {
    if (currList._id === targetId) {
      list = currList
      listIdx = currListIdx
      card = null
      cardIdx = currList.cards.length
      return true
    } else {
      currList.cards.find((currCard, currCardIdx) => {
        if (currCard._id === targetId) {
          list = currList
          listIdx = currListIdx
          card = currCard
          cardIdx = currCardIdx
          return true
        } else return false
      })
      return card ? true : false
    }
  })
  return { list, listIdx, card, cardIdx }
}

const _removeUserFromCards = ({ users, lists }, nextUsers) => {
  const { _id: userToRemove } = users.find(userId => !nextUsers.includes(userId)) || {}
  if (userToRemove) {
    lists.forEach(({ cards }) => {
      cards.forEach(card => {
        card.members = card.members.filter(memberId => memberId !== userToRemove)
      })
    })
  }
}

const _activityLog = (card, field) => (dispatch, getState) => {
  const userId = getState().userReducer.user._id
  var activity
  switch (field) {
    case 'addCard':
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
  card.activity.unshift({ activity, createdAt: Date.now(), createdBy: userId })
  return card
}
