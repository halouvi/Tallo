import { useSelector } from 'react-redux'

export const CardHeader = ({ title, handleEdit = () => {}, closeModal = () => {} }) => {
  const listTitle = useSelector(state => state.boardReducer.list.title)

  return (
    <header className="fw grid tc-a1aa g8">
        <img className="icon asc gc1" src={`${process.env.PUBLIC_URL}/Card.png`} alt="" />
      <input
        className="gc2 title pointer"
        autoComplete="off"
        name="title"
        value={title}
        onFocus={ev => ev.target.select()}
        onChange={handleEdit}
      />
      <button className="gc4 btn trans large" onClick={closeModal}>
        X
      </button>
      <span className="gc2">
        in list <u>{listTitle}</u>
      </span>
    </header>
  )
}
