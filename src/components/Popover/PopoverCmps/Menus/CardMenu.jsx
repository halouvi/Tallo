import { LabelsPopover } from '../../../Popover/PopoverCmps/Labels/LabelsPopover'
import { CardMembersPopover } from '../../../Popover/PopoverCmps/Members/CardMembersPopover'
import { DeletePopover } from '../../../Popover/PopoverCmps/Delete/DeletePopover'
import { MoveCardPopover } from '../../../Popover/PopoverCmps/MoveCard/MoveCardPopover'
import { MenuItem, MenuList } from '@material-ui/core'

export const CardMenu = ({ togglePopover }) => {
  const Menu = {
    Labels: LabelsPopover,
    Members: CardMembersPopover,
    Move_Card: MoveCardPopover,
    Delete_Card: DeletePopover
  }
  const format = str => str.split('_').join(' ')

  return (
    <MenuList className="popover-cmp small flex col list-br">
      {Object.entries(Menu).map(([name, cmp]) => (
        <MenuItem key={name} onClick={ev => togglePopover(ev, cmp, true)}>
          <img className="icon mr10" src={process.env.PUBLIC_URL + `/${name}.png`} alt="" />
          {format(name)}
        </MenuItem>
      ))}
    </MenuList>
  )
}
