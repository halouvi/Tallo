import { Button } from '@material-ui/core'
import { usePopover } from 'components/Popover/Popover'
import { BoardColor } from 'components/Popover/PopoverCmps/BoardColor'
import { BoardUsersPopover } from 'components/Popover/PopoverCmps/Users/BoardUsersPopover'
import { BoardSelect } from 'components/Popover/PopoverCmps/Menus/BoardSelect'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_ITEMS } from 'store/board/BoardActions'
import { ReactSVG } from 'react-svg'
import { img } from 'assets/img'

export const BoardHeader = () => {
  const dispatch = useDispatch()

  const title = useSelector(state => state.boardReducer.board.title)
  const list = useSelector(state => state.boardReducer.list)

  const togglePopover = usePopover()
  const toggleMenu = (ev, cmp) => {
    if (list) dispatch(CLEAR_ITEMS())
    togglePopover(ev, cmp)
  }

  return (
    <header className="board-header flex ac jb p6 rel">
      <div className="flex ac gr10 ">
        <Button className="trans" size="large" onClick={ev => toggleMenu(ev, BoardSelect)}>
          Boards ▼
        </Button>
        <h2>{title}</h2>
        <Button className="trans" size="large" onClick={ev => toggleMenu(ev, BoardUsersPopover)}>
          Members ▼
        </Button>
        <Button size="large" className="trans" onClick={ev => toggleMenu(ev, BoardColor)}>
          <ReactSVG src={img.pallete} className="svg icon white large" />
        </Button>
      </div>
    </header>
  )
}
