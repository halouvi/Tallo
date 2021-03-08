import { Button } from '@material-ui/core'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useKey } from 'react-use'
import { GET_BY_ID, UPDATE_LIST } from '../../../../store/board/BoardActions'
import { usePopover } from '../../../Popover/Popover'
import { ListMenu } from '../../../Popover/PopoverCmps/Menus/ListMenu'

export const ListHeader = ({ list }) => {
  const dispatch = useDispatch()
  const [{ title, timer }, setState] = useState({ title: list.title, timer: null })
  const titleRef = useRef(null)

  const preventOnFirstClick = ev => ev.target !== document.activeElement && ev.preventDefault()
  const selectOnFirstClick = ev => ev.target !== document.activeElement && ev.target.select()

  const blurTitle = () => titleRef.current.blur()
  useKey(['Escape', 'Enter'], blurTitle)

  const handleInput = ({ target: { name, value } }) => {
    clearTimeout(timer)
    setState({
      title: value,
      timer: setTimeout(() => {
        dispatch(UPDATE_LIST({ name, value, listId: list._id }))
      }, 500)
    })
  }

  const togglePopover = usePopover()

  const listInStore = useSelector(state => state.boardReducer.list)
  const toggleMenu = ev => {
    ev.avoidModal = true
    if (list !== listInStore) dispatch(GET_BY_ID(list._id))
    togglePopover(ev, ListMenu)
  }

  return (
    <header className="flex ac jb pointer">
      <input
        autoComplete="off"
        name="title"
        value={title}
        ref={titleRef}
        className="title fast f-110"
        onMouseDown={preventOnFirstClick}
        onMouseUp={selectOnFirstClick}
        onChange={handleInput}
      />
      <Button
        size="small"
        className=""
        onMouseDown={ev => ev.stopPropagation()}
        onClick={ev => ev.stopPropagation()}
        onMouseUp={toggleMenu}>
        ···
      </Button>
    </header>
  )
}
