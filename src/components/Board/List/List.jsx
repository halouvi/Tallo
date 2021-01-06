import { useState, useEffect, useRef } from 'react'
import ContentEditable from 'react-contenteditable'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { UPDATE_LIST } from '../../../store/board/BoardActions'
import { Card } from '../Card/Card'

export const List = ({ list, thisListIdx, handleDrop, addCard }) => {
  const dispatch = useDispatch()
  const [isAddCard, setisAddCard] = useState(false)

  const [newCard, setNewCard] = useState({
    title: '',
    activity: [],
    attachments: [],
    checklist: [],
    desc: '',
    dueDate: 0,
    labels: [],
    members: [],
  })

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

  const handleInput = ev => {
    const field = ev.target.name
    const value = ev.target.value
    setNewCard({ ...newCard, [field]: value })
  }

  var timer
  const editables = {
    title: list.title,
  }
  const handleEditable = ev => {
    const field = ev.currentTarget.id
    const value = ev.currentTarget.innerText
    editables[field] = value
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(UPDATE_LIST({ field, value, listId: list._id }))
    }, 500)
  }

  const onAddCard = ev => {
    ev.preventDefault()
    addCard(newCard, list._id)
    setisAddCard(false)
    setNewCard({
      title: '',
      activity: [],
      attachments: [],
      checklist: [],
      desc: '',
      dueDate: 0,
      labels: [],
      members: [],
    })
  }

  return (
    <>
      {/* <div ref={drop} className={isOver ? 'insert-list' : ''}></div> */}
      <div ref={drag} className={`list flex col`}>
        <div
          ref={drop}
          className={`container flex col${isOver ? ' is-over' : isDragging ? ' is-dragging' : ''}`}>
          <ContentEditable
            id="title"
            className="list-title"
            tagName="span"
            html={editables.title}
            onChange={handleEditable}
          />
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
          {isAddCard && (
            <form action="" className="add-card-form" onSubmit={onAddCard}>
              <input
                placeholder="Enter a title for this card..."
                type="text"
                name="title"
                value={newCard.title}
                onChange={handleInput}
                id=""
              />
              <div>
                <button>Add Card</button>
                <button
                  onClick={ev => {
                    ev.preventDefault()
                    setisAddCard(false)
                  }}>
                  X
                </button>
              </div>
            </form>
          )}
          <div className="add-card" onClick={() => setisAddCard(true)}>
            <span>+</span> Add another card
          </div>
        </div>
      </div>
    </>
  )
}
