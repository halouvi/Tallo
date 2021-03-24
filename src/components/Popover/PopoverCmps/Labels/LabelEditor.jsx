import { useDispatch, useSelector } from 'react-redux'
import { DELETE_FROM_BOARD, UPDATE_BOARD } from 'store/board/BoardActions'
import { Button, TextField } from '@material-ui/core'
import { isEqual } from 'lodash'
import { useInput } from 'hooks/useInput'
import { PopoverHeader } from 'components/Popover/PopoverHeader'
import { ColorPicker } from 'components/Popover/PopoverCmps/ColorPicker/ColorPicker'

const LABELS = 'labels'

export const LabelEditor = ({ labelToEdit, closeEditor }) => {
  const dispatch = useDispatch()
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const [editedLabel, handleInput] = useInput(labelToEdit)

  const isNewLabel = gLabels.every(({ _id }) => _id !== editedLabel._id)

  const deleteLabel = () => {
    dispatch(DELETE_FROM_BOARD({ name: LABELS, value: editedLabel._id }))
    closeEditor()
  }

  const updateLabel = ev => {
    ev.preventDefault()
    dispatch(UPDATE_BOARD({ name: LABELS, value: editedLabel }))
    closeEditor()
  }

  const noChange = isEqual(labelToEdit, editedLabel)

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

      <Button
        type="submit"
        size="large"
        disabled={noChange}
        className={`gc1${noChange ? ' gray' : ' green'}`}>
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
