import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useKey, useUpdateEffect } from 'react-use'
import { CLEAR_ITEMS, UPDATE_CARD } from '../../store/board/BoardActions'
import { CardHeader } from './CardHeader/CardHeader'
import { CardAside } from './CardAside/CardAside'
import { CardActivity } from './CardMain/CardActivity'
import { CardDescription } from './CardMain/CardDescription'
import { CardVideo } from './CardMain/CardVideo'
import { CardAttachments } from './CardMain/CardAttachments'
import { CardChecklists } from './CardMain/CardChecklists'
import { CardNav } from './CardNav/CardNav'
import { CardUsers } from './CardMain/CardUsers'
import { CardLabels } from './CardMain/CardLabels'
import { ClickAwayListener } from '@material-ui/core'
import { useInput } from 'hooks/useInput'
import { isRedundantClickAway } from 'service/utilService'

export const CardModal = ({ card }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { _id: cardId, users, labels, cardVideo, attachments, checklists, activity } = card

  const updateStore = ({ name, value }) => dispatch(UPDATE_CARD({ name, value, cardId }))
  const [{ title, desc }, handleEdit] = useInput(
    { title: card.title, desc: card.desc },
    updateStore,
    500
  )
  const updateEditablesOnCardNav = () => handleEdit({ title: card.title, desc: card.desc }, false)
  useUpdateEffect(updateEditablesOnCardNav, [card])

  const closeModal = ev => {
    if (ev.avoidCardModal || isRedundantClickAway(ev)) return
    history.push('/board')
    dispatch(CLEAR_ITEMS())
  }
  useKey('Escape', ev => setTimeout(() => !ev.avoidCardModal && closeModal(ev), 0))

  return (
    <div className="card modal-screen">
      <CardNav />
      {card && (
        <ClickAwayListener onClickAway={closeModal} mouseEvent="onClick">
          <section className="card-modal white grid g16">
            <CardHeader title={title} handleEdit={handleEdit} closeModal={closeModal} />
            <main className="flex wrap gb16">
              <CardUsers users={users} />
              <CardLabels labels={labels} />
              {cardVideo && <CardVideo cardVideo={cardVideo} />}
              {attachments[0] && <CardAttachments attachments={attachments} />}
              <CardDescription desc={desc} handleEdit={handleEdit} />
              {checklists[0] && <CardChecklists checklists={checklists} />}
              {activity[0] && <CardActivity activity={activity} />}
            </main>
            <CardAside />
          </section>
        </ClickAwayListener>
      )}
    </div>
  )
}
