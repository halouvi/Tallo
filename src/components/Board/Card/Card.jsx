import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {CardModal} from '../CardModal/CardModal'

export const Card = ({ card, thisListIdx, thisCardIdx, handleDrop }) => {
  const [isModal, setIsModal] = useState(false);

  const onToggleModal = () => {
    setIsModal(!isModal)
  }

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: item => handleDrop(item, thisListIdx, thisCardIdx),
    collect: monitor => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  })
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'CARD',
      card,
      sourceListIdx: thisListIdx,
      sourceCardIdx: thisCardIdx,
    },
    begin: monitor => { },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <>
      <div ref={drop} className={isOver ? 'insert-here' : ''}></div>
      {isModal? <CardModal card={card} closeModal={onToggleModal}></CardModal> : ''}
      {/* <div className={`card${isDragging ? ' is-dragging ' : ' '} ${isOver ? ' is-over' : ''}`} ref={drag}> */}
      <div className={`card${isDragging ? ' is-dragging ' : ''}`} ref={drag}>
        <div onClick={onToggleModal} className="container" id={card._id} ref={drop}>
          <span>{card._id}</span>
        </div>
      </div>
    </>
  )
}
