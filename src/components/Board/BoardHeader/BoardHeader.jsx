import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { BoardSelect } from './Menus/BoardSelect'
import { BoardColor } from './Menus/BoardColor'
import { BoardMembersPopover } from '../../Popover/PopoverCmps/Members/BoardMembersPopover'
import { usePopover } from '../../Popover/Popover'

export const BoardHeader = () => {
  const title = useSelector(state => state.boardReducer.board.title)
  const togglePopover = usePopover()

  return (
    <div className="board-header flex ac p6 gr10">
      <Button className="trans" size="large" onClick={ev => togglePopover(ev, BoardSelect)}>
        Boards ▼
      </Button>
      <h2>{title}</h2>
      <Button className="trans" size="large" onClick={ev => togglePopover(ev, BoardMembersPopover)}>
        Users ▼
      </Button>
      <Button size="large" className="trans" onClick={ev => togglePopover(ev, BoardColor)}>
        <svg width="20" height="20" viewBox="0 0 384 384">
          <path
            d="M192 0C85.973 0 0 85.973 0 192s85.973 192 192 192a31.96 31.96 0 0 0 32-32c0-8.32-3.093-15.787-8.32-21.44-5.013-5.653-8-13.013-8-21.227a31.96 31.96 0 0 1 32-32h37.653c58.88 0 106.667-47.787 106.667-106.667C384 76.373 298.027 0 192 0zM74.667 192a31.96 31.96 0 1 1 0-64 31.96 31.96 0 1 1 0 64zm64-85.333a31.96 31.96 0 0 1-32-32 31.96 31.96 0 1 1 64 0 31.96 31.96 0 0 1-32 32zm106.666 0a31.96 31.96 0 0 1-32-32 31.96 31.96 0 1 1 64 0 31.96 31.96 0 0 1-32 32zm64 85.333a31.96 31.96 0 1 1 0-64 31.96 31.96 0 1 1 0 64z"
            fill="#fff"
          />
        </svg>
      </Button>
    </div>
  )
}
