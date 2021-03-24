import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { Button } from '@material-ui/core'
import { PopoverHeader } from 'components/Popover/PopoverHeader'
import { UPDATE_CARD } from 'store/board/BoardActions'

const DUE_DATE = 'dueDate'

export const DueDatePopover = ({ togglePopover }) => {
  const { _id: cardId, dueDate } = useSelector(state => state.boardReducer.card) || {}

  const [nextDueDate, setNextDueDate] = useState(dueDate)
  const handleInput = date => setNextDueDate(Date.parse(date))

  const dispatch = useDispatch()
  const saveDueDate = ev => {
    dispatch(UPDATE_CARD({ name: DUE_DATE, value: nextDueDate, cardId }))
    togglePopover(ev)
  }

  const noChange = nextDueDate === dueDate
  return (
    <div className="popover-cmp due-date flex col">
      <PopoverHeader title="Due Date" />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker variant="static" value={nextDueDate} onChange={handleInput} />
      </MuiPickersUtilsProvider>
      <Button
        size="large"
        disabled={noChange}
        onClick={saveDueDate}
        className={noChange ? 'gray' : 'green'}>
        Save
      </Button>
    </div>
  )
}
