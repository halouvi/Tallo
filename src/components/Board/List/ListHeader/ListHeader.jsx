import { Button } from '@material-ui/core'
import { usePopover } from 'components/Popover/Popover'
import { ListMenu } from 'components/Popover/PopoverCmps/Menus/ListMenu'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useKey } from 'react-use'
import { GET_BY_ID, UPDATE_LIST } from 'store/board/BoardActions'

export const ListHeader = ({ list }) => {
  const dispatch = useDispatch()
  const listId = list._id
  const [{ title, timer }, setState] = useState({ title: list.title, timer: null })
  const ref = useRef()

  const isBlurred = ev => ev.target !== document.activeElement
  const preventOnFirstClick = ev => isBlurred(ev) && ev.preventDefault()
  const selectOnFirstClick = ev => isBlurred(ev) && ev.target.select()

  const blurTitle = () => ref.current.blur()
  useKey('Escape', blurTitle)
  useKey('Enter', blurTitle)

  const handleInput = ({ target: { name, value } }) => {
    clearTimeout(timer)
    setState({
      [name]: value,
      timer: setTimeout(() => dispatch(UPDATE_LIST({ name, value, listId })), 500)
    })
  }

  const togglePopover = usePopover()
  const { list: listInStore, card: cardInStore } = useSelector(state => state.boardReducer)
  const toggleMenu = ev => {
    if (listInStore?._id !== listId || cardInStore) dispatch(GET_BY_ID(listId))
    togglePopover(ev, ListMenu)
  }

  return (
    <header className="flex ac jb gr2">
      <input
        autoComplete="off"
        name="title"
        value={title}
        ref={ref}
        className="title fg1 fast"
        onMouseDown={preventOnFirstClick}
        onMouseUp={selectOnFirstClick}
        onChange={handleInput}
      />
      <Button size="small" onClick={toggleMenu}>
        ···
      </Button>
    </header>
  )
}
