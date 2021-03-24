import { Button } from '@material-ui/core'
import { usePopover } from 'components/Popover/Popover'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

export const CardNav = () => {
  const cards = useSelector(state => state.boardReducer.list.cards)
  const cardId = useSelector(state => state.boardReducer.card._id)

  const history = useHistory()

  const cardIdx = cards.findIndex(currCard => currCard._id === cardId)
  const nextCardId = cards[cardIdx + 1]?._id
  const prevCardId = cards[cardIdx - 1]?._id

  const cycleCards = ev => {
    ev.nativeEvent.avoidCardModal = true
    history.push(ev.currentTarget.value)
  }

  return cards ? (
    <nav className="flex jb fw">
      <div onClick={ev => !prevCardId && ev.stopPropagation()}>
        <Button
          variant="outlined"
          size="large"
          className="white"
          disabled={!prevCardId}
          value={prevCardId}
          onClick={cycleCards}>
          Previous Card
        </Button>
      </div>
      <div value={nextCardId} onClick={ev => !nextCardId && ev.stopPropagation()}>
        <Button
          variant="outlined"
          size="large"
          className="white"
          disabled={!nextCardId}
          value={nextCardId}
          onClick={cycleCards}>
          Next Card
        </Button>
      </div>
    </nav>
  ) : (
    <></>
  )
}
