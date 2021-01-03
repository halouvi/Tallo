import { useDrag, useDrop } from 'react-dnd'

export const Card = ({ card, thisListIdx, thisCardIdx, handleDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: item => handleDrop(item, thisListIdx, thisCardIdx),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'CARD',
      card,
      sourceListIdx: thisListIdx,
      sourceCardIdx: thisCardIdx,
    },
    begin: monitor => {},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <div className={`card${isDragging ? ' is-dragging' : isOver ? ' is-over' : ''}`} ref={drag}>
      <div className="container" id={card._id} ref={drop}>
        <span>{card._id}</span>
      </div>
    </div>
  )
}
