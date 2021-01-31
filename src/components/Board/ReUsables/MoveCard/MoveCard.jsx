import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { HANDLE_DROP } from '../../../../store/board/BoardActions'

export const MoveCard = ({ card, list, togglePopover }) => {
  const dispatch = useDispatch()
  const { lists } = useSelector(state => state.boardReducer.board)
  const [targetList, setTargetList] = useState(list)
  const [details, setDetails] = useState({
    type: 'CARD',
    posOffset: null,
    sourceListId: list._id,
    sourceCardId: card._id,
    targetListId: list._id,
    targetCardId: card._id
  })

  const handleInput = ({ target: { name, value } }) => setDetails({ ...details, [name]: value })

  useUpdateEffect(() => {
    setTargetList(lists.find(({ _id }) => _id === details.targetListId))
  }, [details.targetListId])

  useUpdateEffect(() => {
    setDetails({ ...details, targetCardId: targetList._id !== list._id ? '' : card._id })
  }, [targetList])

  const moveCard = ev => {
    if (details.targetCardId !== details.sourceCardId) {
      dispatch(HANDLE_DROP(details))
      togglePopover(ev)
    }
  }

  return (
    <div className="move-card reusable flex col">
      <button className="close-btn pos-tr" onClick={togglePopover}>
        X
      </button>
      <span className="title bold asc">Move Card</span>
      <span className="title bold">To List:</span>
      <select name="targetListId" value={details.targetListId} onChange={handleInput}>
        {lists.map(lst => (
          <option value={lst._id} key={lst._id}>
            {`${lst.title} ${list._id === lst._id ? '(Current)' : ''}`}
          </option>
        ))}
      </select>
      <span className="title bold">Position:</span>
      <select name="targetCardId" value={details.targetCardId} onChange={handleInput}>
        {targetList.cards.map((crd, idx) => (
          <option value={crd._id} key={crd._id}>
            {`${idx + 1} ${card._id === crd._id ? '(Current)' : ''}`}
          </option>
        ))}
        {list._id !== details.targetListId && (
          <option value={''}>{targetList.cards.length + 1}</option>
        )}
      </select>
      <button onClick={moveCard}>Move</button>
    </div>
  )
}
