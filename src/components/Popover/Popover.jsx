import { ClickAwayListener, makeStyles, Popper } from '@material-ui/core'
import Grow from '@material-ui/core/Grow'
import { useState } from 'react'
import { useBus, useListener } from 'react-bus'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useKey, useSetState, useUpdateEffect } from 'react-use'
import { CLEAR_ITEMS } from '../../store/board/BoardActions'

const useStyles = makeStyles(theme => ({
  popper: {
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`
      }
    }
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    }
  }
}))

const TOGGLE_POPOVER = 'TOGGLE_POPOVER'
export const usePopover = () => {
  const eventBus = useBus()
  return (ev, cmp, preserveAnchor, anchorId) =>
    eventBus.emit(TOGGLE_POPOVER, [ev, cmp, preserveAnchor, anchorId])
}

export const Popover = () => {
  useListener(TOGGLE_POPOVER, payload => togglePopover(...payload))

  const initState = { anchorEl: null, DynCmp: null }
  const [{ anchorEl, DynCmp }, setState] = useSetState(initState)
  const list = useSelector(state => state.boardReducer.list)

  const inModal = useLocation().pathname.includes('board/card')

  const dispatch = useDispatch()

  const togglePopover = (ev, cmp, preserveAnchor, anchorId) => {
    if (ev.avoidClickAway || (ev.target === document.body && ev.type === 'click')) return
    if (!cmp || ev.currentTarget === anchorEl) {
      if (!inModal && list) dispatch(CLEAR_ITEMS())
      setState(initState)
    } else if (preserveAnchor) {
      setState({ DynCmp: cmp })
    } else if (anchorId) {
      ev.nativeEvent.avoidClickAway = true
      const prevAnchor = anchorEl
      setState(initState)
      const nextAnchor = document.querySelector(`[anchorid=${anchorId}]`)
      nextAnchor !== prevAnchor && setState({ anchorEl: nextAnchor, DynCmp: cmp })
    } else {
      ev.nativeEvent.avoidClickAway = true
      setState({ anchorEl: ev.currentTarget, DynCmp: cmp })
    }
  }

  useKey(
    'Escape',
    ev => {
      if (anchorEl) {
        ev.avoidCardModal = true
        togglePopover(ev)
      }
    },
    {},
    [anchorEl]
  )

  const [arrowRef, setArrowRef] = useState(null)
  const classes = useStyles()

  return (
    <ClickAwayListener onClickAway={togglePopover}>
      <Popper
        className={classes.popper}
        open={!!anchorEl}
        anchorEl={anchorEl}
        modifiers={{
          offset: {
            offset: '0,6'
          },
          arrow: {
            enabled: true,
            element: arrowRef
          }
        }}
        style={{ zIndex: 20 }}
        placement="bottom"
        transition>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={80}>
            <div onClick={ev => ev.stopPropagation()}>
              <span className={classes.arrow} ref={setArrowRef} />
              {DynCmp && <DynCmp togglePopover={togglePopover} />}
            </div>
          </Grow>
        )}
      </Popper>
    </ClickAwayListener>
  )
}
