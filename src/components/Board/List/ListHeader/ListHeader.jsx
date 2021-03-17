import { Button } from '@material-ui/core'
import { usePopover } from 'components/Popover/Popover'
import { ListMenu } from 'components/Popover/PopoverCmps/Menus/ListMenu'
import { useDisableAltKeyBlur } from 'hooks/useDisableAltKeyBlur'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useKey } from 'react-use'
import { GET_BY_ID, UPDATE_LIST } from 'store/board/BoardActions'

export const ListHeader = ({ list, dragHandleProps, setIsTitleBlurred }) => {
  const dispatch = useDispatch()
  const listId = list._id
  const [{ title, timer }, setState] = useState({ title: list.title, timer: null })
  const ref = useRef()

  const isBlurred = () => ref.current !== document.activeElement

  const blurTitle = () => ref.current.blur()

  const preventOnFirstMouseDown = ev => isBlurred() && ev.preventDefault()

  const selectOnFirstMouseUp = ev => isBlurred() && ref.current.select()

  useKey('Escape', blurTitle)
  useKey('Enter', blurTitle)

  const handleInput = ({ target: { name, value } }) => {
    clearTimeout(timer)
    setState({
      [name]: value,
      timer: setTimeout(() => dispatch(UPDATE_LIST({ name, value, listId })), 500)
    })
  }

  const { togglePopover } = usePopover()
  const { list: listInStore, card: cardInStore } = useSelector(state => state.boardReducer)
  const toggleMenu = ev => {
    if (listInStore?._id !== listId || cardInStore) dispatch(GET_BY_ID(listId))
    togglePopover(ev, ListMenu)
  }

  const disableAltKeyBlur = useDisableAltKeyBlur()

  return (
    <header className="flex ac jb gr2 mb6" {...dragHandleProps}>
      <input
        onMouseDown={preventOnFirstMouseDown}
        onMouseUp={selectOnFirstMouseUp}
        onBlur={() => setIsTitleBlurred(true)}
        onSelect={() => setIsTitleBlurred(false)}
        onKeyUp={disableAltKeyBlur}
        autoComplete="off"
        name="title"
        value={title}
        ref={ref}
        className="title fg1 fast"
        onChange={handleInput}
      />
      <Button size="small" onClick={toggleMenu}>
        ···
      </Button>
    </header>
  )
}
