import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useKey, useSetState, useUpdateEffect } from 'react-use'
import { CLEAR_ITEMS, GET_BY_ID, UPDATE_CARD } from '../../store/board/BoardActions'
import { CardHeader } from './CardHeader/CardHeader'
import { CardAside } from './CardAside/CardAside'
import { CardActivity } from './CardMain/CardActivity'
import { CardDescription } from './CardMain/CardDescription'
import { CardVideo } from './CardMain/CardVideo'
import { CardAttachments } from './CardMain/CardAttachments'
import { CardChecklists } from './CardMain/CardChecklists'
import { CardNav } from './CardNav/CardNav'
import { CardMembers } from './CardMain/CardMembers'
import { CardLabels } from './CardMain/CardLabels'
import { ClickAwayListener } from '@material-ui/core'
import { usePopper } from 'react-popper'
import { usePopover } from 'components/Popover/Popover'

export const CardModal = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { cardId } = useParams()
  useEffect(() => dispatch(GET_BY_ID(cardId)), [cardId])

  const card = useSelector(state => state.boardReducer.card)

  const [{ title, desc, timer }, setEditables] = useSetState({ title: '', desc: '', timer: null })
  const updateEditablesOnCardNav = () => setEditables({ title: card.title, desc: card.desc })
  useUpdateEffect(updateEditablesOnCardNav, [card?._id])

  const { togglePopover, isRedundantClickAway } = usePopover()

  const closeModal = ev => {
    if (isRedundantClickAway(ev)) return
    togglePopover(ev)
    history.push('/board')
    dispatch(CLEAR_ITEMS())
  }
  useKey('Escape', ev => setTimeout(() => !ev.avoidCardModal && closeModal(ev), 0))

  const handleEdit = ({ target: { name, value } }) => {
    clearTimeout(timer)
    setEditables({
      [name]: value,
      timer: setTimeout(() => dispatch(UPDATE_CARD({ name, value, cardId })), 500)
    })
  }

  const { members, labels, cardVideo, attachments, checklists, activity } = card || {}
  return (
    <div className="card modal-screen">
      <CardNav />
      {card && (
        <ClickAwayListener onClickAway={closeModal} mouseEvent="onClick">
          <section className="card-modal white grid g16">
            <CardHeader title={title} handleEdit={handleEdit} closeModal={closeModal} />
            <main className="flex wrap gb16">
              <CardMembers members={members} />
              <CardLabels labels={labels} />
              {cardVideo && <CardVideo cardVideo={cardVideo} />}
              {attachments?.[0] && <CardAttachments attachments={attachments} />}
              <CardDescription desc={desc} handleEdit={handleEdit} />
              {checklists?.[0] && <CardChecklists checklists={checklists} />}
              {activity?.[0] && <CardActivity activity={activity} />}
            </main>
            <CardAside />
          </section>
        </ClickAwayListener>
      )}
    </div>
  )
}
