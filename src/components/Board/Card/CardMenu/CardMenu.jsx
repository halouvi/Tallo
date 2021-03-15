import { Labels } from '../../ReUsables/Labels/Labels'
import { DeleteCard } from '../../ReUsables/DeleteCard/DeleteCard'

export const CardMenu = ({ togglePopover, anchorEl }) => {
  const Menu = {
    Labels,
    DeleteCard
  }

  return (
    <div className="card-menu flex col">
      {Object.entries(Menu).map(([name, cmp]) => (
        <span
          className="modal-btn fast"
          onClick={ev => togglePopover(ev, cmp)}
          key={name}>
          <img src={process.env.PUBLIC_URL + `/${name}.png`} alt="" />
          {name.split(/(?=[A-Z])/).join(' ')}
        </span>
      ))}
    </div>
  )
}