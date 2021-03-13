import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardTypes } from 'store/board/BoardActions'
import { List } from 'components/Board/List/List'
import { socketService, socketTypes } from 'service/socketService.js'
import { BoardHeader } from 'components/Board/BoardHeader/BoardHeader'
import { useHistory } from 'react-router'
import { AddList } from 'components/Board/AddList/AddList'
import { DragLayer } from 'components/DragLayer/DragLayer'

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
    <>
      <main className="board fg1 flex col">
        <BoardHeader />
        {boardId && (
          <main className="lists fg1 flex">
            {lists.map(list => (
              <List list={list} key={list._id} />
            ))}
            <AddList />
          </main>
        )}
      {/* <DragLayer x={mouse.x} y={mouse.y} /> */}
      </main>
    </>
  )
}
