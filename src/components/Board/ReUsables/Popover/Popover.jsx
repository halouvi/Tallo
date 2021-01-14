import { useEffect, useRef } from 'react'
import { ClickAwayListener, Popper } from '@material-ui/core'
export const Popover = ({ children, anchorEl, setAnchorEl }) => {
  return (
    anchorEl && (
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <Popper
          open={!!anchorEl}
          anchorEl={anchorEl}
          disablePortal={true}
          style={{ zIndex: 1000 }}
          onClose={() => setAnchorEl(null)}
          placement="bottom-start">
          {children}
        </Popper>
      </ClickAwayListener>
    )
  )
}
