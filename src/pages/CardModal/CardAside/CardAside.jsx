import { CardMembersPopover } from '../../../components/Popover/PopoverCmps/Members/CardMembersPopover'
import { LabelsPopover } from '../../../components/Popover/PopoverCmps/Labels/LabelsPopover'
import { CheckListPopover } from '../../../components/Popover/PopoverCmps/CheckList/CheckListPopover'
import { DueDatePopover } from '../../../components/Popover/PopoverCmps/DueDate/DueDatePopover'
import { AttachmentPopover } from '../../../components/Popover/PopoverCmps/Attachment/AttachmentPopover'
import { MoveCardPopover } from '../../../components/Popover/PopoverCmps/MoveCard/MoveCardPopover'
import { DeletePopover } from '../../../components/Popover/PopoverCmps/Delete/DeletePopover'
import { AddVideoPopover } from '../../../components/Popover/PopoverCmps/AddVideo/VideoPopover'
import { Button } from '@material-ui/core'
import { usePopover } from '../../../components/Popover/Popover'

export const CardAside = () => {
  const togglePopover = usePopover()

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
