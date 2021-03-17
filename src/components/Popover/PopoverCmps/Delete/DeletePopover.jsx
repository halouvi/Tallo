import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { DELETE_CARD, DELETE_LIST } from '../../../../store/board/BoardActions'
import { PopoverHeader } from '../../PopoverHeader'

export const DeletePopover = ({ togglePopover }) => {
  const cardId = useSelector(state => state.boardReducer.card?._id)
  const listId = useSelector(state => state.boardReducer.list?._id)
  const dispatch = useDispatch()
  const history = useHistory()
  const inModal = useLocation().pathname.includes('board/card')

  const deleteItem = ev => {
    dispatch(cardId ? DELETE_CARD(cardId) : DELETE_LIST(listId))
    inModal && history.push('/board')
    togglePopover(ev)
  }

  return (
    <div className="popover-cmp gb6">
      <PopoverHeader title={`Delete ${cardId ? 'Card' : 'List'}?`} />
      <div className="flex jb sbl gr6">
        <Button size="large" className="red" onClick={deleteItem}>
          Delete
        </Button>
        <Button size="large" className="gray" onClick={togglePopover}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
