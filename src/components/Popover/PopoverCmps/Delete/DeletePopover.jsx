import { img } from 'assets/img'
import { ReactSVG } from 'react-svg'
import { Button } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { PopoverHeader } from 'components/Popover/PopoverHeader'
import { DELETE_CARD, DELETE_LIST } from 'store/board/BoardActions'

export const DeletePopover = ({ togglePopover }) => {
  const cardId = useSelector(state => state.boardReducer.card?._id)
  const listId = useSelector(state => state.boardReducer.list?._id)

  const history = useHistory()
  const dispatch = useDispatch()
  const inModal = useLocation().pathname.includes('board/card')

  const deleteItem = ev => {
    dispatch(cardId ? DELETE_CARD(cardId) : DELETE_LIST(listId))
    if (inModal) history.push('/board')
    togglePopover(ev)
  }

  return (
    <div className="popover-cmp gb6">
      <PopoverHeader title={`Delete ${cardId ? 'Card' : 'List'}?`} />
      <div className="flex jb sbl gr6">
        <Button
          autoFocus
          size="large"
          classes={{ root: 'red', label: 'flex ae' }}
          onClick={deleteItem}>
          <ReactSVG src={img.trash} className="svg icon white mr6" />
          Delete
        </Button>
        <Button size="large" className="gray" onClick={togglePopover}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
