import CustomizedMenus from './BoardsSelect/BoardsSelect'
import { ColorPicker } from './ColorPicker/ColorPicker'
import SimplePopover from './Popover/Popover'

export const BoardHeader = ({ boards, boardTitle, users }) => {
  return (
    <div className="board-header-section">
      <CustomizedMenus boards={boards} />
      <h2>{boardTitle}</h2>
      <SimplePopover users={users} />
      <ColorPicker />
    </div>
  )
}