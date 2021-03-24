import { Button, ClickAwayListener } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useKey, useToggle, useUpdateEffect } from 'react-use'
import { ADD_CARD } from 'store/board/BoardActions'
import { img } from 'assets/img'
import { ReactSVG } from 'react-svg'
import { useInput } from 'hooks/useInput'

export const AddCard = ({ listId }) => {
  const dispatch = useDispatch()

  const [isAddCard, toggleAddCard] = useToggle(false)
  const [newCardTitle, setNewCardTitle] = useInput('')

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
          required
          autoComplete="off"
          placeholder="Enter a title for this card..."
          value={newCardTitle}
          onChange={setNewCardTitle}
        />
        <div className="flex jb">
          <Button disableTouchRipple={!newCardTitle} className="green" type="submit">
            Add Card
          </Button>
          <Button onClick={toggleAddCard}>
            <ReactSVG src={img.x} className="svg icon small" />
          </Button>
        </div>
      </form>
    </ClickAwayListener>
  ) : (
    <>
      <Button className={`flex js${dragType ? ' no-hover' : ''}`} onClick={toggleAddCard}>
        <ReactSVG src={img.plus} className="svg icon small mr10" />
        Add another card
      </Button>
    </>
  )
}
