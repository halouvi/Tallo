import { useState } from 'react'
import { useUpdateEffect, useSetState } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { HANDLE_DROP } from '../../../../store/board/BoardActions'

export const MoveCard = ({ card, list, togglePopover }) => {
  const dispatch = useDispatch()
  const { lists } = useSelector(state => state.boardReducer.board)
  const [targetList, setTargetList] = useState(list)
  const [{ targetId, targetListId }, setEditables] = useSetState({
    targetId: card._id,
    targetListId: list._id
  })

  const handleInput = ({ target: { name, value } }) => setEditables({ [name]: value })

  useUpdateEffect(() => {
    setTargetList(lists.find(({ _id }) => _id === targetListId))
    setEditables({ targetId: targetListId === list._id ? card._id : targetListId })
  }, [targetListId])

  const moveCard = ev => {
    if (targetId === card._id) return
    dispatch(
      HANDLE_DROP({
        type: 'CARD',
        posOffset: null,
        sourceId: card._id,
        targetId
      })
    )
    togglePopover(ev)
  }

  return (
    <div className="move-card reusable flex col">
      <button className="close-btn pos-tr" onClick={togglePopover}>
        X
      </button>
      <span className="title bold asc">Move Card</span>
      <span className="title bold">To List:</span>
      <select name="targetListId" value={targetListId} onChange={handleInput}>
        {lists.map(currList => (
          <option value={currList._id} key={currList._id}>
            {`${currList.title} ${list._id === currList._id ? '(Current)' : ''}`}
          </option>
        ))}
      </select>
      <span className="title bold">Position:</span>
      <select name="targetId" value={targetId} onChange={handleInput}>
        {targetList.cards.map((currCard, idx) => (
          <option value={currCard._id} key={currCard._id}>
            {`${idx + 1} ${card._id === currCard._id ? '(Current)' : ''}`}
          </option>
        ))}
        {list._id !== targetListId && (
          <option value={targetListId}>{targetList.cards.length + 1}</option>
        )}
      </select>
      <button onClick={moveCard}>Move</button>
    </div>
  )
}
