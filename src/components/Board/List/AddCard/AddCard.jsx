import { Button, ClickAwayListener, Input, TextField } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useKey, useToggle, useUpdateEffect } from 'react-use'
import { ADD_CARD } from '../../../../store/board/BoardActions'

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

  return isAddCard ? (
    <ClickAwayListener onClickAway={toggleAddCard}>
      <form className="fw gb6" onSubmit={addCard}>
        <input
          className="shdw2 rem p10 fw br4 white"
          autoFocus
          autoComplete="off"
          placeholder="Enter a title for this card..."
          value={newCardTitle}
          onChange={ev => setNewCardTitle(ev.target.value)}
        />
        <div className="flex jb">
          <Button className="green">Add Card</Button>
          <Button onClick={toggleAddCard}>X</Button>
        </div>
      </form>
    </ClickAwayListener>
  ) : (
    <Button className="flex ac js" onClick={toggleAddCard}>+ Add another card</Button>
  )
}
