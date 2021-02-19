import { useSelector } from 'react-redux'
import { CardChecklist } from '../../CardChecklists/CardChecklists'
export const CardChecklists = () => {
  const checklist = useSelector(state => state.boardReducer.card.checklist)

  return checklist[0] ? (
    <div className="checklists fw gb10">
      {checklist.map((currChecklist, idx) => (
        <CardChecklist key={idx} cardChecklists={checklist} checklist={currChecklist} />
      ))}
    </div>
  ) : (
    <></>
  )
}
