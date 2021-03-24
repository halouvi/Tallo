import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import x from 'assets/img/x.svg'
import { usePopover } from 'components/Popover/Popover'
import { CardMenu } from 'components/Popover/PopoverCmps/Menus/CardMenu'
import { ListMenu } from 'components/Popover/PopoverCmps/Menus/ListMenu'

export const PopoverHeader = ({ title, onBack }) => {
  const card = useSelector(state => state.boardReducer.card)
  const list = useSelector(state => state.boardReducer.list)
  const inModal = useLocation().pathname.includes('board/card')

  const togglePopover = usePopover()

  const backToMenu = ev => togglePopover(ev, card ? CardMenu : ListMenu, true)

  return onBack || (!inModal && list) ? (
    <div className="gcf fw flex rel jb ">
      <Button className="" onClick={onBack || backToMenu}>
        Back
      </Button>
      <span className="center">{title}</span>
      <Button className="" onClick={togglePopover}>
        <img src={x} alt="" className="icon small" />{' '}
      </Button>
    </div>
  ) : (
    <div className="gcf fw flex rel col ae ">
      <span className="center">{title}</span>
      <Button className="" onClick={togglePopover}>
        <img src={x} alt="" className="icon small" />
      </Button>
    </div>
  )
}
