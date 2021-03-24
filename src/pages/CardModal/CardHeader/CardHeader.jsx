import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { img } from 'assets/img'
import { disableAltKeyBlur } from 'service/utilService'

export const CardHeader = ({ title, handleEdit, closeModal }) => {
  const listTitle = useSelector(state => state.boardReducer.list.title)

  const blurTitle = ({ key, target }) => key === 'Enter' && target.blur()

  return (
    <header className="fw grid tc-a1aa g8">
      <img className="section-icon asc gc1" src={img.card} alt="" />
      <input
        name="title"
        value={title}
        autoComplete="off"
        onChange={handleEdit}
        onKeyPress={blurTitle}
        onKeyUp={disableAltKeyBlur}
        className="gc2 title pointer"
        onFocus={ev => ev.target.select()}
      />
      <Button className="gc4 " size="large" onClick={closeModal}>
        <img src={img.x} alt="" className="icon" />
      </Button>
      <span className="gc2">
        in list <u>{listTitle}</u>
      </span>
    </header>
  )
}
