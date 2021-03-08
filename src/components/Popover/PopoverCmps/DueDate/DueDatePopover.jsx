import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'
import { PopoverHeader } from '../../PopoverHeader'

export const DueDatePopover = ({ togglePopover }) => {
  const { dueDate: prevDueDate, _id: cardId } = useSelector(state => state.boardReducer.card)
  const [dateFormat, setDateFormat] = useState('')
  const [dueDate, setDueDate] = useState(Date.now())
  const dispatch = useDispatch()

  const prevDate = () => {
    if (prevDate) {
      var toDate = new Date(prevDueDate).getDate()
      var toMonth = new Date(prevDueDate).getMonth() + 1
      var toYear = new Date(prevDueDate).getFullYear()
      if (`${toMonth}`.length < 2) toMonth = '0' + toMonth
      var originalDate = toYear + '-' + toMonth + '-' + toDate
      return originalDate
    } else return ''
  }

  const saveDueDate = ev => {
    ev.preventDefault()
    dispatch(UPDATE_CARD({ name: 'dueDate', value: dueDate, cardId }))
    togglePopover(ev)
  }

  const onHandleChange = ev => {
    const value = ev.target.value
    const date = new Date(value)
    const timestamp = date.getTime()
    setDateFormat(value)
    setDueDate(timestamp)
  }

  return (
    <div className="popover-cmp due-date-section flex col">
      <PopoverHeader title="Due Date" />
      <form action="" onSubmit={saveDueDate} className="due-date-form flex col">
        <input
          type="date"
          value={dateFormat ? dateFormat : prevDate()}
          onChange={onHandleChange}
          name="dueDate"
          id=""
        />
        <button>Save</button>
      </form>
    </div>
  )
}
