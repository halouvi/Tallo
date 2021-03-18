import { Button, TextField } from '@material-ui/core'
import { Fragment } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CARD } from '../../../../store/board/BoardActions'
import { LabelEditor } from './LabelEditor'
import { boardService } from '../../../../service/boardService'
import { PopoverHeader } from '../../PopoverHeader'
import { useSetState, useUpdateEffect } from 'react-use'

export const LabelsPopover = () => {
  const dispatch = useDispatch()
  const gLabels = useSelector(state => state.boardReducer.board.labels) || []
  const { labels = [], _id: cardId = '' } = useSelector(state => state.boardReducer.card) || {}
  const [{ labelToEdit, searchTerm }, setState] = useSetState({ labelToEdit: null, searchTerm: '' })

  const toggleLabel = ({ currentTarget: { value } }) => {
    dispatch(
      UPDATE_CARD({
        cardId,
        name: 'labels',
        value: labels.includes(value)
          ? labels.filter(labelId => labelId !== value)
          : [...labels, value]
      })
    )
  }

  const filteredLabels = gLabels.filter(({ title }) => RegExp(searchTerm, 'i').test(title))

  const handleInput = ({ target: { value } }) => setState({ searchTerm: value })

  const editLabel = gLabel => setState({ labelToEdit: gLabel })

  const createNewLabel = () => setState({ labelToEdit: boardService.createNewLabel(searchTerm) })

  const closeEditor = () => setState({ labelToEdit: null })

  useUpdateEffect(() => setState({ searchTerm: '' }), [labelToEdit])

  return !labelToEdit ? (
    <div className="labels popover-cmp grid tc4 g6">
      <PopoverHeader title="Labels" />
      <TextField
        className="gcf"
        size="small"
        variant="outlined"
        label="Search Labels"
        value={searchTerm}
        onChange={handleInput}
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
