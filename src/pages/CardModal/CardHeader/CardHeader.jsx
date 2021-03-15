import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'

export const CardHeader = ({ title, handleEdit, closeModal }) => {
  const listTitle = useSelector(state => state.boardReducer.list.title)

  const blurTitle = ({ key, target }) => key === 'Enter' && target.blur()

  return (
    <header className="fw grid tc-a1aa g8">
      <img className="section-icon asc gc1" src={`${process.env.PUBLIC_URL}/Card.png`} alt="" />
      <input
        className="gc2 title pointer"
        autoComplete="off"
        name="title"
        value={title}
        onKeyPress={blurTitle}
        onFocus={ev => ev.target.select()}
        onChange={handleEdit}
      />
      <Button className="gc4 " size="large" onClick={closeModal}>
        X
      </Button>
      <span className="gc2">
        in list <u>{listTitle}</u>
      </span>
    </header>
  )
}
