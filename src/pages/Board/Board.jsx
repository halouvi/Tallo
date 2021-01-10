import { useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_CARD, GET_BOARD_BY_ID, UPDATE_BOARD } from '../../store/board/BoardActions'
import { List } from '../../components/Board/List/List'

export const Board = () => {
  const board = useSelector(state => state.boardReducer.board)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GET_BOARD_BY_ID('5fe4b65432d4a24dbcb7afa2'))
  }, [dispatch])

  const addCard = (card, listId) => {
    dispatch(ADD_CARD(card, listId))
  }

  const [{ isOver }, drop] = useDrop({
    accept: 'List',
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const handleDrop = ({ item, targetListId, targetCardId, placeholderPos }) => {
    const { type, sourceListId, sourceCardId } = item
    const lists = JSON.parse(JSON.stringify(board.lists))

    if (type === 'List') {
      const sourceListIdx = lists.findIndex(list => list._id === sourceListId)
      const [list] = lists.splice(sourceListIdx, 1)
      const targetListIdx = lists.findIndex(list => list._id === targetListId)
      !(targetListIdx + placeholderPos)
        ? lists.unshift(list)
        : lists.splice(targetListIdx + placeholderPos, 0, list)
        
    } else if (type === 'Card') {
      const sourceList = lists.find(list => list._id === sourceListId)
      const targetList = lists.find(list => list._id === targetListId)
      const sourceCardIdx = sourceList.cards.findIndex(card => card._id === sourceCardId)
      const [card] = sourceList.cards.splice(sourceCardIdx, 1)
      const targetCardIdx = targetList.cards.findIndex(card => card._id === targetCardId)
      !(targetCardIdx + placeholderPos)
        ? targetList.cards.unshift(card)
        : targetList.cards.splice(targetCardIdx + placeholderPos, 0, card)
    }
    dispatch(UPDATE_BOARD({ field: 'lists', value: lists }))
  }

  return (
    board && (
      <main ref={drop} className="board flex col as">
        <span>{board?.title}</span>
        <section className="container flex">
          {board?.lists.map((list, idx) => (
            <List list={list} key={list._id} addCard={addCard} handleDrop={handleDrop} />
          ))}
        </section>
      </main>
    )
  )
}
