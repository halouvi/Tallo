import { useDispatch, useSelector } from 'react-redux'
import { DELETE_FROM_BOARD, UPDATE_BOARD } from '../../../../store/board/BoardActions'
import { Button, Input, TextField } from '@material-ui/core'
import { useSetState } from 'react-use'
import { ColorPicker } from '../ColorPicker/ColorPicker'
import { PopoverHeader } from '../../PopoverHeader'
import { isEqual } from 'lodash'
import { useInput } from 'hooks/useInput'

export const LabelEditor = ({ labelToEdit, closeEditor, toggleLabel }) => {
  const dispatch = useDispatch()
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const [editedLabel, handleInput] = useInput({ ...labelToEdit })

  const isNewLabel = gLabels.every(({ _id }) => _id !== editedLabel._id)

  const deleteLabel = () => {
    dispatch(DELETE_FROM_BOARD({ name: 'labels', value: editedLabel._id }))
    closeEditor()
  }

  const updateLabel = ev => {
    ev.preventDefault()
    if (!isEqual(labelToEdit, editedLabel)) {
      dispatch(UPDATE_BOARD({ name: 'labels', value: editedLabel }))
    }
    closeEditor()
  }

  return (
    <form onSubmit={updateLabel} className="labels popover-cmp grid g6 tc4">
      <PopoverHeader title={isNewLabel ? 'Add' : 'Edit'} onBack={closeEditor} />
      <TextField
        required
        autoFocus
        size="small"
        className="gcf"
        variant="outlined"
        label="Label Name"
        name="title"
        value={editedLabel.title}
        onChange={handleInput}
      />
      <ColorPicker className="gcf" onClick={handleInput} selected={editedLabel.color} />

      <Button type="submit" size="large" className="green gc1" value={true}>
        Save
      </Button>
      {!isNewLabel && (
        <Button size="large" className="red gc4" onClick={deleteLabel}>
          Delete
        </Button>
      )}
    </form>
  )
}
