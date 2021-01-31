import CustomizedMenus from './BoardsSelect/BoardsSelect'
import SimplePopover from './Popover/Popover'

export const BoardHeader = ({ boards, title, users }) => {

  return (
    <div className="board-header-section">
      <CustomizedMenus boards={boards}></CustomizedMenus>
      <SimplePopover users={users}></SimplePopover>
      <h2>{title}</h2>
    </div>
  )
}
