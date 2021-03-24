import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from 'store/board/BoardActions'
import { makeId } from 'service/utilService'
import { useSetState } from 'react-use'
import { Button } from '@material-ui/core'
import { PopoverHeader } from 'components/Popover/PopoverHeader'

export const CheckListPopover = ({ togglePopover }) => {
  const { _id: cardId = '', checklists = [] } = useSelector(state => state.boardReducer.card) || {}

  const [checklist, setChecklist] = useSetState({
    _id: makeId(),
    title: '',
    items: []
  })
  const dispatch = useDispatch()

  const onAddChecklist = ev => {
    ev.preventDefault()
    dispatch(UPDATE_CARD({ name: 'checklist', value: [...checklists, checklist], cardId }))
  }

  const handleInput = ({ target: { value } }) => setChecklist({ title: value })

  return (
    <div className="popover-cmp checklist-section flex col">
      <PopoverHeader title="Checklist" ></PopoverHeader>
      <form action="" className="flex col" onSubmit={onAddChecklist}>
        <label htmlFor="checklist-title">Title:</label>
        <input
          autoFocus
          id="checklist-title"
          value={checklist.title}
          onChange={handleInput}
          type="text"
          placeholder="Insert a title..."
        />
        <Button>Add</Button>
      </form>
    </div>
  )
}
