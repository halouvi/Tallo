import { useSelector } from "react-redux"

export const Members = ({ setAnchorEl }) => {
  // const {Members} = useSelector(state => state.)
  return (
    <div className="members flex col">
      <span className="title asc">Members</span>
      <button className="close-btn pos-tr" onClick={() => setAnchorEl(null)}>
        X
      </button>
      <input type="text" placeholder="Search Members" />
      <span>BOARD MEMBERS</span>
      
    </div>
  )
}
