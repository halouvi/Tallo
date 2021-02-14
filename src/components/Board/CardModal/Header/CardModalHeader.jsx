import { useSelector } from 'react-redux'

export const CardModalHeader = ({ title, handleEdit = () => {}, closeModal = () => {} }) => {
  const listTitle = useSelector(state => state.boardReducer.list.title)

  return (
    <div className="header fw grid tc-a1 g8">
      <img className="gc1 asc icon" src={process.env.PUBLIC_URL + `/Card.png`} alt="" />
      <input
        className="gc2 title br6 bold pointer"
        autoComplete="off"
        name="title"
        value={title}
        onFocus={ev => ev.target.select()}
        onChange={handleEdit}
      />
      <button className="gc3 btn trans large" onClick={closeModal}>
        X
      </button>
      <span className="gc2">
        in list <u>{listTitle}</u>
      </span>
    </div>
  )
}
  