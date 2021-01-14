import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep as clone } from 'lodash'
import {
  ADD_CARD,
  GET_BOARD_BY_ID,
  UPDATE_BOARD,
  findItems,
  boardTypes,
  ADD_LIST,
  REMOVE_LIST,
} from '../../store/board/BoardActions'
import { List } from '../../components/Board/List/List'
import { socketService, socketTypes } from '../../service/socketService.js'
import { BoardHeader } from '../../components/Board/BoardHeader/BoardHeader'

const _id = '5fe4b65432d4a24dbcb7afa2'

export const Board = () => {
  const { lists, title, _id, members } = useSelector(state => state.boardReducer.board) || {}
  const {userBoards} = useSelector(state => state.userReducer) || {}
  const [isAddList, setIsAddList] = useState(false)
  const [newList, setNewList] = useState({
    title: '',
    cards: []
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (!_id) dispatch(GET_BOARD_BY_ID('5fe4b65432d4a24dbcb7afa2'))
    socketService.setup()
    socketService.emit(socketTypes.JOIN_BOARD, _id)
    socketService.on(socketTypes.BOARD_UPDATED, board =>
      dispatch({ type: boardTypes.SET_BOARD, payload: board })
    )
    return () => {
      socketService.terminate()
    }
  }, [])

  const addCard = (card, listId) => {
    dispatch(ADD_CARD(card, listId))
  }

  const addList = (ev) => {
    ev.preventDefault()
    dispatch(ADD_LIST(newList))
    setIsAddList(false)
    setNewList({  title: '', cards: []})
  }

  const removeList = (listId) => {
    const isSure = window.confirm('Are you sure?')
    if(isSure) dispatch(REMOVE_LIST(listId))
  }

  const handleInput = ({ target: { name, value } }, item) => {
    setNewList({ ...newList, [name]: value })
  }

  const [{ isOver }, drop] = useDrop({
    accept: 'LIST',
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const handleDrop = ({ item, targetListId, targetCardId, placeholderPos }) => {
    const { type, sourceListId, sourceCardId } = item
    const nextLists = clone(lists)

    if (type === 'LIST') {
      const sourceListIdx = nextLists.findIndex(list => list._id === sourceListId)
      const [list] = nextLists.splice(sourceListIdx, 1)
      const targetListIdx = nextLists.findIndex(list => list._id === targetListId)
      nextLists.splice(targetListIdx + placeholderPos, 0, list)
    } else if (type === 'CARD') {
      const { cardIdx: sourceCardIdx, list: sourceList } = findItems(nextLists, sourceCardId)
      const [card] = sourceList.cards.splice(sourceCardIdx, 1)
      const { cardIdx: targetCardIdx, list: targetList } = findItems(nextLists, targetCardId)
      targetList.cards.splice(targetCardIdx + placeholderPos, 0, card)
    }
    dispatch(UPDATE_BOARD({ name: 'lists', value: nextLists }))
  }

  return (
    <main ref={drop} className="board">
      <BoardHeader boardTitle={title} boardMembers={members} userBoards={userBoards} ></BoardHeader>
      <section className="container flex">
        {lists?.map(list => (
          <List list={list} key={list._id} removeList={removeList} addCard={addCard} handleDrop={handleDrop} />
        ))}
        {isAddList && (
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
        )}
        {!isAddList && (
          <div className="add-list-container" onClick={() => setIsAddList(true)}>
            <p><span>+</span> Add another list</p>
          </div>
        )}
      </section>
    </main>
  )
}
