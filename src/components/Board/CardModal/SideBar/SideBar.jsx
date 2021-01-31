import { Members } from '../../ReUsables/Members/Members'
import { Labels } from '../../ReUsables/Labels/Labels'
import { CheckList } from '../../ReUsables/CheckList/CheckList'
import { DueDate } from '../../ReUsables/DueDate/DueDate'
import { Attachment } from '../../ReUsables/Attachment/Attachment'
import { MoveCard } from '../../ReUsables/MoveCard/MoveCard'
import { DeleteCard } from '../../ReUsables/DeleteCard/DeleteCard'
import { AddVideo } from '../../ReUsables/AddVideo/AddVideo'

export const SideBar = ({ togglePopover }) => {
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
    <div className="side-bar flex col">
      {Object.entries(cmpMap).map(([title, list]) => (
        <div key={title}>
          <span className="title">{title.split(/(?=[A-Z])/).join(' ')}</span>
          <div className="buttons">
            {Object.entries(list).map(([name, cmp]) => (
              <span className="modal-btn fast" onClick={ev => togglePopover(ev, cmp)} key={name}>
                <img src={process.env.PUBLIC_URL + `/${name}.png`} alt="" />
                {name.split(/(?=[A-Z])/).join(' ')}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}