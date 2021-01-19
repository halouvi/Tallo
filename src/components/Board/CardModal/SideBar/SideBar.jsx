import { Popover } from '../../ReUsables/Popover/Popover'
import { useState } from 'react'
import { Attachment } from '../../ReUsables/Attachment/Attachment'
import { CheckList } from '../../ReUsables/CheckList/CheckList'
import { DueDate } from '../../ReUsables/DueDate/DueDate'
import { Labels } from '../../ReUsables/Labels/Labels'
import { Members } from '../../ReUsables/Members/Members'
import { MoveCard } from '../../ReUsables/MoveCard/MoveCard'

export const SideBar = ({ card, list }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [currCmpMap, setCurrCmpMap] = useState(null)
  const addToCard = {
    Members,
    Labels,
    CheckList,
    DueDate,
    Attachment
  }
  const actions = {
    MoveCard
  }

  const DynCmp = () => {
    const DynCmp = currCmpMap[anchorEl.innerText.split(' ').join('')]
    return <DynCmp setAnchorEl={setAnchorEl} card={card} list={list} />
  }

  const togglePopover = (ev, cmpMap) => {
    ev.stopPropagation()
    setCurrCmpMap(cmpMap)
    setAnchorEl(ev.target !== anchorEl ? ev.target : null)
  }

  return (
    <div className="side-bar flex col">
      <div>
        <span className="title">Add To Card</span>
        <div className="buttons">
          {Object.keys(addToCard).map(cmp => (
            <span className="modal-btn fast" onClick={ev => togglePopover(ev, addToCard)} key={cmp}>
              {cmp.split(/(?=[A-Z])/).join(' ')}
            </span>
          ))}
        </div>
        <div>
          <span className="title">Actions</span>
          <div className="buttons">
            {Object.keys(actions).map(cmp => (
              <span className="modal-btn fast" onClick={ev => togglePopover(ev, actions)} key={cmp}>
                {cmp.split(/(?=[A-Z])/).join(' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        {anchorEl && DynCmp()}
      </Popover>
    </div>
  )
}
