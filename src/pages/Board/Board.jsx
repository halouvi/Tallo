import { useEffect, useLayoutEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { boardTypes, HANDLE_DROP, ADD_CARD, ADD_LIST, REMOVE_LIST, GET_CARD_BY_ID} from '../../store/board/BoardActions'
import { List } from '../../components/Board/List/List'
import { socketService, socketTypes, socket } from '../../service/socketService.js'
import { BoardHeader } from '../../components/Board/BoardHeader/BoardHeader'
import { useHistory } from 'react-router'
import { ClickAwayListener } from '@material-ui/core'
import { Popover } from '../../components/Board/ReUsables/Popover/Popover'

export const Board = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { board, list, card } = useSelector(state => state.boardReducer) || {}
  const { lists, title, _id, users } = board || {}
  const { user } = useSelector(state => state.userReducer) || {}
  const { boards } = user || {}
  const [isAddList, setIsAddList] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [DynCmp, setDynCmp] = useState(null)
  const [newList, setNewList] = useState({
    title: '',
    cards: []
  })

  useEffect(() => {
    if (!boards[0]) history.replace('/create-modal')
    else {
      if (socket) {
        socketService.emit(socketTypes.JOIN_BOARD, _id)
        socketService.on(socketTypes.BOARD_UPDATED, nextBoard => {
          dispatch({ type: boardTypes.SET_BOARD, payload: nextBoard })
        })
      }
    }
    return () => {
      socketService.emit(socketTypes.LEAVE_BOARD, _id)
      socketService.off(socketTypes.BOARD_UPDATED)
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
    dispatch(REMOVE_LIST(listId))
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
      <BoardHeader title={title} users={users} boards={boards} />
      {board && (
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
      )}
      <Popover anchorEl={anchorEl} togglePopover={togglePopover} pos="right-start">
        {DynCmp && (
          <DynCmp anchorEl={anchorEl} togglePopover={togglePopover} list={list} card={card} />
        )}
      </Popover>
    </main>
  )
}