import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { LabelsPopover } from '../../../Popover/PopoverCmps/Labels/LabelsPopover'

export const CardLabels = ({ togglePopover }) => {
  const labels = useSelector(state => state.boardReducer.card.labels)
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const activelabels = gLabels.filter(({ _id }) => labels.includes(_id))

  return activelabels[0] ? (
    <div className="labels ml32 pointer" onClick={ev => togglePopover(ev, LabelsPopover)}>
      <h4>Labels</h4>
      <div className="flex gr6 wfc wrap">
        {activelabels.map(({ _id, color, title }) => (
          <Button size="large" className={`mt6 ${color}`} key={_id}>
            {title}
          </Button>
        ))}
        <Button size="large" className={`mt6 gray`}>
          +
        </Button>
      </div>
    </div>
  ) : (
    <></>
  )
}
