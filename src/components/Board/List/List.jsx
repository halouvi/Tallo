import { ClickAwayListener } from '@material-ui/core'
import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { ADD_CARD, HANDLE_DROP } from '../../../store/board/BoardActions'
import { Card } from '../Card/Card'
import { useToggle, useUpdateEffect } from 'react-use'
import { ListHeader } from './ListHeader/ListHeader'

export const List = ({ list, togglePopover, isDragLayer }) => {
  const rectRef = useRef(null)
  const dispatch = useDispatch()
  const { _id: listId, cards } = list
  const [isAddCard, toggleAddCard] = useToggle(false)
  const [newCardTitle, setNewCardTitle] = useState('')

  const [isDragging, drag] = useDrag({
    collect: monitor => monitor.isDragging(),
    item: { type: 'LIST' },
    begin: () => {
      const { height, width } = rectRef.current.getBoundingClientRect()
      return {
        type: 'LIST',
        list,
        sourceId: listId,
        width,
        height
      }
    }
  })

  const [{ cardOver, listOver, hoverWidth, hoverHeight, posOffset }, drop] = useDrop({
    accept: ['CARD', 'LIST'],
    canDrop: ({ sourceId, type }, monitor) =>
      monitor.isOver() &&
      (type === 'LIST' ||
        (type === 'CARD' && (!cards[0] || (!cards[1] && cards[0]._id === sourceId)))),
    collect: monitor => {
      if (monitor.canDrop()) {
        const { left, width } = rectRef.current.getBoundingClientRect()
        const mouseX = monitor.getClientOffset().x
        return {
          posOffset: left + width / 2 > mouseX ? 0 : 1,
          hoverWidth: monitor.getItem().width,
          hoverHeight: monitor.getItem().height,
          listOver: monitor.getItemType() === 'LIST',
          cardOver: monitor.getItemType() === 'CARD'
        }
      } else return {}
    },
    drop: item => dispatch(HANDLE_DROP({ ...item, posOffset, targetId: listId }))
  })

  useUpdateEffect(() => setNewCardTitle(''), [isAddCard])

  const handleInput = ({ target: { value } }) => setNewCardTitle(value)

  const addCard = ev => {
    ev.preventDefault()
    dispatch(ADD_CARD(newCardTitle, listId))
    toggleAddCard()
  }

  return (
    <div
      ref={!isDragLayer ? drop : null}
      className={`list-drop-container${isDragging ? ' hidden' : ''}`}>
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
        <div ref={!isDragLayer ? drag : null} className={`list flex col`}>
          <ListHeader list={list} togglePopover={togglePopover} />
          <div className="cards flex col">
            {cards.map(card => (
              <Card key={card._id} card={card} togglePopover={togglePopover} />
            ))}
            {cardOver && (
              <div className="placeholder-card" style={{ height: `${hoverHeight}px` }} />
            )}
          </div>
          {isAddCard ? (
            <ClickAwayListener onClickAway={toggleAddCard}>
              <form className="add-card-form" onSubmit={addCard}>
                <input
                  autoFocus
                  autoComplete="off"
                  placeholder="Enter a title for this card..."
                  type="text"
                  name="newCardTitle"
                  value={newCardTitle}
                  onChange={handleInput}
                />
                <div className="add-card-btns flex jb">
                  <button className="btn green">Add Card</button>
                  <button className="btn trans" onClick={toggleAddCard}>
                    X
                  </button>
                </div>
              </form>
            </ClickAwayListener>
          ) : (
            <button className="btn trans" onClick={toggleAddCard}>
              <span>+</span>
              <span>Add another card</span>
            </button>
          )}
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
