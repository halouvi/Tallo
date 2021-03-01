import Button from '@material-ui/core/Button'
import { ColorPicker } from '../../../Popover/PopoverCmps/ColorPicker/ColorPicker'

export const BoardColor = ({ togglePopover }) => {
  const onColorPick = ({ currentTarget: { value } }) => {
    var root = document.getElementById('root')
    value = value === 'gradient' ? 'linear-gradient(#006f83, #00aecc)' : value
    root.style.background = value
  }
  
  return (
    <div className="popover-cmp flex col">
      <div className="flex col rel mb6">
        <span className="center">Choose Color</span>
        <Button size="large" className=" ase" onClick={togglePopover}>
          X
        </Button>
      </div>
      <ColorPicker className="" onClick={onColorPick} />
    </div>
  )
}
