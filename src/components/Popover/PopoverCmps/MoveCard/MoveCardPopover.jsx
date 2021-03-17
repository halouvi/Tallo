import { useUpdateEffect, useSetState, useUpdate } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { HANDLE_DROP } from 'store/board/BoardActions'
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core'
import { PopoverHeader } from 'components/Popover/PopoverHeader'
import { usePopover } from 'components/Popover/Popover'
import { useLocation } from 'react-router'

export const MoveCardPopover = () => {
  const dispatch = useDispatch()
  const card = useSelector(state => state.boardReducer.card) || {}
  const list = useSelector(state => state.boardReducer.list) || {}
  const lists = useSelector(state => state.boardReducer.board.lists)

  const cardIdx = list.cards.findIndex(({ _id }) => _id === card._id)

  const initState = { targetList: list, targetIdx: cardIdx }

  const [{ targetIdx, targetList }, setTarget] = useSetState(initState)
  
  useUpdateEffect(() => setTarget(initState), [card])

  const handleInput = ({ target: { name, value } }) => {
    if (name === 'targetIdx') setTarget({ targetIdx: value })
    else {
      const targetList = lists.find(({ _id }) => _id === value)
      setTarget({
        targetList,
        targetIdx: targetList._id === list._id ? cardIdx : targetList.cards.length
      })
    }
  }

  const { togglePopover } = usePopover()
  const inModal = useLocation().pathname.includes('board/card')
  const moveCard = ev => {
    dispatch(
      HANDLE_DROP({
        source: {
          droppableId: list._id,
          index: cardIdx
        },
        destination: {
          droppableId: targetList._id,
          index: targetIdx
        }
      })
    )
    if (!inModal) togglePopover(ev)
  }

  return (
    <div className="popover-cmp flex col gb6">
      <PopoverHeader title="Move Card" />
      <InputLabel htmlFor="targetList">To List:</InputLabel>
      <Select value={targetList._id} onChange={handleInput} inputProps={{ name: 'targetList' }}>
        {lists.map(({ _id, title }) => (
          <MenuItem value={_id} key={_id}>
            {`${title} ${_id === list._id ? '(Current)' : ''}`}
          </MenuItem>
        ))}
      </Select>
      <InputLabel htmlFor="targetIdx">Position:</InputLabel>
      <Select value={targetIdx} onChange={handleInput} inputProps={{ name: 'targetIdx' }}>
        {targetList.cards.map(({ _id }, idx) => (
          <MenuItem value={idx} key={_id}>
            {`${idx + 1} ${_id === card._id ? '(Current)' : ''}`}
          </MenuItem>
        ))}
        <MenuItem
          className={list._id === targetList._id ? 'hidden' : ''}
          value={targetList.cards.length}>
          {targetList.cards.length + 1}
        </MenuItem>
      </Select>
      <Button
        size="large"
        className="green"
        onClick={moveCard}
        disabled={card._id === targetList.cards[targetIdx]?._id}>
        Move
      </Button>
    </div>
  )
}
