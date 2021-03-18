import { Button, ClickAwayListener, Input, TextField } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useKey, useToggle, useUpdateEffect } from 'react-use'
import { ADD_CARD } from 'store/board/BoardActions'
import x from 'assets/x.svg'
import plus from 'assets/+.svg'

export const AddCard = ({ listId }) => {
  const dispatch = useDispatch()

  const [isAddCard, toggleAddCard] = useToggle(false)
  const [newCardTitle, setNewCardTitle] = useState('')

  useUpdateEffect(() => setNewCardTitle(''), [isAddCard])

  const addCard = ev => {
    ev.preventDefault()
    dispatch(ADD_CARD(newCardTitle, listId))
    toggleAddCard()
  }

  useKey('Escape', () => toggleAddCard(false))

  const dragType = useSelector(state => state.boardReducer.dragType)

  return isAddCard ? (
    <ClickAwayListener onClickAway={toggleAddCard} mouseEvent="onMouseDown">
      <form className="add-card fw" onSubmit={addCard}>
        <input
          className="shdw2 rem fw mb6 br4 white"
          autoFocus
          autoComplete="off"
          placeholder="Enter a title for this card..."
          value={newCardTitle}
          onChange={ev => setNewCardTitle(ev.target.value)}
        />
        <div className="flex jb">
          <Button className="green" type="submit">
            Add Card
          </Button>
          <Button onClick={toggleAddCard}>
            <img src={x} alt="" className="icon small" />
          </Button>
        </div>
      </form>
    </ClickAwayListener>
  ) : (
    <>
      <Button className={`flex js${dragType ? ' no-hover' : ''}`} onClick={toggleAddCard}>
        <img src={plus} alt="" className="icon small mr10" />
        Add another card
      </Button>
    </>
  )
}
