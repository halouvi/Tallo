import { Button } from '@material-ui/core'
import { useDisableAltKeyBlur } from 'hooks/useDisableAltKeyBlur'
import { useSelector } from 'react-redux'
import { img } from 'assets/img'

export const CardHeader = ({ title, handleEdit, closeModal }) => {
  const listTitle = useSelector(state => state.boardReducer.list.title)

  const blurTitle = ({ key, target }) => key === 'Enter' && target.blur()
  const disableAltKeyBlur = useDisableAltKeyBlur()

  return (
    <header className="fw grid tc-a1aa g8">
      <img className="section-icon asc gc1" src={img.card} alt="" />
      <input
        className="gc2 title pointer"
        autoComplete="off"
        name="title"
        value={title}
        onKeyPress={blurTitle}
        onKeyUp={disableAltKeyBlur}
        onFocus={ev => ev.target.select()}
        onChange={handleEdit}
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
