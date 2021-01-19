import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HANDLE_DROP } from '../../../../store/board/BoardActions'

export const MoveCard = ({ card, list, setAnchorEl }) => {
  const dispatch = useDispatch()
  const board = useSelector(state => state.boardReducer.board)
  const [target, setTarget] = useState({ list, card })

  const handleInput = ({ target: { name, value } }) => {
    setTarget({ ...target, [name]: value })
  }

  useEffect(() => {
    console.log(target)
  }, [target])

  const moveCard = () => {
    dispatch(
      HANDLE_DROP({
        targetListId: target.list._id,
        targetCardId: target.card._id,
        item: {
          type: 'CARD',
          sourceListId: list._id,
          sourceCardId: card._id
        }
      })
    )
  }

  return (
    <div className="move-card reusable flex col">
      <button className="close-btn pos-tr" onClick={() => setAnchorEl(null)}>
        X
      </button>
      <span className="title bold asc">Move Card</span>
      <span className="title bold">To List:</span>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={target.list}
        name="list"
        html={target.list.title}
        onChange={handleInput}>
        {board.lists.map(lst => (
          <MenuItem value={lst} key={lst._id}>
            {lst.title}
          </MenuItem>
        ))}
      </Select>
      <span className="title bold">Position</span>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={target.card}
        name="card"
        html={target.card.title}
        onChange={handleInput}>
        {target.list.cards.map((crd, idx) => (
          <MenuItem value={crd} key={crd._id}>
            {idx + 1}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}
