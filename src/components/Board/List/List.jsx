import { useEffect, useLayoutEffect } from 'react'
import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { UPDATE_LIST } from '../../../store/board/BoardActions'
import { Card } from '../Card/Card'

export const List = ({ list, addCard, handleDrop }) => {
  const { _id, title, cards } = list
  const [isAddCard, setisAddCard] = useState(false)
  const [placeholderPos, setPlaceholderPos] = useState(null)
  const rectRef = useRef(null)
  const dispatch = useDispatch()

  const [newCard, setNewCard] = useState({
    title: '',
    activity: [],
    attachments: [],
    checklist: [],
    desc: '',
    dueDate: '',
    labels: [],
    members: [],
  })

  const [{ isDragging }, drag] = useDrag({
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { type: 'List' },
    begin: () => ({
      type: 'List',
      sourceListId: _id,
      dimensions: rectRef.current.getBoundingClientRect(),
      list,
    }),
  })

  const [{ isOver, hoveringListDimensions }, drop] = useDrop({
    accept: ['Card', 'List'],
    hover: (item, monitor) => handleDragOver(monitor.getClientOffset().x),
    collect: monitor => ({
      hoveringListDimensions: monitor.getItem()?.dimensions,
      isOver:
        !!monitor.isOver() &&
        monitor.getItemType() === 'List' &&
        monitor.getItem().sourceListId !== _id,
    }),
    drop: (item, monitor) => {
      if (!handleDrop) return
      if ((item.type === 'Card' && !monitor.didDrop()) || item.type === 'List' || !cards.length) {
        handleDrop({ item, targetListId: _id, placeholderPos })
      }
    },
  })

  const handleDragOver = offsetX => {
    const { left, width } = rectRef.current.getBoundingClientRect()
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
      <div ref={rectRef} className="rect-ref flex">
        {isOver && !placeholderPos && (
          <div
            className="placeholder"
            style={{
              width: `${hoveringListDimensions.width}px`,
              height: `${hoveringListDimensions.height}px`,
              paddingRight: '8px',
            }}>
            <div className="container" />
          </div>
        )}
        <div ref={drag} className={`list`}>
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
        {isOver && !!placeholderPos && (
          <div
            className="placeholder"
            style={{
              width: `${hoveringListDimensions.width}px`,
              height: `${hoveringListDimensions.height}px`,
              paddingLeft: '8px',
            }}>
            <div className="container" />
          </div>
        )}
      </div>
    </div>
  )
}
