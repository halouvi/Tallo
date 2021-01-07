import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'

export const Labels = ({ card: { labels, _id: cardId }, setAnchorEl }) => {
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const [searchTerm, setSearchTerm] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()
  // const colors = [ cm m]

  const toggleLabel = gLabelId => {
    if (labels.some(label => label === gLabelId)) {
      const labelsFiltered = labels.filter(label => label !== gLabelId)
      dispatch(UPDATE_CARD({ field: 'labels', value: labelsFiltered, cardId }))
    } else dispatch(UPDATE_CARD({ field: 'labels', value: [...labels, gLabelId], cardId }))
  }

  return (
    <div className="labels reusable flex col">
      <button className="close-btn pos-tr" onClick={() => setAnchorEl(null)}>
        X
      </button>
      {!isEdit ? (
        <>
          <span className="title bold asc">Labels</span>
          <input
            type="text"
            placeholder="Search Labels"
            value={searchTerm}
            onChange={ev => setSearchTerm(ev.target.value.toLowerCase())}
          />
          <div className="list flex col">
            {gLabels.map(
              ({ color, name, _id: gLabelId }) =>
                name.toLowerCase().includes(searchTerm) && (
                  <div className={`flex jb pointer ${color}`}>
                    <div className="fw" onClick={() => toggleLabel(gLabelId)}>
                      {name}
                      {labels.some(label => label === gLabelId) && <span> V</span>}
                    </div>
                    <button onClick={() => setIsEdit(true)}>edit</button>
                  </div>
                )
            )}
          </div>
        </>
      ) : (
        <>
          <span className="title bold asc">Edit Label</span>
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
          </div>
        </>
      )}
    </div>
  )
}
