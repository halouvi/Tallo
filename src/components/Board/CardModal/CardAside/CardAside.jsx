import { CardMembersPopup as Members } from '../../ReUsables/Members/CardMembers'
import { Labels } from '../../ReUsables/Labels/Labels'
import { CheckList } from '../../ReUsables/CheckList/CheckList'
import { DueDate } from '../../ReUsables/DueDate/DueDate'
import { Attachment } from '../../ReUsables/Attachment/Attachment'
import { MoveCard } from '../../ReUsables/MoveCard/MoveCard'
import { DeleteCard } from '../../ReUsables/DeleteCard/DeleteCard'
import { AddVideo } from '../../ReUsables/AddVideo/AddVideo'
// import { Popper } from '@material-ui/core'

export const CardAside = ({ togglePopover = () => {} }) => {
  const cmpMap = {
    AddToCard: {
      Members,
      Labels,
      CheckList,
      DueDate,
      Attachment,
      AddVideo
    },
    Actions: {
      MoveCard,
      DeleteCard
    }
  }

  return (
    <aside className="gb18">
      {Object.entries(cmpMap).map(([title, list]) => (
        <div key={title} className="gb6">
          <h4>{title.split(/(?=[A-Z])/).join(' ')}</h4>
          <div className="buttons grid g6">
            {Object.entries(list).map(([name, cmp]) => (
              <button className="btn gray" onClick={ev => togglePopover(ev, cmp)} key={name}>
                <img className="icon" src={process.env.PUBLIC_URL + `/${name}.png`} alt="" />
                <span>{name.split(/(?=[A-Z])/).join(' ')}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  )
}
