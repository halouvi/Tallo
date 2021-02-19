import { useSelector } from 'react-redux'
import { Labels } from '../../ReUsables/Labels/Labels'

export const CardLabels = ({ togglePopover = () => {} }) => {
  const labels = useSelector(state => state.boardReducer.card.labels)
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const activelabels = gLabels.filter(({ _id }) => labels.includes(_id))

  return activelabels[0] ? (
    <div className="labels wfc ml32 gb6 pointer" onClick={ev => togglePopover(ev, Labels)}>
      <h4>Labels</h4>
      <div className="flex gr6 wfc wrap">
        {activelabels.map(({ _id, color, name }) => (
          <button className={`btn mb4 ${color} pointer fast`} key={_id}>
            {name}
          </button>
        ))}
      </div>
    </div>
  ) : (
    <></>
  )
}
