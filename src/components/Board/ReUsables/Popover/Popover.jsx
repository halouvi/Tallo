import { ClickAwayListener, Popper } from '@material-ui/core'

export const Popover = ({ anchorEl, pos, children, togglePopover = () => {}}) => {
  return (
    anchorEl && (
      <ClickAwayListener onClickAway={togglePopover}>
        <Popper
          onClick={ev => ev.stopPropagation()}
          open={!!anchorEl}
          anchorEl={anchorEl}
          style={{zIndex:100}}
          placement={pos}>
          {children}
        </Popper>
      </ClickAwayListener>
    )
  )
}
