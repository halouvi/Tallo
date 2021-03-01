import { useDispatch, useSelector } from 'react-redux'
import { makeId } from '../../../../service/utilService'
import { cloneDeep as clone } from 'lodash'
import { UPDATE_BOARD } from '../../../../store/board/BoardActions'
import { Button, TextField } from '@material-ui/core'
import { useSetState } from 'react-use'
import { ColorPicker } from '../ColorPicker/ColorPicker'
import { PopoverHeader } from '../../PopoverHeader'

export const LabelEditor = ({ labelToEdit, closeEditor }) => {
  const dispatch = useDispatch()
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const [updatedLabel, setUpdatedLabel] = useSetState({ ...labelToEdit })

  const handleInput = ({ currentTarget: { name, value } }) => setUpdatedLabel({ [name]: value })

  const isNewLabel = gLabels.find(({ _id }) => _id === updatedLabel._id)

  const saveLabel = () => {
    if (isNewLabel) updateLabels([...gLabels, updatedLabel])
    else {
      const idx = gLabels.findIndex(label => label._id === labelToEdit._id)
      const updatedLabels = clone(gLabels)
      updatedLabels.splice(idx, 1, updatedLabel)
      updateLabels(updatedLabels)
    }
  }

  const deleteLabel = () => updateLabels(gLabels.filter(({ _id }) => _id !== updatedLabel._id))

  const updateLabels = updatedLabels => {
    dispatch(UPDATE_BOARD({ name: 'labels', value: updatedLabels }))
    closeEditor()
  }

  return (
    <div className="labels popover-cmp grid g6 tc4">
      <PopoverHeader title={isNewLabel ? 'Add' : 'Edit'} onBack={closeEditor} />
      <TextField
        className="gcf"
        variant="outlined"
        size="small"
        label="Label Name"
        name="title"
        value={updatedLabel.title}
        onChange={handleInput}
      />
      <ColorPicker className="gcf" onClick={handleInput} selected={updatedLabel.color} />

      <Button size="large" className="green gc1" value={true} onClick={saveLabel}>
        Save
      </Button>
      {!isNewLabel && (
        <Button size="large" className="red gc4" onClick={deleteLabel}>
          Delete
        </Button>
      )}
    </div>
  )
}
