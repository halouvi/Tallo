import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BoardMembers } from '../BoardMembers/BoardMembers';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const ColorPicker = ({ boardMembers }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const colors = ['red', 'orange', 'gold', 'green', 'gradient', 'purple', 'pink', 'gray']

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onColorPick = (color) => {
    var root = document.getElementById('root')
    color = color === 'gradient'? 'linear-gradient(#006f83, #00aecc)': color
    root.style.background = color
    handleClose()
  }

  return (
    <div className="color-picker-section">
      <Button className="color-picker-btn" aria-describedby={id} variant="contained" onClick={handleClick}>
        {/* <img src={process.env.PUBLIC_URL + `/User.png`} alt="" /> */}
        <svg width="512" height="512" viewBox="0 0 384 384"><path d="M192 0C85.973 0 0 85.973 0 192s85.973 192 192 192a31.96 31.96 0 0 0 32-32c0-8.32-3.093-15.787-8.32-21.44-5.013-5.653-8-13.013-8-21.227a31.96 31.96 0 0 1 32-32h37.653c58.88 0 106.667-47.787 106.667-106.667C384 76.373 298.027 0 192 0zM74.667 192a31.96 31.96 0 1 1 0-64 31.96 31.96 0 1 1 0 64zm64-85.333a31.96 31.96 0 0 1-32-32 31.96 31.96 0 1 1 64 0 31.96 31.96 0 0 1-32 32zm106.666 0a31.96 31.96 0 0 1-32-32 31.96 31.96 0 1 1 64 0 31.96 31.96 0 0 1-32 32zm64 85.333a31.96 31.96 0 1 1 0-64 31.96 31.96 0 1 1 0 64z" fill="#fff" /></svg>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="colors-section">
          <h3>Change Background</h3>
          <div className="colors-container">
            {colors.map(color => {
              return <div key={color} className={`color-item ${color}`} onClick={() => onColorPick(color)}></div>
            })}
          </div>
        </div>
      </Popover>
    </div>
  );
}