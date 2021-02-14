import { Checkbox } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../store/board/BoardActions'
import { useToggle, useSetState } from 'react-use'
import ProgressBar from './ProgressBar'
import { makeId } from '../../../service/utilService'

export const CardChecklists = ({ checklist, cardChecklists }) => {
  const dispatch = useDispatch()
  const cardId = useSelector(state => state.boardReducer.card._id)
  const [showInput, toggleInput] = useToggle(false)
  const [newItem, setNewItem] = useSetState({
    _id: makeId(),
    desc: '',
    isChecked: false
  })

  const progressStatus = () => {
    var checkedItems = checklist.items.filter(item => item.isChecked === true)
    let res = (+checkedItems.length / +checklist.items.length) * 100
    if (isNaN(res)) res = 0
    return res
  }

  const toogleCheckBox = ({ target: { value } }) => {
    let list = JSON.parse(JSON.stringify(checklist))
    let lists = JSON.parse(JSON.stringify(cardChecklists))
    list.items[value].isChecked = !list.items[value].isChecked
    const listIdx = lists.findIndex(aList => aList._id === list._id)
    lists[listIdx] = list
    dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }))
  }

  const addNewItem = async () => {
    let list = JSON.parse(JSON.stringify(checklist))
    let lists = JSON.parse(JSON.stringify(cardChecklists))
    console.log(list)
    const listIdx = lists.findIndex(aList => aList._id === list._id)
    console.log(listIdx)
    lists[listIdx].items.push(newItem)
    await dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }))
    setNewItem({ _id: makeId(), desc: '', isChecked: false })
    toggleInput()
  }

  const removeItem = ({ target: { value } }) => {
    let list = JSON.parse(JSON.stringify(checklist))
    let lists = JSON.parse(JSON.stringify(cardChecklists))
    list.items.splice(value, 1)
    const listIdx = lists.findIndex(aList => aList._id === list._id)
    lists[listIdx] = list
    dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }))
  }

  const handleInput = ({ target: { name, value } }) => setNewItem({ [name]: value })

  const removeList = () => {
    let lists = JSON.parse(JSON.stringify(cardChecklists))
    const listIdx = lists.findIndex(list => list._id === checklist._id)
    lists.splice(listIdx, 1)
    dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }))
  }

  return (
    <div className="checklist gb6">
      <div className="flex ac gr10 sbl ">
        <img className="icon" src={process.env.PUBLIC_URL + `/CheckList.png`} alt="" />
        <h3>{checklist.title}</h3>
        <button className="btn gray small" onClick={removeList}>
          Delete
        </button>
      </div>
      <div className="ml30">
        <ProgressBar progress={progressStatus()} />
        <div className="flex wrap">
          {checklist.items.map((item, idx) => (
            <div key={idx} className="item flex ac sbl ml-12">
              <Checkbox
                color="primary"
                inputProps={{ 'aria-label': 'checkbox' }}
                checked={item.isChecked}
                value={idx}
                onChange={toogleCheckBox}
              />
              <span>{item.desc}</span>
              <button className="btn trans small" value={idx} onClick={removeItem}>
                X
              </button>
            </div>
          ))}
        </div>
        {!showInput ? (
          <button className="btn gray small" onClick={toggleInput}>
            Add an item
          </button>
        ) : (
          <div className="flex col w50 gb6">
            <input autoFocus name="desc" value={newItem.desc} onChange={handleInput} />
            <div className="flex gr6">
              <button className="btn green small" onClick={addNewItem}>
                Add
              </button>
              <button className="btn trans small" onClick={toggleInput}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
