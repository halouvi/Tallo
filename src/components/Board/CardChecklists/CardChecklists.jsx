import { Checkbox } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_CARD } from "../../../store/board/BoardActions";
import ProgressBar from "./ProgressBar/ProgressBar";
import utilService from "../../../service/utilService";


export const CardChecklists = ({ checklist, cardChecklists, cardId }) => {
    const [showInput, setShowInput] = useState(false);
    const [newItem, setNewItem] = useState({
        _id: utilService.makeId(),
        desc: '',
        isChecked: false,

    })
    const dispatch = useDispatch();

    const progressStatus = () => {
        var checkedItems = checklist.items.filter(item => item.isChecked === true);
        let res = (+checkedItems.length / +checklist.items.length) * 100;
        if (isNaN(res)) res = 0;
        return res
    }

    const onCheckBox = (idx) => {
        let list = JSON.parse(JSON.stringify(checklist));
        let lists = JSON.parse(JSON.stringify(cardChecklists));
        list.items[idx].isChecked = !list.items[idx].isChecked;
        const listIdx = lists.findIndex(aList => aList._id === list._id);
        lists[listIdx] = list;
        dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }));
    }

    const toggleInput = () => {
        setShowInput(!showInput)
    }

    const onAddNewItem = async () => {
        let list = JSON.parse(JSON.stringify(checklist));
        let lists = JSON.parse(JSON.stringify(cardChecklists));
        console.log(list);
        const listIdx = lists.findIndex(aList => aList._id === list._id);
        console.log(listIdx);
        lists[listIdx].items.push(newItem);
        await dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }));
        setNewItem({ _id: utilService.makeId(), desc: '', isChecked: false })
        toggleInput();
    }

    const onRemoveItem = (idx) => {
        let list = JSON.parse(JSON.stringify(checklist));
        let lists = JSON.parse(JSON.stringify(cardChecklists));
        list.items.splice(idx, 1);
        const listIdx = lists.findIndex(aList => aList._id === list._id);
        lists[listIdx] = list;
        dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }));
    }

    const onHandleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        setNewItem({ ...newItem, [field]: value })
    }

    const onRemoveList = () => {
        let lists = JSON.parse(JSON.stringify(cardChecklists));
        const listIdx = lists.findIndex(list => list._id === checklist._id);
        lists.splice(listIdx, 1)
        dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }));
    }

    return (
        <div className="checklists-section">
            <div className="list-header">
                <div className="header-main">
                    <img src={process.env.PUBLIC_URL + `/CheckList.png`} alt="" />
                    <h3>{checklist.title}</h3>
                </div>
                <button onClick={onRemoveList}>Delete</button>
            </div>
            <ProgressBar progress={progressStatus()}></ProgressBar>
            {checklist.items.map((item, idx) => (
                <div key={idx} className="checklist-item-container">
                    <div className="checklist-item-main">
                        <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'checkbox' }}
                            checked={item.isChecked}
                            onChange={() => onCheckBox(idx)}
                        />
                        <p>{item.desc}</p>
                    </div>
                    <button onClick={() => onRemoveItem(idx)}>X</button>
                </div>
            ))}
            { !showInput && <button onClick={toggleInput}>Add an item</button>}
            {showInput && <div className="add-item-container">
                <input autoFocus type="text" name="desc" value={newItem.desc} onChange={onHandleChange} id="" />
                <div className="btns-container">
                    <button onClick={onAddNewItem}>Add</button>
                    <button onClick={toggleInput}>X</button>
                </div>
            </div>
            }
        </div>
    )
}