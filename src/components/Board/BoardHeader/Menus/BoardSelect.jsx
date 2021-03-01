import { MenuItem, MenuList } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { GET_BOARD_BY_ID } from '../../../../store/board/BoardActions'
import { usePopover } from '../../../Popover/Popover'

export const BoardSelect = () => {
  const boardId = useSelector(state => state.boardReducer.board._id)
  const boards = useSelector(state => state.userReducer.user.boards)
  const dispatch = useDispatch()
  const togglePopover = usePopover()

  const selectBoard = (ev, selectedBoard) => {
    if (selectedBoard !== boardId) {
      dispatch(GET_BOARD_BY_ID(boardId))
      togglePopover(ev)
    }
  }

  return (
    <MenuList className="popover-cmp small flex col list-br">
      {boards.map(({ _id, title }) => (
        <MenuItem key={_id} onClick={ev => selectBoard(ev, _id)}>
          {title}
        </MenuItem>
      ))}
    </MenuList>
  )
}
