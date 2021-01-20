import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'

export const DueDate = ({ card: { dueDate: prevDueDate, _id: cardId }, setAnchorEl }) => {
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

  const saveDueDate = (ev) => {
    ev.preventDefault();
    dispatch(UPDATE_CARD({ name: 'dueDate', value: dueDate, cardId }))
    setAnchorEl(null)
  }

  const onHandleChange = ev => {
    const value = ev.target.value
    const date = new Date(value)
    const timestamp = date.getTime()
    setDateFormat(value)
    setDueDate(timestamp)
  }

  return (
    <div className="due-date-section reusable flex col">
      <button className="close-btn pos-tr" onClick={() => setAnchorEl(null)}>
        X
      </button>
      <p className="title bold asc">Change Due Date</p>
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
