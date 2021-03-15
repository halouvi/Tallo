import { DeletePopover } from '../Delete/DeletePopover'
import { MenuItem, MenuList } from '@material-ui/core'

export const ListMenu = ({ togglePopover }) => {
  const Menu = {
    Delete_List: DeletePopover
  }
  
  const format = str => str.split('_').join(' ')

  return (
    <MenuList className="popover-cmp small flex col list-br">
      {Object.entries(Menu).map(([name, cmp]) => (
        <MenuItem key={name} onClick={ev => togglePopover(ev, cmp, true)}>
          <img className="icon" src={process.env.PUBLIC_URL + `/${name}.png`} alt="" />
          {format(name)}
        </MenuItem>
      ))}
    </MenuList>
  )
}
