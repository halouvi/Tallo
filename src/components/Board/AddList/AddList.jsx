import { Button, ClickAwayListener } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useKey, useToggle, useUpdateEffect } from 'react-use'
import { ADD_LIST } from 'store/board/BoardActions'
import { ReactSVG } from 'react-svg'
import plus from 'assets/+.svg'

export const AddList = () => {
  const dispatch = useDispatch()

  const [isAddList, toggleAddList] = useToggle(false)
  const [newListTitle, setNewListTitle] = useState('')

  useUpdateEffect(() => setNewListTitle(''), [isAddList])

  const addList = ev => {
    ev.preventDefault()
    dispatch(ADD_LIST(newListTitle))
    toggleAddList()
  }

  useKey('Escape', () => toggleAddList(false))

  return (
    <div className="add-list">
      {isAddList ? (
        <ClickAwayListener onClickAway={toggleAddList} mouseEvent="onMouseDown">
          <form className="fw gray gb6 br4" onSubmit={addList}>
            <input
              className="rem fw white"
              autoFocus
              autoComplete="off"
              placeholder="Enter a title for this list..."
              value={newListTitle}
              onChange={ev => setNewListTitle(ev.target.value)}
            />
            <div className="flex jb">
              <Button className="green" type="submit">
                Add List
              </Button>
              <Button onClick={toggleAddList}>X</Button>
            </div>
          </form>
        </ClickAwayListener>
      ) : (
        <Button className="fp flex ac js trans br4" onClick={toggleAddList}>
          <ReactSVG src={plus} className="svg small white mr10" />
          Add another list
        </Button>
      )}
    </div>
  )
}
