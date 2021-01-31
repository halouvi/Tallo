import { ClickAwayListener } from '@material-ui/core'
import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { UPDATE_LIST } from '../../../store/board/BoardActions'
import { Card } from '../Card/Card'
import { ListMenu } from './ListMenu/ListMenu'
import { ListPopover } from './ListMenu/ListPopover'
import { useToggle, useSetState, useUpdateEffect } from 'react-use'

export const List = ({ list, addCard, handleDrop, removeList, togglePopover }) => {
  const rectRef = useRef(null)
  const dispatch = useDispatch()
  const { _id: listId, cards } = list
  const [{ title }, setEditables] = useSetState({ title: list.title })
  const [isAddCard, toggleAddCard] = useToggle(false)
  const [posOffset, setPosOffset] = useState(null)
  const [timer, setTimer] = useState(null)
  const [newCard, setNewCard] = useSetState({
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

  const handleInput = ({ target: { name, value } }) => setNewCard({ [name]: value })

  const handleEdit = ({ target: { name, value } }) => {
    setEditables({ [name]: value })
    clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        dispatch(UPDATE_LIST({ name, value, listId }))
      }, 500)
    )
  }

  const blurTitle = ({ target, key }) => {
    if (key === 'Enter' || key === 'Escape') target.blur()
  }

  const onAddCard = ev => {
    ev.preventDefault()
    addCard(newCard, listId)
    toggleAddCard(false)
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

  const openMenu = ev => togglePopover(ev, { cmp: ListMenu, listId: listId, el: rectRef.current })

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
        <div ref={drag} className={`list flex col`}>
          <div className="list-header flex jb pointer">
            <input
              name="title"
              value={title}
              className="list-title fast f-110"
              onMouseDown={ev => ev.preventDefault()}
              onMouseUp={ev => ev.target.focus()}
              onFocus={ev => ev.target.select()}
              onChange={handleEdit}
              onKeyUp={blurTitle}
            />
            <ListPopover className="delete-btn" listId={listId} removeList={removeList} />
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
            <ClickAwayListener onClickAway={() => toggleAddCard(false)}>
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
                  <button onClick={toggleAddCard} className="close-btn">
                    X
                  </button>
                </div>
              </form>
            </ClickAwayListener>
          )}
          {!isAddCard && (
            <div className="add-card" onClick={toggleAddCard}>
              <span>+</span> Add another card
            </div>
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
