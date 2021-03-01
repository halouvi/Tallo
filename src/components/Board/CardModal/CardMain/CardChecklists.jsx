import { useSelector } from 'react-redux'
import { CardChecklist } from '../../../CardChecklist/CardChecklist'
export const CardChecklists = () => {
  const checklists = useSelector(state => state.boardReducer.card.checklists) || []

  return checklists[0] ? (
    <div className="checklists fw gb10">
      {checklists.map((checklist, idx) => (
        <CardChecklist key={idx} checklists={checklists} checklist={checklist} />
      ))}
    </div>
  ) : (
    <></>
  )
}
