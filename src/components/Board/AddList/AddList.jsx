import { Button, ClickAwayListener } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useKey, useToggle, useUpdateEffect } from 'react-use'
import { ADD_LIST } from 'store/board/BoardActions'
import { ReactSVG } from 'react-svg'
import { img } from 'assets/img'

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
          <form className="fw gray gb6 p6 br4" onSubmit={addList}>
            <input
              required
              autoFocus
              autoComplete="off"
              value={newListTitle}
              className="fw white br6"
              placeholder="Enter a title for this list..."
              onChange={ev => setNewListTitle(ev.target.value)}
            />
            <div className="flex jb">
              <Button className="green" type="submit" disableTouchRipple={!newListTitle}>
                Add List
              </Button>
              <Button onClick={toggleAddList}>
                <ReactSVG src={img.x} className="svg icon small" />
              </Button>
            </div>
          </form>
        </ClickAwayListener>
      ) : (
        <Button className="fp flex ac js trans br4" onClick={toggleAddList}>
          <ReactSVG src={img.plus} className="svg icon small white mr10" />
          Add another list
        </Button>
      )}
    </div>
  )
}
