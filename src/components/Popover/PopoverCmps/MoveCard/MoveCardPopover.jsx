import { useUpdateEffect } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { HANDLE_DROP } from 'store/board/BoardActions'
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core'
import { PopoverHeader } from 'components/Popover/PopoverHeader'
import { useLocation } from 'react-router'
import { useInput } from 'hooks/useInput'
import { useState } from 'react'

export const MoveCardPopover = ({ togglePopover }) => {
  const dispatch = useDispatch()
  const card = useSelector(state => state.boardReducer.card)
  const list = useSelector(state => state.boardReducer.list)
  const lists = useSelector(state => state.boardReducer.board.lists)
  
  const cardIdx = list?.cards.findIndex(({ _id }) => _id === card._id)

  const [targetIdx, setTargetIdx] = useInput(cardIdx)
  const [targetList, setTargetList] = useState(list)

  useUpdateEffect(() => {
    if (card) {
      setTargetList(list)
      setTargetIdx(cardIdx)
    }
  }, [card])

  const handleChange = ({ target: { value } }) => {
    const targetList = lists.find(({ _id }) => _id === value)
    const targetIdx = targetList._id === list._id ? cardIdx : targetList.cards.length
    setTargetList(targetList)
    setTargetIdx(targetIdx)
  }

  const inModal = useLocation().pathname.includes('board/card')
  const moveCard = ev => {
    ev.preventDefault()
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

  const isHere = card?._id === targetList?.cards[targetIdx]?._id

  return (
    targetList?.cards && (
      <form className="popover-cmp flex col gb6" onSubmit={moveCard}>
        <PopoverHeader title="Move Card" />
        <InputLabel>To List:</InputLabel>
        <Select autoFocus value={targetList?._id} onChange={handleChange}>
          {lists.map(({ _id, title }) => (
            <MenuItem value={_id} key={_id}>
              {`${title} ${_id === list?._id ? '(Current)' : ''}`}
            </MenuItem>
          ))}
        </Select>
        <InputLabel>Position:</InputLabel>
        <Select value={targetIdx} onChange={setTargetIdx}>
          {targetList?.cards.map(({ _id }, idx) => (
            <MenuItem key={_id} value={idx}>
              {`${idx + 1} ${_id === card?._id ? '(Current)' : ''}`}
            </MenuItem>
          ))}
          <MenuItem
            className={list?._id === targetList?._id ? 'hidden' : ''}
            value={targetList?.cards.length}>
            {targetList?.cards.length + 1}
          </MenuItem>
        </Select>
        <Button size="large" type="submit" disabled={isHere} className={isHere ? 'gray' : 'green'}>
          Move
        </Button>
      </form>
    )
  )
}
