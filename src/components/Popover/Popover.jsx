import { ClickAwayListener, makeStyles, Popper } from '@material-ui/core'
import Grow from '@material-ui/core/Grow'
import { useEffect, useRef, useState } from 'react'
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
    zIndex: 1,
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
  return {
    togglePopover: (ev, cmp, preserveAnchor) => {
      eventBus.emit(TOGGLE_POPOVER, [ev, cmp, preserveAnchor])
    },

    isRedundantClickAway: ev => {
      return ev.isRedundantClickAway || (ev.target === document.body && ev.type === 'click')
    }
  }
}

export const Popover = () => {
  useListener(TOGGLE_POPOVER, payload => togglePopover(...payload))
  const { isRedundantClickAway } = usePopover()

  const dispatch = useDispatch()

  const initState = { anchorEl: null, DynCmp: null, rect: null }
  const [{ anchorEl, DynCmp, rect }, setState] = useSetState(initState)
  const list = useSelector(state => state.boardReducer.list)

  const closePopover = () => {
    if (!inModal && list) dispatch(CLEAR_ITEMS())
    setState(initState)
  }

  const inModal = useLocation().pathname.includes('board/card')

  const isSameAnchor = (ev, anchor) => ev.currentTarget === anchorEl || anchor === anchorEl

  const togglePopover = (ev = {}, cmp, preserveAnchor) => {
    if (isRedundantClickAway(ev)) return
    if (!cmp || isSameAnchor(ev)) closePopover()
    else {
      ev.nativeEvent.isRedundantClickAway = true
      const nextAnchor = preserveAnchor ? anchorEl : ev.currentTarget
      setState({
        anchorEl: nextAnchor,
        DynCmp: cmp,
        rect: nextAnchor.getBoundingClientRect()
      })
    }
  }

  useKey(
    'Escape',
    ev => {
      if (!DynCmp) return
      ev.avoidCardModal = true
      togglePopover(ev)
    },
    {},
    [anchorEl]
  )

  const [arrowRef, setArrowRef] = useState(null)
  const classes = useStyles()

  const anchorRef = useRef()
  const { left, width, bottom } = rect || {}

  return (
    <>
      <ClickAwayListener onClickAway={togglePopover} mouseEvent="onClick">
        <Popper
          className={classes.popper}
          open={!!anchorEl}
          anchorEl={anchorRef.current}
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
                <span
                  className={`${classes.arrow} ${!anchorEl ? ' hidden' : ''}`}
                  ref={setArrowRef}
                />
                {DynCmp && <DynCmp togglePopover={togglePopover} />}
              </div>
            </Grow>
          )}
        </Popper>
      </ClickAwayListener>
      <div
        ref={anchorRef}
        className="popover-anchor"
        style={{
          position: 'absolute',
          top: bottom || 0,
          left: (left || 0) + (width || 0) / 2,
          minWidth: 0.1
        }}
      />
    </>
  )
}
