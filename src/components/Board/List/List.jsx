import { ClickAwayListener } from '@material-ui/core'
import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { UPDATE_LIST } from '../../../store/board/BoardActions'
import { Card } from '../Card/Card'

export const List = ({ list, addCard, handleDrop, removeList, togglePopover }) => {
  const { _id: listId, cards } = list
  const [editables, setEditables] = useState({ title: list.title })
  const { title } = editables
  const [isAddCard, setIsAddCard] = useState(false)
  const [posOffset, setPosOffset] = useState(null)
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
    members: []
  })

  const [{ isDragging }, drag] = useDrag({
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
    item: { type: 'LIST' },
    begin: () => {
      const { height, width } = rectRef.current.getBoundingClientRect()
      return {
        type: 'LIST',
        list,
        sourceListId: listId,
        width,
        height
      }
    }
  })

  const [{ cardOver, listOver, hoverWidth, hoverHeight }, drop] = useDrop({
    accept: ['CARD', 'LIST'],
    hover: (item, monitor) => {
      const { left, width } = rectRef.current.getBoundingClientRect()
      setPosOffset(left + width / 2 > monitor.getClientOffset().x ? 0 : 1)
    },
    collect: monitor => ({
      hoverWidth: monitor.getItem()?.width,
      hoverHeight: monitor.getItem()?.height,
      listOver:
        monitor.isOver() &&
        monitor.getItemType() === 'LIST' &&
        monitor.getItem().sourceListId !== listId,
      cardOver:
        monitor.isOver() &&
        monitor.getItemType() === 'CARD' &&
        (!cards.length || (cards.length === 1 && monitor.getItem().sourceCardId === cards[0]._id))
    }),
    drop: (item, monitor) => {
      if ((item.type === 'CARD' && !monitor.didDrop()) || item.type === 'LIST' || !cards.length) {
        // handleDrop is not passed as prop when this instance is the drag layer to prevent this instance from accepting itself.
        handleDrop && handleDrop({ ...item, targetListId: listId, posOffset })
      }
    }
  })

  const handleInput = ({ target: { name, value } }) => {
    setNewCard({ ...newCard, [name]: value })
  }

  const handleEdit = ({ target: { name, value } }) => {
    setEditables({ ...editables, [name]: value })
    dispatch(UPDATE_LIST({ name, value, listId }))
  }

  const handleKeyUp = ({ target, key }) => {
    if (key === 'Enter' || key === 'Escape') target.blur()
  }

  const toggleIsAddCard = ev => {
    ev.preventDefault()
    setIsAddCard(!isAddCard)
  }

  const onAddCard = ev => {
    ev.preventDefault()
    addCard(newCard, listId)
    setIsAddCard(false)
    setNewCard({
      title: '',
      activity: [],
      attachments: [],
      checklist: [],
      desc: '',
      dueDate: '',
      labels: [],
      members: []
    })
  }

  return (
    <div ref={drop} className={`list-drop-container${isDragging ? ' hidden' : ''}`}>
      <div ref={rectRef} className="rect-ref flex">
        {listOver && !posOffset && (
          <div
            className="placeholder left"
            style={{
              width: `${hoverWidth}px`,
              height: `${hoverHeight}px`
            }}
          />
        )}
        <div className={`list`}>
          <div className="container flex col">
            <div className="list-header flex jb">
              <input
                ref={drag}
                name="title"
                value={title}
                className="list-title fast f-110"
                onFocus={ev => ev.target.select()}
                onChange={handleEdit}
                onKeyUp={handleKeyUp}
              />
              <button className="delete-btn" onClick={() => removeList(listId)}>
                ···
              </button>
            </div>
            <div className="cards flex col">
              {cards.map(card => (
                <Card
                  key={card._id}
                  card={card}
                  list={list}
                  handleDrop={handleDrop}
                  togglePopover={togglePopover}
                />
              ))}
              {cardOver && (
                <div className="placeholder-card" style={{ height: `${hoverHeight}px` }} />
              )}
            </div>
            {isAddCard && (
              <ClickAwayListener onClickAway={() => setIsAddCard(false)}>
                <form action="" className="add-card-form" onSubmit={onAddCard}>
                  <input
                    autoFocus
                    autoComplete="off"
                    placeholder="Enter a title for this card..."
                    type="text"
                    name="title"
                    value={newCard.title}
                    onChange={handleInput}
                  />
                  <div className="add-card-btns flex jb">
                    <button className="add-card-btn">Add Card</button>
                    <button onClick={toggleIsAddCard} className="close-btn">
                      X
                    </button>
                  </div>
                </form>
              </ClickAwayListener>
            )}
            {!isAddCard && (
              <div className="add-card" onClick={toggleIsAddCard}>
                <span>+</span> Add another card
              </div>
            )}
          </div>
        </div>
        {listOver && !!posOffset && (
          <div
            className="placeholder right"
            style={{
              width: `${hoverWidth}px`,
              height: `${hoverHeight}px`
            }}
          />
        )}
      </div>
    </div>
  )
}
