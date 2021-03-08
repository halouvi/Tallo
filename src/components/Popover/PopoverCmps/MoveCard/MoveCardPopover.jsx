import { useUpdateEffect, useSetState, useToggle } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { HANDLE_DROP } from '../../../../store/board/BoardActions'
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core'
import { PopoverHeader } from '../../PopoverHeader'

export const MoveCardPopover = () => {
  const dispatch = useDispatch()
  const card = useSelector(state => state.boardReducer.card) || {}
  const list = useSelector(state => state.boardReducer.list) || {}
  const lists = useSelector(state => state.boardReducer.board.lists)

  const initState = { targetList: list, targetPos: card._id }
  const [{ targetPos, targetList }, setTarget] = useSetState(initState)
  useUpdateEffect(() => setTarget(initState), [lists])

  const handleInput = ({ target: { name, value } }) => {
    name === 'targetPos'
      ? setTarget({ targetPos: value })
      : setTarget({
          targetList: lists.find(({ _id }) => _id === value),
          targetPos: value === list._id ? card._id : value
        })
  }

  const moveCard = () => {
    if (targetPos === card._id) return
    dispatch(
      HANDLE_DROP({
        type: 'CARD',
        posOffset: null,
        sourceId: card._id,
        targetId: targetPos
      })
    )
    setTarget(initState)
  }

  return (
    <div className="popover-cmp flex col gb6">
      <PopoverHeader title="Move Card" />
      <InputLabel htmlFor="targetList">To List:</InputLabel>
      <Select
        value={targetList._id}
        onChange={handleInput}
        inputProps={{
          name: 'targetList',
          id: 'targetList'
        }}>
        {lists.map(currList => (
          <MenuItem value={currList._id} key={currList._id}>
            {`${currList.title} ${currList === list ? '(Current)' : ''}`}
          </MenuItem>
        ))}
      </Select>
      <InputLabel htmlFor="targetPos">Position:</InputLabel>
      <Select
        onOpen={ev => console.log(ev)}
        value={targetPos}
        onChange={handleInput}
        inputProps={{
          name: 'targetPos',
          id: 'targetPos'
        }}>
        {targetList.cards.map((currCard, idx) => (
          <MenuItem value={currCard._id} key={currCard._id}>
            {`${idx + 1} ${card._id === currCard._id ? '(Current)' : ''}`}
          </MenuItem>
        ))}
        {list._id !== targetList._id && (
          <MenuItem value={targetList._id}>{targetList.cards.length + 1}</MenuItem>
        )}
      </Select>
      <Button size="large" className="green" onClick={moveCard}>
        Move
      </Button>
    </div>
  )
}
