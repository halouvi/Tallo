import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import utilService from '../../../../service/utilService'
import { UPDATE_BOARD } from '../../../../store/board/BoardActions'

export const LabelEditor = ({ labelToEdit, setLabelToEdit, editMode, colors }) => {
  const dispatch = useDispatch()
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const [updatedLabel, setUpdatedLabel] = useState({ ...labelToEdit })

  const handleInput = ({ target: { name, value } }) => {
    setUpdatedLabel({ ...updatedLabel, [name]: value })
  }

  const saveLabel = () => {
    const labelsClone = JSON.parse(JSON.stringify(gLabels))
    if (!updatedLabel._id) {
      updatedLabel._id = utilService.makeId()
      labelsClone.push(updatedLabel)
    } else {
      const idx = gLabels.findIndex(label => label._id === labelToEdit._id)
      labelsClone.splice(idx, 1, updatedLabel)
    }
    dispatch(UPDATE_BOARD({ field: 'labels', value: labelsClone }))
    setLabelToEdit(null)
  }

  const deleteLabel = () => {
    const labelsClone = JSON.parse(JSON.stringify(gLabels))
    const labelsFiltered = labelsClone.filter(label => label._id !== labelToEdit._id)
    dispatch(UPDATE_BOARD({ field: 'labels', value: labelsFiltered }))
    setLabelToEdit(null)
  }

  return (
    <>
      <button className="ass" onClick={() => setLabelToEdit(null)}>
        Back
      </button>
      <span className="title bold asc">{updatedLabel._id ? 'Edit' : 'Add'} Label</span>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" value={updatedLabel.name} onChange={handleInput} />
      <label>Select Color</label>
      <div className="grid c4 g6">
        {colors.map(color => (
          <input
            key={color}
            type="button"
            name="color"
            value={color}
            onClick={handleInput}
            className={`pointer color fast ${color}${
              updatedLabel.color === color ? ' selected' : ''
            }`}
          />
        ))}
      </div>
      <div className="flex jb">
        <button onClick={saveLabel}>Save</button>
        {updatedLabel._id && <button onClick={deleteLabel}>Delete</button>}
      </div>
    </>
  )
}
