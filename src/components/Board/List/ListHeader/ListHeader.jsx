import { Button } from '@material-ui/core'
import { usePopover } from 'components/Popover/Popover'
import { ListMenu } from 'components/Popover/PopoverCmps/Menus/ListMenu'
import { useInput } from 'hooks/useInput'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useKey } from 'react-use'
import { disableAltKeyBlur } from 'service/utilService'
import { GET_BY_ID, UPDATE_LIST } from 'store/board/BoardActions'

const TITLE = 'title'

export const ListHeader = ({ list, dragHandleProps, setIsTitleBlurred }) => {
  const dispatch = useDispatch()
  const listId = list._id
  const ref = useRef()

  const isBlurred = ref.current !== document.activeElement

  const preventOnFirstMouseDown = ev => isBlurred && ev.preventDefault()

  const selectOnFirstMouseUp = () => isBlurred && ref.current.select()

  const blurTitle = () => ref.current.blur()
  useKey('Escape', blurTitle)
  useKey('Enter', blurTitle)

  const updateList = value => dispatch(UPDATE_LIST({ name: TITLE, value, listId }))
  const [title, setTitle] = useInput(list.title, updateList, 500)

  const togglePopover = usePopover()
  const { list: listInStore, card: cardInStore } = useSelector(state => state.boardReducer)
  const toggleMenu = ev => {
    if (listInStore?._id !== listId || cardInStore) dispatch(GET_BY_ID(listId))
    togglePopover(ev, ListMenu)
  }

  return (
    <header className="flex ac jb gr2 mb6" {...dragHandleProps}>
      <input
        ref={ref}
        value={title}
        onChange={setTitle}
        autoComplete="off"
        className="title fg1 fast"
        onKeyUp={disableAltKeyBlur}
        onMouseUp={selectOnFirstMouseUp}
        onMouseDown={preventOnFirstMouseDown}
        onBlur={() => setIsTitleBlurred(true)}
        onSelect={() => setIsTitleBlurred(false)}
      />
      <Button size="small" onClick={toggleMenu}>
        ···
      </Button>
    </header>
  )
}
