import { useState } from "react";
import { useDispatch } from "react-redux"
import { UPDATE_CARD } from "../../../../store/board/BoardActions";
import UtilService from "../../../../service/UtilService"

export const CheckList = ({card: {_id: cardId, checklist: cardChecklist}, setAnchorEl}) => {
  const [checklist, setChecklist] = useState({
    _id: UtilService.makeId(),
    title: '',
    items: [],
  })
  const dispatch = useDispatch();

  const onAddChecklist = (ev) => {
    ev.preventDefault();
    dispatch(UPDATE_CARD({ field: 'checklist', value: [...cardChecklist, checklist], cardId }));
  }

  const onHandleChange = (ev) => {
    const value = ev.target.value;
    const field = ev.target.name;
    setChecklist({...checklist, [field]: value});
    console.log(checklist);
  }


  return (
    <div className="checklist-section reusable flex col">
      <button className="close-btn pos-tr" onClick={() => setAnchorEl(null)}>
        X
    </button>
      <p className="title bold asc">Add a Check List</p>
      <form action="" className="flex col" onSubmit={onAddChecklist}>
        <label htmlFor="checklist-title">Title</label>
        <input autoFocus id="checklist-title" value={checklist.title} onChange={onHandleChange} name="title" type="text" placeholder="Insert a title..."/>
        <button>Add</button>
      </form>
    </div>
  )
}
