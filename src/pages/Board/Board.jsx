import { useEffect, useState } from 'react'
import { useToggle, useUpdateEffect } from 'react-use'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import {
  boardTypes,
  HANDLE_DROP,
  ADD_CARD,
  ADD_LIST,
  DELETE_LIST,
  GET_BY_ID,
  CLEAR_CARD
} from '../../store/board/BoardActions'
import { List } from '../../components/Board/List/List'
import { socketService, socketTypes } from '../../service/socketService.js'
import { BoardHeader } from '../../components/Board/BoardHeader/BoardHeader'
import { useHistory } from 'react-router'
import { ClickAwayListener } from '@material-ui/core'
import { Popover } from '../../components/Board/ReUsables/Popover/Popover'

export const Board = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { board, list, card } = useSelector(state => state.boardReducer) || {}
  const { lists, title, _id, users } = board || {}
  const { boards } = useSelector(state => state.userReducer.user) || {}
  const [isAddList, toggleAddList] = useToggle(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [DynCmp, setDynCmp] = useState(null)
  const [newListTitle, setNewListTitle] = useState('')

  useUpdateEffect(() => setNewListTitle(''), [isAddList])

  useEffect(() => {
    if (!boards[0]) history.replace('/create-modal')
    else {
      socketService.emit(socketTypes.JOIN_BOARD, _id)
      socketService.on(socketTypes.BOARD_UPDATED, nextBoard => {
        dispatch({ type: boardTypes.SET_BOARD, payload: nextBoard })
      })
    }
    return () => {
      socketService.emit(socketTypes.LEAVE_BOARD, _id)
      socketService.off(socketTypes.BOARD_UPDATED)
    }
  }, [])

  const togglePopover = (ev, cmp, itemId, preserveAnchor) => {
    // ev.stopPropagation()
    // console.log(itemId)
    // itemId && dispatch(GET_BY_ID(itemId))
    // // itemId && dispatch(itemId ? GET_BY_ID(itemId) : CLEAR_CARD())
    // !preserveAnchor && setAnchorEl(ev.target !== anchorEl ? ev.target : null)
    // setDynCmp(cmp ? () => cmp : null)
  }

  const addList = () => {
    dispatch(ADD_LIST(newListTitle))
    toggleAddList()
  }

  const handleInput = ({ target: { value } }) => setNewListTitle(value)

  return (
    <main className="board">
      <BoardHeader title={title} users={users} boards={boards} />
      {board && (
        <section className="container flex">
          {lists.map(list => (
            <List list={list} key={list._id} togglePopover={togglePopover} />
          ))}
          {isAddList ? (
            <ClickAwayListener onClickAway={toggleAddList}>
              <div className="add-list-form">
                <input
                  placeholder="Enter a title for this list..."
                  type="text"
                  value={newListTitle}
                  onChange={handleInput}
                />
                <div className="add-list-btns">
                  <button className="add-list-btn" onClick={addList}>
                    Add list
                  </button>
                  <button className="close-btn" onClick={toggleAddList}>
                    X
                  </button>
                </div>
              </div>
            </ClickAwayListener>
          ) : (
            <div className="add-list-container" onClick={toggleAddList}>
              <p>
                <span>+</span> Add another list
              </p>
            </div>
          )}
        </section>
      )}
      <Popover anchorEl={anchorEl} togglePopover={togglePopover} pos="bottom">
        {DynCmp && (
          <DynCmp anchorEl={anchorEl} togglePopover={togglePopover} list={list} card={card} />
        )}
      </Popover>
    </main>
  )
}
