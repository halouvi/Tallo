import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { CardMenu } from './PopoverCmps/Menus/CardMenu'
import { ListMenu } from './PopoverCmps/Menus/ListMenu'
import { usePopover } from './Popover'
import x from 'assets/img/x.svg'

export const PopoverHeader = ({ title, onBack }) => {
  const card = useSelector(state => state.boardReducer.card)
  const list = useSelector(state => state.boardReducer.list)
  const inModal = useLocation().pathname.includes('board/card')

  const { togglePopover } = usePopover()

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
