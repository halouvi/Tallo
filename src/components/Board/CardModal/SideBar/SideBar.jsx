import { useState } from 'react'
import { Popover } from '../../ReUsables/Popover/Popover'
import { Members } from '../../ReUsables/Members/Members'
import { Labels } from '../../ReUsables/Labels/Labels'
import { CheckList } from '../../ReUsables/CheckList/CheckList'
import { DueDate } from '../../ReUsables/DueDate/DueDate'
import { Attachment } from '../../ReUsables/Attachment/Attachment'
import { MoveCard } from '../../ReUsables/MoveCard/MoveCard'
import { DeleteCard } from '../../ReUsables/DeleteCard/DeleteCard'

export const SideBar = ({ card, list }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [DynCmp, setDynCmp] = useState(null)

  const addToCard = {
    Members,
    Labels,
    CheckList,
    DueDate,
    Attachment
  }

  const actions = {
    MoveCard,
    DeleteCard
  }

  const togglePopover = (ev, cmp) => {
    ev.stopPropagation()
    setAnchorEl(ev.target !== anchorEl ? ev.target : null)
    setDynCmp(ev.target !== anchorEl ? () => cmp : null)
  }

  return (
    <div className="side-bar flex col">
      <div>
        <span className="title">Add To Card</span>
        <div className="buttons">
          {Object.entries(addToCard).map(([name, cmp]) => (
            <span className="modal-btn fast" onClick={ev => togglePopover(ev, cmp)} key={name}>
              {name.split(/(?=[A-Z])/).join(' ')}
            </span>
          ))}
        </div>
        <div>
          <span className="title">Actions</span>
          <div className="buttons">
            {Object.entries(actions).map(([name, cmp]) => (
              <span className="modal-btn fast" onClick={ev => togglePopover(ev, cmp)} key={name}>
                {name.split(/(?=[A-Z])/).join(' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        {DynCmp && <DynCmp setAnchorEl={setAnchorEl} card={card} list={list} />}
      </Popover>
    </div>
  )
}
