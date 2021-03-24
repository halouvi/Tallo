import { img } from 'assets/img'
import { ReactSVG } from 'react-svg'
import { MenuItem, MenuList } from '@material-ui/core'
import { DeletePopover } from 'components/Popover/PopoverCmps/Delete/DeletePopover'

export const ListMenu = ({ togglePopover }) => {
  const menu = [['Delete List', DeletePopover, img.trash]]

  return (
    <MenuList className="popover-cmp small flex col list-br">
      {menu.map(([name, cmp, img]) => (
        <MenuItem key={name} onClick={ev => togglePopover(ev, cmp, true)}>
          <img className="mr10 icon" src={img} alt="" />
          {name}
        </MenuItem>
      ))}
    </MenuList>
  )
}
