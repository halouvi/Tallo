import { useHistory } from 'react-router-dom'
import CustomizedMenus from './BoardsSelect/BoardsSelect'
import { ColorPicker } from './ColorPicker/ColorPicker'
import SimplePopover from './Popover/Popover'

export const BoardHeader = ({ userBoards, boardTitle, boardMembers }) => {

  const history = useHistory()

  return (
    <div className="board-header-section">
      <CustomizedMenus userBoards={userBoards}></CustomizedMenus>
      <h2>{boardTitle}</h2>
      <SimplePopover boardMembers={boardMembers}></SimplePopover>
      <ColorPicker></ColorPicker>
    </div>
  )
}
