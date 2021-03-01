import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardTypes } from '../../store/board/BoardActions'
import { List } from '../../components/Board/List/List'
import { socketService, socketTypes } from '../../service/socketService.js'
import { BoardHeader } from '../../components/Board/BoardHeader/BoardHeader'
import { useHistory } from 'react-router'
import { AddList } from '../../components/Board/AddList/AddList'

export const Board = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const boards = useSelector(state => state.userReducer.user?.boards)
  const { _id: boardId = '', lists = [] } = useSelector(state => state.boardReducer.board) || {}

  useEffect(() => {
    if (!boards[0]) history.replace('/create-modal')
    else {
      socketService.emit(socketTypes.JOIN_BOARD, boardId)
      socketService.on(socketTypes.BOARD_UPDATED, nextBoard => {
        dispatch({ type: boardTypes.SET_BOARD, payload: nextBoard })
      })
    }
    return () => {
      socketService.emit(socketTypes.LEAVE_BOARD, boardId)
      socketService.off(socketTypes.BOARD_UPDATED)
    }
  }, [])

  return (
    <main className="board flex col">
      <BoardHeader />
      {boardId && (
        <section className="container flex">
          {lists.map(list => (
            <List list={list} key={list._id} />
          ))}
          <AddList />
        </section>
      )}
    </main>
  )
}
