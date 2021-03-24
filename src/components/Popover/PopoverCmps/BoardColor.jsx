import { PopoverHeader } from "components/Popover/PopoverHeader"
import { ColorPicker } from "components/Popover/PopoverCmps/ColorPicker/ColorPicker"

export const BoardColor = () => {
  const onColorPick = ({ currentTarget: { value } }) => {
    var root = document.getElementById('root')
    value = value === 'gradient' ? 'linear-gradient(#006f83, #00aecc)' : value
    root.style.background = value
  }

  return (
    <div className="popover-cmp flex col gb6">
      <PopoverHeader title="Choose Color" />
      <ColorPicker onClick={onColorPick} />
    </div>
  )
}
