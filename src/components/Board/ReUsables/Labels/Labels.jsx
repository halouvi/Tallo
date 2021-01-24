import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'
import { LabelEditor } from './LabelEditor'

export const Labels = ({ card: { labels, _id: cardId }, togglePopover }) => {
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const [searchTerm, setSearchTerm] = useState('')
  const [labelToEdit, setLabelToEdit] = useState(null)
  const dispatch = useDispatch()
  const newLabel = { _id: '', name: '', color: 'red' }
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'black']

  const toggleLabel = gLabelId => {
    dispatch(
      UPDATE_CARD({
        cardId,
        name: 'labels',
        value: labels.some(id => id === gLabelId)
          ? labels.filter(id => id !== gLabelId)
          : [...labels, gLabelId]
      })
    )
  }

  return (
    <div className="labels reusable flex col">
      <button className="close-btn" onClick={togglePopover}>
        X
      </button>
      {!labelToEdit && (
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
              gLabel =>
                gLabel.name.toLowerCase().includes(searchTerm) && (
                  <div className={`label fast flex jb pointer ${gLabel.color}`} key={gLabel._id}>
                    <div className="f-110" onClick={() => toggleLabel(gLabel._id)}>
                      {gLabel.name}
                      {labels.some(labelId => labelId === gLabel._id) && <span> V</span>}
                    </div>
                    <button className="fast" onClick={() => setLabelToEdit(gLabel)}>
                      edit
                    </button>
                  </div>
                )
            )}
          </div>
          <button onClick={() => setLabelToEdit(newLabel)}>Add Label</button>
        </>
      )}
      {labelToEdit && (
        <LabelEditor labelToEdit={labelToEdit} setLabelToEdit={setLabelToEdit} colors={colors} />
      )}
    </div>
  )
}
