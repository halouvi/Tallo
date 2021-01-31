import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button'
import { BoardMembers } from '../BoardMembers/BoardMembers'

// const useStyles = makeStyles(theme => ({
//   typography: {
//     padding: theme.spacing(2)
//   }
// }))

export default function SimplePopover({ users }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div className="board-members-section">
      <Button
        className="board-members-btn"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}>
        <img src={process.env.PUBLIC_URL + `/User.png`} alt="" />
        <div>Board Members ▼</div>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <BoardMembers users={users} setAnchorEl={setAnchorEl} />
      </Popover>
    </div>
  )
}
