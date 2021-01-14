import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CustomizedMenus from './BoardsSelect/BoardsSelect'

export const BoardHeader = ({ userBoards, boardTitle, boardMembers }) => {
  
  const history = useHistory()


  return (
    <div className="board-header-section">
      <CustomizedMenus userBoards={userBoards}></CustomizedMenus>
      <h2>{boardTitle}</h2>
    </div>
  )
}
