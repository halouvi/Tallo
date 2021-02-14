import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useKey } from 'react-use'
import { UPDATE_LIST } from '../../../../store/board/BoardActions'
import { ListMenu } from './ListMenu'

export const ListHeader = ({ list, togglePopover }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState(list.title)
  const [timer, setTimer] = useState(null)
  const titleRef = useRef(null)

  const selectTitle = () => titleRef.current.select()
  const blurTitle = () => titleRef.current.blur()
  useKey('Escape', blurTitle)
  useKey('Enter', blurTitle)

  const handleInput = ({ target: { name, value } }) => {
    setTitle(value)
    clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        dispatch(UPDATE_LIST({ name, value, listId: list._id }))
      }, 500)
    )
  }

  const toggleMenu = ev => togglePopover(ev, ListMenu, list._id)

  return (
    <div className="list-header flex jb pointer">
      <input
        name="title"
        value={title}
        ref={titleRef}
        className="list-title fast f-110"
        onMouseDown={ev => ev.preventDefault()}
        onMouseUp={selectTitle}
        onChange={handleInput}
      />
      <button
        className="delete-btn"
        // onMouseDown={ev => ev.stopPropagation()}
        onMouseUp={toggleMenu}>
        ···
      </button>
    </div>
  )
}
