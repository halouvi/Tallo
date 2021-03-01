import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'
import { makeId } from '../../../../service/utilService'

export const CheckListPopover = ({ togglePopover }) => {
  const { _id: cardId = '', checklists = [] } = useSelector(state => state.boardReducer.card) || {}

  const [checklist, setChecklist] = useState({
    _id: makeId(),
    title: '',
    items: []
  })
  const dispatch = useDispatch()

  const onAddChecklist = ev => {
    ev.preventDefault()
    dispatch(UPDATE_CARD({ name: 'checklist', value: [...checklists, checklist], cardId }))
  }

  const onHandleChange = ev => {
    const value = ev.target.value
    const field = ev.target.name
    setChecklist({ ...checklist, [field]: value })
    console.log(checklist)
  }

  return (
    <div className="checklist-section popover-cmp flex col">
      <button className="close-btn pos-tr" onClick={togglePopover}>
        X
      </button>
      <p className="title bold asc">Add a Check List</p>
      <form action="" className="flex col" onSubmit={onAddChecklist}>
        <label htmlFor="checklist-title">Title:</label>
        <input
          autoFocus
          id="checklist-title"
          value={checklist.title}
          onChange={onHandleChange}
          name="title"
          type="text"
          placeholder="Insert a title..."
        />
        <button>Add</button>
      </form>
    </div>
  )
}
