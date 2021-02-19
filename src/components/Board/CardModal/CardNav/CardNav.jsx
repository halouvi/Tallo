import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

export const CardNav = () => {
  const cards = useSelector(state => state.boardReducer.list?.cards)
  const cardId = useSelector(state => state.boardReducer.card?._id)

  const history = useHistory()

  const cycleCards = ev => {
    ev.stopPropagation()
    const cardIdx = cards.findIndex(currCard => currCard._id === cardId)
    const nextCardId = cardIdx > -1 && cards[cardIdx + +ev.target.value]?._id
    if (nextCardId) history.push(nextCardId)
  }

  return cards ? (
    <nav className="flex jb fw">
      <button className="btn gray small" value={-1} onClick={cycleCards}>
        Previous Card
      </button>
      <button className="btn gray small" value={1} onClick={cycleCards}>
        Next Card
      </button>
    </nav>
  ) : (
    <></>
  )
}
