import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { UPDATE_LIST } from '../../../store/board/BoardActions'
import { Card } from '../Card/Card'

export const List = ({ list, addCard, handleDrop}) => {
  const { _id, title, cards } = list
  const [isAddCard, setIsAddCard] = useState(false)
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
    item: { type: 'LIST' },
    begin: () => {
      const { height, width } = rectRef.current.getBoundingClientRect()
      return {
        type: 'LIST',
        list,
        sourceListId: _id,
        width,
        height,
      }
    },
  })

  const [{ cardOver, listOver, hoverWidth, hoverHeight }, drop] = useDrop({
    accept: ['CARD', 'LIST'],
    hover: (item, monitor) => handleDragOver(monitor.getClientOffset().x),
    collect: monitor => ({
      hoverWidth: monitor.getItem()?.width,
      hoverHeight: monitor.getItem()?.height,
      cardOver:
        !!monitor.isOver() &&
        monitor.getItemType() === 'CARD' &&
        (!cards.length || (cards.length === 1 && monitor.getItem().sourceCardId === cards[0]._id)),
      listOver:
        !!monitor.isOver() &&
        monitor.getItemType() === 'LIST' &&
        monitor.getItem().sourceListId !== _id,
    }),
    drop: (item, monitor) => {
      if (!handleDrop) return
      if (
        (item.type === 'CARD' && !monitor.didDrop()) ||
        item.type === 'LIST' ||
        !cards.length
      ) {
        handleDrop({ item, targetListId: _id, placeholderPos })
      }
    },
  })

  const handleDragOver = offsetX => {
    const { left, width } = rectRef.current.getBoundingClientRect()
    setPlaceholderPos(left + width / 2 > offsetX ? 0 : 1)
  }

  const handleInput = ({ target: { name, value } }, item) => {
    setNewCard({ ...newCard, [name]: value })
  }

  const handleEdit = ({ target: { name, value } }) => {
    dispatch(UPDATE_LIST({ name, value, listId: _id }))
  }

  const handleKeyUp = ({ target, key }) => {
    if (key === 'Enter' || key === 'Escape') target.blur()
  }

  const onAddCard = ev => {
    ev.preventDefault()
    addCard(newCard, _id)
    setIsAddCard(false)
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
        {listOver && !placeholderPos && (
          <div
            className="placeholder left"
            style={{
              width: `${hoverWidth}px`,
              height: `${hoverHeight}px`,
            }}
          />
        )}
        <div ref={drag} className={`list`}>
          <div className="container flex col">
            <input
              name="title"
              className="list-title fast"
              value={title}
              onFocus={ev => ev.target.select()}
              onChange={handleEdit}
              onKeyUp={handleKeyUp}
            />

            <div className="cards flex col">
              {cards.map(card => (
                <Card key={card._id} card={card} handleDrop={handleDrop}  />
              ))}
              {cardOver && (
                <div className="placeholder-card" style={{ height: `${hoverHeight}px` }} />
              )}
            </div>
            {isAddCard && (
              <form action="" className="add-card-form" onSubmit={onAddCard}>
                <input
                  placeholder="Enter a title for this card..."
                  type="text"
                  name="title"
                  value={newCard.title}
                  onChange={handleInput}
                />
                <div className="add-card-btns">
                  <button className="add-card-btn">Add Card</button>
                  <button
                    onClick={ev => {
                      ev.preventDefault()
                      setIsAddCard(false)
                    }}
                    className="close-btn">
                    X
                  </button>
                </div>
              </form>
            )}
            {!isAddCard && (
              <div className="add-card" onClick={() => setIsAddCard(true)}>
                <span>+</span> Add another card
              </div>
            )}
          </div>
        </div>
        {listOver && !!placeholderPos && (
          <div
            className="placeholder right"
            style={{
              width: `${hoverWidth}px`,
              height: `${hoverHeight}px`,
            }}
          />
        )}
      </div>
    </div>
  )
}
