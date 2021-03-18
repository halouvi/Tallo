import { LabelsPopover } from 'components/Popover/PopoverCmps/Labels/LabelsPopover'
import { CardMembersPopover } from 'components/Popover/PopoverCmps/Members/CardMembersPopover'
import { DeletePopover } from 'components/Popover/PopoverCmps/Delete/DeletePopover'
import { MoveCardPopover } from 'components/Popover/PopoverCmps/MoveCard/MoveCardPopover'
import { MenuItem, MenuList } from '@material-ui/core'
import { ReactSVG } from 'react-svg'
import { img } from 'assets/img'

export const CardMenu = ({ togglePopover }) => {
  const menu = [
    ['Labels', LabelsPopover, img.labels],
    ['Members', CardMembersPopover, img.members],
    ['Move Card', MoveCardPopover, img.move],
    ['Delete Card', DeletePopover, img.trash]
  ]

  return (
    <MenuList className="popover-cmp small flex col list-br">
      {menu.map(([name, cmp, img]) => (
        <MenuItem key={name} onClick={ev => togglePopover(ev, cmp, true)}>
          <img className="mr10 icon" src={img}  alt=""/>
          {name}
        </MenuItem>
      ))}
    </MenuList>
  )
}
