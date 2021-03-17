import { useUpdateEffect, useSetState } from 'react-use'
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

  const cardIdx = list.cards?.findIndex(({ _id }) => _id === card._id)
  const initState = { targetList: list, targetIdx: cardIdx }
  const [{ targetIdx, targetList }, setTarget] = useSetState(initState)
  useUpdateEffect(() => setTarget(initState), [lists])

  const handleInput = ({ target: { name, value } }) => setTarget({ [name]: value })

  useUpdateEffect(() => {
    setTarget({ targetIdx: targetList === list ? cardIdx : targetList.cards.length })
  }, [targetList])

  const togglePopover = usePopover()
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
      <Select value={targetList} onChange={handleInput} inputProps={{ name: 'targetList' }}>
        {lists.map(currList => (
          <MenuItem value={currList} key={currList._id}>
            {`${currList.title} ${currList === list ? '(Current)' : ''}`}
          </MenuItem>
        ))}
      </Select>
      <InputLabel htmlFor="targetIdx">Position:</InputLabel>
      <Select value={targetIdx} onChange={handleInput} inputProps={{ name: 'targetIdx' }}>
        {targetList.cards.map((currCard, idx) => (
          <MenuItem value={idx} key={currCard._id}>
            {`${idx + 1} ${card._id === currCard._id ? '(Current)' : ''}`}
          </MenuItem>
        ))}
        {list !== targetList && (
          <MenuItem value={targetList.cards.length}>{targetList.cards.length + 1}</MenuItem>
        )}
      </Select>
      <Button size="large" className="green" onClick={moveCard} disabled={targetIdx === card._id}>
        Move
      </Button>
    </div>
  )
}
