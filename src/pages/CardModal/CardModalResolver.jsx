import { CardModal } from 'pages/CardModal/CardModal'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { GET_BY_ID } from 'store/board/BoardActions'

export const CardModalResolver = () => {
  const dispatch = useDispatch()
  const { cardId } = useParams()

  useEffect(() => dispatch(GET_BY_ID(cardId)), [cardId])
  
  const card = useSelector(state => state.boardReducer.card)

  return !card ? <></> : <CardModal card={card} />
}
