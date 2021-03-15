import { ColorPicker } from './ColorPicker/ColorPicker'
import { PopoverHeader } from '../PopoverHeader'

export const BoardColor = () => {
  const onColorPick = ({ currentTarget: { value } }) => {
    var root = document.getElementById('root')
    value = value === 'gradient' ? 'linear-gradient(#006f83, #00aecc)' : value
    root.style.background = value
  }

  return (
    <div className="popover-cmp flex col">
      <PopoverHeader title="Choose Color" />
      <ColorPicker className="" onClick={onColorPick} />
    </div>
  )
}
