import { Popover } from '@material-ui/core'
import { useState } from 'react'
import { Attachment } from '../../ReUsables/Attachment/Attachment'
import { CheckList } from '../../ReUsables/CheckList/CheckList'
import { DueDate } from '../../ReUsables/DueDate/DueDate'
import { Labels } from '../../ReUsables/Labels/Labels'
import { Members } from '../../ReUsables/Members/Members'

export const SideBar = props => {
  const [anchorEl, setAnchorEl] = useState(null)
  const cmpMap = {
    Members,
    Labels,
    CheckList,
    DueDate,
    Attachment,
  }

  const DynCmp = props => {
    const DynCmp = cmpMap[anchorEl.innerText.split(' ').join('')]
    return (
      <DynCmp
      className={anchorEl.innerText.split(' ').join('-').toLowerCase()}
      setAnchorEl={setAnchorEl}
      />
    )
  }

  return (
    <div className="side-bar pointer">
      <span className="title">Add To Card</span>
      <div className="buttons flex col">
        {Object.keys(cmpMap).map(cmp => (
          <span onClick={ev => setAnchorEl(ev.target)} key={cmp}>
            {cmp.split(/(?=[A-Z])/).join(' ')}
          </span>
        ))}
        <Popover
          id={Boolean(anchorEl) ? 'sidebar-popover' : undefined}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
          {anchorEl && DynCmp()}
        </Popover>
      </div>
    </div>
  )
}
