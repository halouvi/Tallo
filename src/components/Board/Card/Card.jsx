
import { useDrag, useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CardAvatars } from '../avatars/CardAvatars';

const _Card = ({ history, card, thisListIdx, thisCardIdx, handleDrop }) => {
  const gLabels = useSelector(state => state.boardReducer.board.labels);

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
          <div className="card-title">{card.title}</div>
          {card?.attachments[0] ? <img src={card.attachments[0]} alt="" /> : ''}
          <p className="card-desc">{card.desc}</p>
          <div className="labels-section">
            {card?.labels[0] && gLabels.map(gLabel => (
              card.labels.some(label => label === gLabel._id) && <div className={`label ${gLabel.color}`} key={gLabel._id}></div>
            )
            )}
          </div>
          <div className="bottom-section">
            {card.dueDate && <div className="due-date">
              <img src="https://res.cloudinary.com/ariecloud/image/upload/v1610026807/tallo/clock-circular-outline_rdwoyz.svg" alt="" />
              <p>{new Date(card.dueDate).toDateString()}</p>
            </div>}
            {!card.dueDate && <div></div>}
            <CardAvatars card={card}></CardAvatars>
          </div>
        </div>
      </div>
    </>
  )
}

export const Card = withRouter(_Card);