import { Labels } from '../../ReUsables/Labels/Labels'
import { DeleteCard } from '../../ReUsables/DeleteCard/DeleteCard'
import { useState } from 'react'
import { useKey } from 'react-use'

export const CardMenu = ({ card, setAnchorEl }) => {
  const [DynCmp, setDynCmp] = useState(null)

  const Menu = {
    Labels,
    DeleteCard
  }

  const toggleMenu = (ev, cmp) => {
    ev.stopPropagation()
    if (cmp) setDynCmp(() => cmp)
    else {
      setDynCmp(null)
      setAnchorEl(null)
    }
  }

  return (
    <div className="card-menu reusable flex col g16">
      <div className="rel flex ac jc">
        <span className="">Card Actions</span>
        <button className="right" onClick={toggleMenu}>
          X
        </button>
      </div>
      {!DynCmp ? (
        Object.entries(Menu).map(([name, cmp]) => (
          <span className="btn gray fast pointer" onClick={ev => toggleMenu(ev, cmp)} key={name}>
            <img src={process.env.PUBLIC_URL + `/${name}.png`} alt="" />
            {name.split(/(?=[A-Z])/).join(' ')}
          </span>
        ))
      ) : (
        <DynCmp card={card} toggleMenu={toggleMenu} />
      )}
    </div>
  )
}
