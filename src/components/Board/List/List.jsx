import { useLayoutEffect } from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { UPDATE_LIST } from '../../../store/board/BoardActions'
import { Card } from '../Card/Card'

export const List = ({ list, handleDrop, addCard }) => {
  const { _id, title, cards } = list
  const [isAddCard, setisAddCard] = useState(false)
  const [placeholderPos, setPlaceholderPos] = useState(0)
  const widthRef = useRef(null)
  const dispatch = useDispatch()
  const [thisListWidth, setThisListWidth] = useState(null)
  useLayoutEffect(() => setThisListWidth(window.getComputedStyle(widthRef.current).width), [])

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
      type: 'List',
      sourceListId: _id,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [{ isOver }, drop] = useDrop({
    accept: ['Card', 'List'],
    drop: (item, monitor) => {
      !monitor.didDrop() && handleDrop({ item, targetListId: _id, placeholderPos })
    },
    hover: (item, monitor) => handleDragOver(monitor.getClientOffset().x),
    collect: monitor => ({
      isOver: !!monitor.isOver() && monitor.getItemType() === 'List',
    }),
  })

  const handleDragOver = offsetX => {
    const { left, width } = widthRef.current.getBoundingClientRect()
    setPlaceholderPos(left + width / 2 > offsetX ? 0 : 1)
  }

  const handleInput = ({ target: { name, value } }, item) => {
    if (item === 'Card') setNewCard({ ...newCard, [name]: value })
    if (item === 'List') dispatch(UPDATE_LIST({ name, value, listId: _id }))
  }

  const handleKeyUp = ({ target, key }) => {
    if (key === 'Enter' || key === 'Escape') target.blur()
  }

  const onAddCard = ev => {
    ev.preventDefault()
    addCard(newCard, _id)
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
    <div ref={drop} className={`list-drop-container${isDragging ? ' hidden' : ''}`}>
      <div ref={widthRef} className="flex width-ref">
        <div style={{ width: isOver && !placeholderPos ? thisListWidth : '0px' }} className="" />
        <div ref={drag} className={`list flex col`}>
          <div className="container flex col">
            <input
              name="title"
              className="list-title fast"
              value={title}
              onFocus={ev => ev.target.select()}
              onChange={ev => handleInput(ev, 'List')}
              onKeyUp={handleKeyUp}
            />
            <div className="cards flex col">
              {/* {isOver? <div>insert here</div> : '' } */}
              {cards.map(card => (
                <Card key={card._id} card={card} listId={_id} handleDrop={handleDrop} />
              ))}
            </div>
            {isAddCard && (
              <form action="" className="add-card-form" onSubmit={onAddCard}>
                <input
                  placeholder="Enter a title for this card..."
                  type="text"
                  name="title"
                  value={newCard.title}
                  onChange={ev => handleInput(ev, 'Card')}
                  id=""
                />
                <div className="add-card-btns">
                  <button className="add-card-btn">Add Card</button>
                  <button
                    onClick={ev => {
                      ev.preventDefault()
                      setisAddCard(false)
                    }}
                    className="close-btn">
                    X
                  </button>
                </div>
              </form>
            )}
            {!isAddCard && (
              <div className="add-card" onClick={() => setisAddCard(true)}>
                <span>+</span> Add another card
              </div>
            )}
          </div>
        </div>
        <div style={{ width: isOver && placeholderPos ? thisListWidth : '0px' }} className="" />
      </div>
    </div>
  )
}
