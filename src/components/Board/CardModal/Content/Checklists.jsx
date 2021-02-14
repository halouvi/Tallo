import { useSelector } from 'react-redux'
import { CardChecklists } from '../../CardChecklists/CardChecklists'
export const Checklists = () => {
  const checklist = useSelector(state => state.boardReducer.card.checklist)

  return checklist[0] ? (
    <div className="checklists fw gb10">
      {checklist.map((currChecklist, idx) => (
        <CardChecklists key={idx} cardChecklists={checklist} checklist={currChecklist} />
      ))}
    </div>
  ) : (
    <></>
  )
}
