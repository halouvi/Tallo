import { Checkbox } from "@material-ui/core"
import { useState } from "react";
import { useDispatch } from "react-redux"
import { UPDATE_CARD } from "../../../store/board/BoardActions";
import ProgressBar from "./ProgressBar/ProgressBar"

export const CardChecklists = ({ checklist, cardChecklists, cardId }) => {
    const [showInput, setShowInput] = useState(false);
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
        dispatch(UPDATE_CARD({ field: 'checklist', value: [...lists], cardId }));
    }

    const toggleInput = () => {
        setShowInput(!showInput)
    }


    return (
        <div className="checklists-section">
            <h3>{checklist.title}</h3>
            <ProgressBar progress={progressStatus()}></ProgressBar>
            {checklist.items.map((item, idx) => (
                <div key={idx} className="checklist-item-container">
                    <Checkbox
                        color="primary"
                        inputProps={{ 'aria-label': 'checkbox' }}
                        checked={item.isChecked}
                        onChange={() => onCheckBox(idx)}
                    />
                    <p>{item.desc}</p>
                </div>
            ))}
            { !showInput && <button onClick={toggleInput}>Add an item</button>}
            {showInput && <div className="add-item-container">
                <input type="text" name="" id=""/>
                <button>Add</button> <button onClick={toggleInput}>X</button>
            </div>
            }
        </div>
    )
}