import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

export const CardNav = () => {
  const cards = useSelector(state => state.boardReducer.list?.cards)
  const cardId = useSelector(state => state.boardReducer.card?._id)

  const history = useHistory()

  const cycleCards = ev => {
    ev.nativeEvent.avoidCardModal = true
    const cardIdx = cards.findIndex(currCard => currCard._id === cardId)
    const nextCardId = cardIdx > -1 && cards[cardIdx + +ev.currentTarget.value]?._id
    if (nextCardId) history.push(nextCardId)
  }

  return cards ? (
    <nav className="flex jb fw">
      <Button variant="outlined" size="large" className="white" value={-1} onClick={cycleCards}>
        Previous Card
      </Button>
      <Button variant="outlined" size="large" className="white" value={1} onClick={cycleCards}>
        Next Card
      </Button>
    </nav>
  ) : (
    <></>
  )
}
