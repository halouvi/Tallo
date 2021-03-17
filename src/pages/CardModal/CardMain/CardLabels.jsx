import { Button, Portal } from '@material-ui/core'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { usePopover } from '../../../components/Popover/Popover'
import { LabelsPopover } from '../../../components/Popover/PopoverCmps/Labels/LabelsPopover'

export const CardLabels = ({ labels }) => {
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const activelabels = gLabels.filter(({ _id }) => labels.includes(_id))
  const togglePopover = usePopover()
  const anchorId = 'CardLabelsAnchor'
  const [{ left, width, bottom }, setRect] = useState({})

  const openPopover = ev => {
    setRect(ev.currentTarget.getBoundingClientRect())
    togglePopover(ev, LabelsPopover, false, anchorId)
  }

  return (
    <div className="fg1">
      {activelabels[0] && (
        <div className={`ml32 wfc`}>
          <h4>Labels</h4>
          <div className="flex gr6 wfc wrap">
            {activelabels.map(({ _id, color, title }) => (
              <Button size="large" className={`mt6 ${color}`} key={_id} onClick={openPopover}>
                {title}
              </Button>
            ))}
            <Button size="large" className={`mt6 gray`} onClick={openPopover}>
              +
            </Button>
          </div>
        </div>
      )}
      <Portal>
        <div
          style={{ position: 'absolute', top: `${bottom}px`, left: `${left + width / 2}px` }}
          anchorid={anchorId}
        />
      </Portal>
    </div>
  )
}
