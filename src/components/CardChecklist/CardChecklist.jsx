import { Button, Checkbox } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from 'store/board/BoardActions'
import { useToggle, useSetState } from 'react-use'
import { makeId } from 'service/utilService'
import { ProgressBar } from 'components/CardChecklist/ProgressBar'
import { cloneDeep as clone } from 'lodash'

export const CardChecklist = ({ checklist, checklists }) => {
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
    let list = clone(checklist)
    let lists = clone(checklists)
    list.items[value].isChecked = !list.items[value].isChecked
    const listIdx = lists.findIndex(aList => aList._id === list._id)
    lists[listIdx] = list
    dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }))
  }

  const addNewItem = () => {
    let list = clone(checklist)
    let lists = clone(checklists)
    const listIdx = lists.findIndex(aList => aList._id === list._id)
    lists[listIdx].items.push(newItem)
    dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }))
    setNewItem({ _id: makeId(), desc: '', isChecked: false })
    toggleInput()
  }

  const removeItem = ({ target: { value } }) => {
    let list = clone(checklist)
    let lists = clone(checklists)
    list.items.splice(value, 1)
    const listIdx = lists.findIndex(aList => aList._id === list._id)
    lists[listIdx] = list
    dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }))
  }

  const handleInput = ({ target: { name, value } }) => setNewItem({ [name]: value })

  const removeList = () => {
    let lists = clone(checklists)
    const listIdx = lists.findIndex(list => list._id === checklist._id)
    lists.splice(listIdx, 1)
    dispatch(UPDATE_CARD({ name: 'checklist', value: [...lists], cardId }))
  }

  return (
    <div className="checklist gb6">
      <div className="flex ac gr10 sbl ">
        <img className="section-icon" src={process.env.PUBLIC_URL + `/Check_List.png`} alt="" />
        <h3>{checklist.title}</h3>
        <Button className="gray" onClick={removeList}>
          Delete
        </Button>
      </div>
      <div className="ml30">
        <ProgressBar progress={progressStatus()} />
        <div className="flex wrap">
          {checklist.items.map((item, idx) => (
            <div key={item._id} className="item flex ac sbl ml-12">
              <Checkbox
                color="primary"
                inputProps={{ 'aria-label': 'checkbox' }}
                checked={item.isChecked}
                value={idx}
                onChange={toogleCheckBox}
              />
              <span>{item.desc}</span>
              <Button className="" value={idx} onClick={removeItem}>
                X
              </Button>
            </div>
          ))}
        </div>
        {!showInput ? (
          <Button className="gray" onClick={toggleInput}>
            Add an item
          </Button>
        ) : (
          <div className="flex col w50 gb6">
            <input autoFocus name="desc" value={newItem.desc} onChange={handleInput} />
            <div className="flex gr6">
              <Button className="green" onClick={addNewItem}>
                Add
              </Button>
              <Button className="" onClick={toggleInput}>
                X
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
