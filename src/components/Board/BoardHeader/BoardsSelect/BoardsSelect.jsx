import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux';
import { GET_BOARD_BY_ID } from '../../../../store/board/BoardActions';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      // backgroundColor: theme.palette.primary.main,
      // '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      //   color: theme.palette.common.white,
      // },
    },
  },
}))(MenuItem);

export default function CustomizedMenus({ userBoards }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onSelectBoard = (boardId) => {
    dispatch(GET_BOARD_BY_ID(boardId))
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="boards-select-section">
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className="boards-select-btn"
      >
        Boards ▼
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {userBoards?.map(board => (
          <StyledMenuItem onClick={() => onSelectBoard(board._id)} className="boards-select-item" key={board._id}>
            <ListItemText primary={board.title} />
          </StyledMenuItem>
        ))}

      </StyledMenu>
    </div>
  );
}