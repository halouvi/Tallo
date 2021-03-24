import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { usePopover } from 'components/Popover/Popover'
import { LabelsPopover } from 'components/Popover/PopoverCmps/Labels/LabelsPopover'

export const CardLabels = ({ labels }) => {
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const activeLabels = gLabels.filter(({ _id }) => labels.includes(_id))
  const togglePopover = usePopover()

  const openPopover = ev => togglePopover(ev, LabelsPopover)

  return (
    <div className="fg1">
      {activeLabels[0] && (
        <div className={`ml32 wfc`}>
          <h4>Labels</h4>
          <div className="flex gr6 wfc wrap">
            {activeLabels.map(({ _id, color, title }) => (
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
    </div>
  )
}
