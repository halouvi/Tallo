import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { CardMenu } from './PopoverCmps/Menus/CardMenu'
import { ListMenu } from './PopoverCmps/Menus/ListMenu'
import { usePopover } from './Popover'

export const PopoverHeader = ({ title, onBack }) => {
  const inModal = useLocation().pathname.includes('board/modal')
  const cardId = useSelector(state => state.boardReducer.card?._id)
  const list = useSelector(state => state.boardReducer.list)

  const togglePopover = usePopover()

  const backToMenu = ev => togglePopover(ev, cardId ? CardMenu : ListMenu, true)

  return onBack || (!inModal && list) ? (
    <div className="gcf fw flex rel jb ">
      <Button size="large" className="" onClick={onBack || backToMenu}>
        Back
      </Button>
      <span className="center">{title}</span>
      <Button size="large" className="" onClick={togglePopover}>
        X
      </Button>
    </div>
  ) : (
    <div className="gcf fw flex rel col ae ">
      <span className="center">{title}</span>
      <Button size="large" className="" onClick={togglePopover}>
        X
      </Button>
    </div>
  )
}
