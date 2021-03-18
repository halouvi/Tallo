import { CardMembersPopover } from 'components/Popover/PopoverCmps/Members/CardMembersPopover'
import { LabelsPopover } from 'components/Popover/PopoverCmps/Labels/LabelsPopover'
import { CheckListPopover } from 'components/Popover/PopoverCmps/CheckList/CheckListPopover'
import { DueDatePopover } from 'components/Popover/PopoverCmps/DueDate/DueDatePopover'
import { AttachmentPopover } from 'components/Popover/PopoverCmps/Attachment/AttachmentPopover'
import { MoveCardPopover } from 'components/Popover/PopoverCmps/MoveCard/MoveCardPopover'
import { DeletePopover } from 'components/Popover/PopoverCmps/Delete/DeletePopover'
import { AddVideoPopover } from 'components/Popover/PopoverCmps/AddVideo/VideoPopover'
import { usePopover } from 'components/Popover/Popover'
import { Button } from '@material-ui/core'
import { img } from 'assets/img'

const menu = [
  [
    'Add To Card',
    [
      ['Members', CardMembersPopover, img.members],
      ['Labels', LabelsPopover, img.labels],
      ['Check List', CheckListPopover, img.move],
      ['Due Date', DueDatePopover, img.dueDate],
      ['Attachment', AttachmentPopover, img.attachment],
      ['Video', AddVideoPopover, img.video]
    ]
  ],
  [
    'Actions',
    [
      ['Move Card', MoveCardPopover, img.move],
      ['Delete Card', DeletePopover, img.trash]
    ]
  ]
]

export const CardAside = () => {
  const { togglePopover } = usePopover()

  return (
    <aside className="gb18">
      {menu.map(([name, items]) => (
        <div key={name} className="gb6">
          <h4>{name}</h4>
          <div className="buttons grid g6">
            {items.map(([name, cmp, img]) => (
              <Button
                size="large"
                className="gray flex js"
                onClick={ev => togglePopover(ev, cmp)}
                key={name}>
                <img className="icon mr10" src={img} alt="" />
                <span>{name}</span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  )
}
