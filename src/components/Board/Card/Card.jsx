
import { useDrag, useDrop } from 'react-dnd';
import { withRouter } from 'react-router-dom';

const _Card = ({ history, card, thisListIdx, thisCardIdx, handleDrop }) => {


  const onOpenModal = () => {
    history.push(`/board/modal/${card._id}`);
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
      {/* <div className={`card${isDragging ? ' is-dragging ' : ' '} ${isOver ? ' is-over' : ''}`} ref={drag}> */}
      <div className={`card${isDragging ? ' is-dragging ' : ''}`} ref={drag}>
        <div onClick={onOpenModal} className="container" id={card._id} ref={drop}>
          {card?.attachments[0] ? <img src={card.attachments[0]} alt="" /> : ''}
          <p>{card._id}</p>
        </div>
      </div>
    </>
  )
}

export const Card = withRouter(_Card);