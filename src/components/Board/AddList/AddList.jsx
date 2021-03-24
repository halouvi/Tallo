import { Button, ClickAwayListener } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useKey, useToggle, useUpdateEffect } from 'react-use'
import { ADD_LIST } from 'store/board/BoardActions'
import { ReactSVG } from 'react-svg'
import { img } from 'assets/img'
import { useInput } from 'hooks/useInput'

export const AddList = () => {
  const dispatch = useDispatch()

  const [isAddList, toggleAddList] = useToggle(false)
  const [title, setTitle] = useInput('')

  useUpdateEffect(() => setTitle(''), [isAddList])

  const addList = ev => {
    ev.preventDefault()
    dispatch(ADD_LIST(title))
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
              value={title}
              onChange={setTitle}
              autoComplete="off"
              className="fw white br6"
              placeholder="Enter a title for this list..."
            />
            <div className="flex jb">
              <Button className="green" type="submit" disabled={!title.value}>
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
