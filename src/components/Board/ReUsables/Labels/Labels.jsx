import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'

export const Labels = ({ card: { labels, _id: cardId }, setAnchorEl }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  
  const addLabel = label => {
    dispatch(UPDATE_CARD({ field: 'labels', value: [...labels, label], cardId }))
  }

  const removeLabel = labelId => {
    const labelsClone = labels.filter(label => label._id !== labelId)
    dispatch(UPDATE_CARD({ field: 'labels', value: labelsClone, cardId }))
  }

  return (
    <div className="labels flex col">
      <span className="title bold asc">Labels</span>
      <button className="close-btn pos-tr" onClick={() => setAnchorEl(null)}>
        X
      </button>
      <input
        type="text"
        placeholder="Search Labels"
        value={searchTerm}
        onChange={ev => setSearchTerm(ev.target.value)}
      />
      <div className="list flex col">
        {labels.map(label => (
          <div className="flex jb" key={label._id}>
            <span>{label.name}</span>
            {/* <button onClick={() => removeLabel(label._id)}>X</button> */}
            {/* <button onClick={() => addLabel(user)}>+</button> */}
          </div>
        ))}
      </div>
    </div>
  )
}
