import { ClickAwayListener, Popper } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import { useListener } from 'react-bus'

export const Popover = ({ anchorEl, pos, children, togglePopover = () => {} }) => {
  // const [anchorEl, setAnchorEl] = useState(null)

  // const togglePopover = () => {}

  useListener('togglePopover', togglePopover)

  return (
    anchorEl && (
      <ClickAwayListener onClickAway={togglePopover}>
        <Popper
          onClick={ev => ev.stopPropagation()}
          open={!!anchorEl}
          anchorEl={anchorEl}
          style={{ zIndex: 100 }}
          placement={pos}
          transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={200}>
              <div>{children}</div>
            </Fade>
          )}
        </Popper>
      </ClickAwayListener>
    )
  )
}
