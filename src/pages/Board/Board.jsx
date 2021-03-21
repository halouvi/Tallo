import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardTypes } from 'store/board/BoardActions'
import { List } from 'components/Board/List/List'
import { BoardHeader } from 'components/Board/BoardHeader/BoardHeader'
import { useHistory } from 'react-router'
import { AddList } from 'components/Board/AddList/AddList'
import { Droppable } from 'react-beautiful-dnd'
import { socketService, socketTypes } from 'service/socketService'
import { usePopover } from 'components/Popover/Popover'

export const Board = () => {
  const dispatch = useDispatch()

  const { _id: boardId = '', lists = [] } = useSelector(state => state.boardReducer.board) || {}

  useEffect(() => {
    // document.getElementById('root').classList.add('ofy-h')
    socketService.emit(socketTypes.JOIN_BOARD, boardId)
    socketService.on(socketTypes.BOARD_UPDATED, nextBoard => {
      dispatch({ type: boardTypes.SET_BOARD, payload: nextBoard })
    })
    return () => {
      // document.getElementById('root').classList.remove('ofy-h')
      socketService.emit(socketTypes.LEAVE_BOARD, boardId)
      socketService.off(socketTypes.BOARD_UPDATED)
    }
  }, [])
  const [togglePopover] = usePopover()

  return (
    <main className="board flex fg1 col">
      <BoardHeader />
      {boardId && (
        <Droppable droppableId="board" direction="horizontal" type="LIST">
          {({ droppableProps, placeholder, innerRef }, snapshot) => (
            <main
              {...droppableProps}
              ref={innerRef}
              className="lists fg1 flex"
              onScroll={togglePopover}>
              {lists.map((list, idx) => (
                <List list={list} key={list._id} idx={idx} />
              ))}
              {placeholder}
              <AddList />
            </main>
          )}
        </Droppable>
      )}
    </main>
  )
}
