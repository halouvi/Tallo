import { useDrag, useDrop } from 'react-dnd'
import { Card } from '../Card/Card'

export const List = ({ list, thisListIdx, handleDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'LIST',
      sourceListIdx: thisListIdx,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  const [{ isOver }, drop] = useDrop({
    accept: ['CARD', 'LIST'],
    drop: (item, monitor) => {
      !monitor.didDrop() && handleDrop(item, thisListIdx)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  

  return (
    <>
    {/* <div ref={drop} className={isOver ? 'insert-list' : ''}></div> */}
    <div ref={drag} className={`list flex col`}>
      <div
        ref={drop}
        className={`container flex col${
          isOver ? ' is-over' : isDragging ? ' is-dragging' : ''
        }`}>
        <span className="list-title">{list.title}</span>
        <div className="cards flex col">
        {/* {isOver? <div>insert here</div> : '' } */}
          {list.cards.map((card, idx) => (
            <Card
              key={card._id}
              card={card}
              thisListIdx={thisListIdx}
              thisCardIdx={idx}
              handleDrop={handleDrop}
            />
          ))}
       
        </div>
        {/* <div onClick={addCard}>+ Add another card</div> */}
      </div>
    </div>
    </>
  )
}
