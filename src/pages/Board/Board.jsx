import { useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { GET_BOARD_BY_ID, UPDATE_BOARD } from '../../store/board/BoardActions'
import { List } from '../../components/Board/List/List'
import UtilService from '../../service/UtilService'


export const Board = () => {
  const board = useSelector(state => state.boardReducer.board)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GET_BOARD_BY_ID('5fe4b65432d4a24dbcb7afa2'))
  }, [dispatch])

  const addCard = (card, listId) => {
    card._id = UtilService.makeId();
    card.activity.push({activity: 'Added this card', createdAt: Date.now(), createdBy: 'Orly Amdadi'})
    const boardClone = JSON.parse(JSON.stringify(board))
    var listIdx = boardClone.lists.findIndex((list) => list._id === listId);
    boardClone.lists[listIdx].cards.push(card);
    dispatch(UPDATE_BOARD(boardClone));
  }

  const [{ isOver }, drop] = useDrop({
    accept: 'LIST',
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const handleDrop = (item, targetListIdx, targetCardIdx) => {
    const { type, sourceListIdx, sourceCardIdx } = item
    const boardClone = JSON.parse(JSON.stringify(board))
    const { lists } = boardClone

    if (type === 'LIST') {
      const [list] = lists.splice(sourceListIdx, 1)
      targetListIdx >= 0 ? lists.splice(targetListIdx, 0, list) : lists.push(list)
    } else if (type === 'CARD') {
      const sourceList = lists[sourceListIdx].cards
      const targetList = lists[targetListIdx].cards
      const [card] = sourceList.splice(sourceCardIdx, 1)
      targetCardIdx >= 0 ? targetList.splice(targetCardIdx, 0, card) : targetList.unshift(card)
    }
    dispatch(UPDATE_BOARD(boardClone))
  }

  return ( board &&
    <main ref={drop} className={`board flex col as`}>
      <span>{board?.title}</span>
      <section className="container flex as">
        {board?.lists.map((list, idx) => (
          <List list={list} key={list._id} thisListIdx={idx} addCard={addCard} handleDrop={handleDrop} />
        ))}
      </section>
    </main>
  )
}
