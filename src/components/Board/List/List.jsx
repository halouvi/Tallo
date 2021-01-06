import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Card } from '../Card/Card'

export const List = ({ list, thisListIdx, handleDrop, addCard }) => {
  const [isAddCard, setisAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    title: '',
    activity: [],
    attachments: [],
    checklist: [],
    desc: '',
    dueDate: 0,
    labels: [],
    members: []
  });
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

  const onHandleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    setNewCard({ ...newCard, [field]: value })
    // console.log(newCard);
  }

  const onAddCard = (ev) => {
    ev.preventDefault()
    addCard(newCard, list._id);
    setisAddCard(false)
    setNewCard({
      title: '',
      activity: [],
      attachments: [],
      checklist: [],
      desc: '',
      dueDate: 0,
      labels: [],
      members: []
    })
  }

  return (
    <>
      {/* <div ref={drop} className={isOver ? 'insert-list' : ''}></div> */}
      <div ref={drag} className={`list flex col`}>
        <div
          ref={drop}
          className={`container flex col${isOver ? ' is-over' : isDragging ? ' is-dragging' : ''
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
          {isAddCard && <form action="" className="add-card-form" onSubmit={onAddCard}>
            <input placeholder="Enter a title for this card..." type="text" name="title" value={newCard.title} onChange={onHandleChange} id="" />
            <div className="add-card-btns">
              <button className="add-card-btn">Add Card</button>
              <button onClick={(ev) => { ev.preventDefault(); setisAddCard(false) }} className="close-btn">X</button>
            </div>
          </form>}
          {!isAddCard && <div className="add-card" onClick={() => setisAddCard(true)}><span>+</span> Add another card</div>}
        </div>
      </div>
    </>
  )
}
