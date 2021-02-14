import { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useDispatch } from 'react-redux'
import { GET_BOARD_BY_ID } from '../../../../store/board/BoardActions'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))

export default function CustomizedMenus({ boards }) {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)

  const selectBoard = ({ target: { value } }) => {
    dispatch(GET_BOARD_BY_ID(value))
    closeMenu()
  }

  const handleClick = ({ currentTarget }) => setAnchorEl(currentTarget)

  const closeMenu = () => setAnchorEl(null)
  return (
    <div className="boards-select-section">
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className="boards-select-btn">
        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm9-1a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1h-4z"
            fill="currentColor"></path>
        </svg>
        <div>Boards ▼</div>
      </Button>
      <StyledMenu
        id="customized-menu"
        keepMounted
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={closeMenu}>
        {boards.map(({ _id, title }) => (
          <MenuItem
            key={_id}
            value={_id}
            component={'button'}
            onClick={selectBoard}
            className="boards-select-item">
            {title}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  )
}
