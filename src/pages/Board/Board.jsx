import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_CARD,
  GET_BOARD_BY_ID,
  HANDLE_DROP,
  boardTypes,
  ADD_LIST,
  REMOVE_LIST,
  GET_CARD_BY_ID
} from '../../store/board/BoardActions'
import { List } from '../../components/Board/List/List'
import { socketService, socketTypes } from '../../service/socketService.js'
import { BoardHeader } from '../../components/Board/BoardHeader/BoardHeader'
import { useHistory } from 'react-router'
import { ClickAwayListener } from '@material-ui/core'
import { Popover } from '../../components/Board/ReUsables/Popover/Popover'

export const Board = () => {
  const { board, list, card } = useSelector(state => state.boardReducer) || {}
  const { lists, title, _id, users } = useSelector(state => state.boardReducer.board) || {}
  const { userBoards } = useSelector(state => state.userReducer) || {}
  const [isAddList, setIsAddList] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [DynCmp, setDynCmp] = useState(null)
  const [newList, setNewList] = useState({
    title: '',
    cards: []
  })
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!userBoards[0]) history.replace('/create-modal')
    else {
      if (!_id) {
        if (sessionStorage.boardId) dispatch(GET_BOARD_BY_ID(sessionStorage.boardId));
        else dispatch(GET_BOARD_BY_ID(userBoards[0]._id));
      }
      socketService.setup()
      socketService.emit(socketTypes.JOIN_BOARD, _id)
      socketService.on(socketTypes.BOARD_UPDATED, nextBoard =>
        dispatch({ type: boardTypes.SET_BOARD, payload: nextBoard })
      )
      return () => {
        socketService.terminate()
      }
    }
  }, [])

  const addCard = (card, listId) => {
    dispatch(ADD_CARD(card, listId))
  }

  const addList = ev => {
    ev.preventDefault()
    dispatch(ADD_LIST(newList))
    setIsAddList(false)
    setNewList({ title: '', cards: [] })
  }

  const removeList = listId => {
    const isSure = window.confirm('Are you sure?')
    if (isSure) dispatch(REMOVE_LIST(listId))
  }

  const handleInput = ({ target: { name, value } }, item) => {
    setNewList({ ...newList, [name]: value })
  }

  const [{ isOver }, drop] = useDrop({
    accept: 'LIST',
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  const handleDrop = details => dispatch(HANDLE_DROP(details))

  const togglePopover = (ev, { cmp, cardId, el } = {}) => {
    ev.stopPropagation()
    cardId && dispatch(GET_CARD_BY_ID(cardId))
    cmp && setDynCmp(() => cmp)
    setAnchorEl(el ? el : ev.target !== anchorEl && cmp ? ev.target : null)
  }

  return (
    <main ref={drop} className="board">
      <BoardHeader boardTitle={title} boardMembers={users} userBoards={userBoards} />
      <section className="container flex">
        {lists?.map(list => (
          <List
            list={list}
            key={list._id}
            removeList={removeList}
            addCard={addCard}
            handleDrop={handleDrop}
            togglePopover={togglePopover}
          />
        ))}
        {isAddList && (
          <ClickAwayListener onClickAway={() => setIsAddList(false)}>
            <form action="" className="add-list-form" onSubmit={addList}>
              <input
                placeholder="Enter a title for this list..."
                type="text"
                name="title"
                value={newList.title}
                onChange={handleInput}
              />
              <div className="add-list-btns">
                <button className="add-list-btn">Add list</button>
                <button
                  onClick={ev => {
                    ev.preventDefault()
                    setIsAddList(false)
                  }}
                  className="close-btn">
                  X
                </button>
              </div>
            </form>
          </ClickAwayListener>
        )}
        {!isAddList && (
          <div className="add-list-container" onClick={() => setIsAddList(true)}>
            <p>
              <span>+</span> Add another list
            </p>
          </div>
        )}
      </section>
      <Popover anchorEl={anchorEl} togglePopover={togglePopover} pos="right-start">
        {DynCmp && (
          <DynCmp anchorEl={anchorEl} togglePopover={togglePopover} list={list} card={card} />
        )}
      </Popover>
    </main>
  )
}
