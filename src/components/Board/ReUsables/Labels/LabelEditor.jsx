import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'

export const LabelEditor = ({ labelToEdit }) => {
  // const gLabels = useSelector(state => state.boardReducer.board.labels)
  const [labelName, setLabelName] = useState(labelToEdit.name)
  // const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()

  // const updateLabel = gLabelId => {
  //   if (labels.some(label => label === gLabelId)) {
  //     const labelsFiltered = labels.filter(label => label !== gLabelId)
  //     dispatch(UPDATE_BOARD({ field: 'labels', value: labelsFiltered, cardId }))
  //   }
  // }

  return (
    <>
      {labelToEdit.color}
      {/* <span className="title bold asc">Edit Label</span>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        placeholder="Search Labels"
        value={searchTerm}
        onChange={ev => setSearchTerm(ev.target.value.toLowerCase())}
      />
      <div className="list flex col">
        {gLabels.map(
          ({ color, name, _id: gLabelId }) =>
            name.toLowerCase().includes(searchTerm) && (
              <div style={{ backgroundColor: color }} className="flex jb pointer">
                <div className="fw" onClick={() => toggleLabel(gLabelId)}>
                  {name}
                  {labels.some(label => label === gLabelId) && <span> V</span>}
                </div>
                <button onClick={() => setIsEdit(true)}>edit</button>
              </div>
            )
        )}
      </div> */}
    </>
  )
}
