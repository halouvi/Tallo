import { Popover } from '../../ReUsables/Popover/Popover'
import { useRef, useState } from 'react'
import { Attachment } from '../../ReUsables/Attachment/Attachment'
import { CheckList } from '../../ReUsables/CheckList/CheckList'
import { DueDate } from '../../ReUsables/DueDate/DueDate'
import { Labels } from '../../ReUsables/Labels/Labels'
import { Members } from '../../ReUsables/Members/Members'

export const SideBar = ({ card }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const cmpMap = {
    Members,
    Labels,
    CheckList,
    DueDate,
    Attachment
  }

  const DynCmp = () => {
    const DynCmp = cmpMap[anchorEl.innerText.split(' ').join('')]
    return <DynCmp setAnchorEl={setAnchorEl} card={card} />
  }

  const togglePopover = (ev) => {
    ev.stopPropagation()
    setAnchorEl(ev.target !== anchorEl ? ev.target : null)
  }

  return (
    <div className="side-bar flex col">
      <span className="title">Add To Card</span>
      <div className="buttons flex col">
        {Object.keys(cmpMap).map(cmp => (
          <span className="modal-btn fast" onClick={togglePopover} key={cmp}>
            {cmp.split(/(?=[A-Z])/).join(' ')}
          </span>
        ))}
        <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
          {anchorEl && DynCmp()}
        </Popover>
      </div>
    </div>
  )
}
