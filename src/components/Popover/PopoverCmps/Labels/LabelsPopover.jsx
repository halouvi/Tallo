import { Button, TextField } from '@material-ui/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'
import { LabelEditor } from './LabelEditor'
import { boardService } from '../../../../service/boardService'
import { PopoverHeader } from '../../PopoverHeader'
import { useInput } from 'hooks/useInput'

const LABELS = 'labels'

export const LabelsPopover = () => {
  const dispatch = useDispatch()
  const gLabels = useSelector(state => state.boardReducer.board.labels) || []
  const { labels = [], _id: cardId = '' } = useSelector(state => state.boardReducer.card) || {}
  const [{ labelToEdit, searchTerm }, setState] = useInput({ labelToEdit: null, searchTerm: '' })

  const toggleLabel = ({ currentTarget: { value } }) => {
    dispatch(
      UPDATE_CARD({
        cardId,
        name: LABELS,
        value: labels.includes(value)
          ? labels.filter(labelId => labelId !== value)
          : [...labels, value]
      })
    )
  }

  const filteredLabels = gLabels.filter(({ title }) => RegExp(searchTerm, 'i').test(title))

  const editLabel = gLabel => setState({ labelToEdit: gLabel })

  const createNewLabel = () => setState({ labelToEdit: boardService.createNewLabel(searchTerm) })

  const closeEditor = () => setState({ labelToEdit: null })

  return !labelToEdit ? (
    <div className="labels popover-cmp grid tc4 g6">
      <PopoverHeader title="Labels" />
      <TextField
        autoFocus
        size="small"
        className="gcf"
        variant="outlined"
        name="searchTerm"
        value={searchTerm}
        onChange={setState}
        label="Search Labels"
      />
      {filteredLabels.map(gLabel => (
        <Fragment key={gLabel._id}>
          <Button
            size="large"
            className={`label gcf-1 flex jb ${gLabel.color}`}
            value={gLabel._id}
            onClick={toggleLabel}>
            <span>{gLabel.title}</span>
            <span>{labels.includes(gLabel._id) && 'V'}</span>
          </Button>
          <Button size="large" className="gcl" onClick={() => editLabel(gLabel)}>
            Edit
          </Button>
        </Fragment>
      ))}
      <Button size="large" className="gcf gray" onClick={createNewLabel}>
        Add Label
      </Button>
    </div>
  ) : (
    <LabelEditor labelToEdit={labelToEdit} closeEditor={closeEditor} />
  )
}
