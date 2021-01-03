// import { useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd'

export const CardModal = ({ closeModal, card }) => {

  

  return (
    <div onClick={closeModal} className="modal-container">
      <div className="modal-section">
        <button onClick={closeModal}>X</button>
      Card Modal! {card._id}
      </div>
    </div>
  )
}
