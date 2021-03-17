import { CardChecklist } from 'components/CardChecklist/CardChecklist'
export const CardChecklists = ({ checklists }) => {
  return (
    <div className="checklists fw gb10">
      {checklists.map(checklist => (
        <CardChecklist key={checklist._id} checklists={checklists} checklist={checklist} />
      ))}
    </div>
  )
}
