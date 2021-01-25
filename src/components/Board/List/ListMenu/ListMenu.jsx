import { Labels } from '../../ReUsables/Labels/Labels'
import { DeleteCard } from '../../ReUsables/DeleteCard/DeleteCard'
import { useEffect } from 'react'

export const ListMenu = ({ listId, removeList, handleClose }) => {

  useEffect(() => {
    console.log(listId);

  }, [])

  return (
    <div className="list-menu reusable flex col">
      <span className="title asc">Delete List?</span>
      <div className="flex">
        <button className="modal-btn" onClick={() => removeList(listId)}>
          Delete
        </button>
        <button className="modal-btn" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
