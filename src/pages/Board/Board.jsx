import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardTypes } from 'store/board/BoardActions'
import { List } from 'components/Board/List/List'
import { socketService, socketTypes } from 'service/socketService.js'
import { BoardHeader } from 'components/Board/BoardHeader/BoardHeader'
import { useHistory } from 'react-router'
import { AddList } from 'components/Board/AddList/AddList'
import { DragLayer } from 'components/DragLayer/DragLayer'
import FPSStats from 'react-fps-stats'
import { Droppable } from 'react-beautiful-dnd'

export const Board = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const boards = useSelector(state => state.userReducer.user?.boards)
  const { _id: boardId = '', lists = [] } = useSelector(state => state.boardReducer.board) || {}

  useEffect(() => {
    document.getElementById('root').classList.add('ofy-h')
    socketService.emit(socketTypes.JOIN_BOARD, boardId)
    socketService.on(socketTypes.BOARD_UPDATED, nextBoard => {
      dispatch({ type: boardTypes.SET_BOARD, payload: nextBoard })
    })
    return () => {
      document.getElementById('root').classList.remove('ofy-h')
      socketService.emit(socketTypes.LEAVE_BOARD, boardId)
      socketService.off(socketTypes.BOARD_UPDATED)
    }
  }, [])

  return (
    <main className="board fg1 flex col">
      {/* <FPSStats/> */}
      <BoardHeader />
      {boardId && (
        <Droppable droppableId="board" direction="horizontal" type="LIST">
          {({ droppableProps, placeholder, innerRef }, snapshot) => (
            <main {...droppableProps} ref={innerRef} className="flex">
              <div className="lists flex">
                {lists.map((list, idx) => (
                  <List list={list} key={list._id} idx={idx} />
                ))}
                {placeholder}
              </div>
              <AddList idx={lists.length} />
            </main>
          )}
        </Droppable>
      )}
    </main>
  )
}
