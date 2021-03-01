import { CardMembersPopover } from '../../../Popover/PopoverCmps/Members/CardMembersPopover'
import { LabelsPopover } from '../../../Popover/PopoverCmps/Labels/LabelsPopover'
import { CheckListPopover } from '../../../Popover/PopoverCmps/CheckList/CheckListPopover'
import { DueDatePopover } from '../../../Popover/PopoverCmps/DueDate/DueDatePopover'
import { AttachmentPopover } from '../../../Popover/PopoverCmps/Attachment/AttachmentPopover'
import { MoveCardPopover } from '../../../Popover/PopoverCmps/MoveCard/MoveCardPopover'
import { DeletePopover } from '../../../Popover/PopoverCmps/Delete/DeletePopover'
import { AddVideoPopover } from '../../../Popover/PopoverCmps/AddVideo/VideoPopover'
import { Button } from '@material-ui/core'

export const CardAside = ({ togglePopover }) => {
  const cmpMap = {
    Add_To_Card: {
      Members: CardMembersPopover,
      Labels: LabelsPopover,
      Check_List: CheckListPopover,
      Due_Date: DueDatePopover,
      Attachment: AttachmentPopover,
      Video: AddVideoPopover
    },
    Actions: {
      Move_Card: MoveCardPopover,
      Delete_Card: DeletePopover
    }
  }

  const format = str => str.split('_').join(' ')
  return (
    <aside className="gb18">
      {Object.entries(cmpMap).map(([title, list]) => (
        <div key={title} className="gb6">
          <h4>{format(title)}</h4>
          <div className="buttons grid g6">
            {Object.entries(list).map(([name, cmp]) => (
              <Button
                size="large"
                className="gray flex js"
                onClick={ev => togglePopover(ev, cmp)}
                key={name}>
                <img className="icon" src={process.env.PUBLIC_URL + `/${name}.png`} alt="" />
                <span>{format(name)}</span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  )
}
