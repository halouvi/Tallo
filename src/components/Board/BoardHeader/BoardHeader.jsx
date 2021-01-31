import CustomizedMenus from './BoardsSelect/BoardsSelect'
import { ColorPicker } from './ColorPicker/ColorPicker'
import SimplePopover from './Popover/Popover'

export const BoardHeader = ({ boards, title, users }) => {
  return (
    <div className="board-header-section">
      <CustomizedMenus boards={boards} />
      <h2>{title}</h2>
      <SimplePopover users={users} />
      <ColorPicker />
    </div>
  )
}