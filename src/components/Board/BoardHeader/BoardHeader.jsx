import CustomizedMenus from './BoardsSelect/BoardsSelect'
import { ColorPicker } from './ColorPicker/ColorPicker'
import SimplePopover from './Popover/Popover'

export const BoardHeader = ({ userBoards, boardTitle, users }) => {
  return (
    <div className="board-header-section">
      <CustomizedMenus userBoards={userBoards} />
      <h2>{boardTitle}</h2>
      <SimplePopover users={users} />
      <ColorPicker />
    </div>
  )
}
