import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useKey, useSetState, useUpdateEffect } from 'react-use'
import { CLEAR_CARD, GET_BY_ID, UPDATE_CARD } from '../../../store/board/BoardActions'
import { Popover } from '../ReUsables/Popover/Popover'
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

export const CardModal = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { cardId } = useParams()
  const { list, card } = useSelector(state => state.boardReducer) || {}
  const [{ title, desc }, setEditables] = useSetState({ title: '', desc: '' })

  const [anchorEl, setAnchorEl] = useState(null)
  const [DynCmp, setDynCmp] = useState(null)
  const [timer, setTimer] = useState(null)

  const updateEditablesOnCardNav = () => setEditables({ title: card.title, desc: card.desc })

  const closeModal = () => {
    history.push('/board')
    dispatch(CLEAR_CARD())
  }

  useEffect(() => dispatch(GET_BY_ID(cardId)), [cardId])

  useUpdateEffect(updateEditablesOnCardNav, [card?._id])

  useKey('Escape', closeModal)

  const handleEdit = ({ target: { name, value } }) => {
    setEditables({ [name]: value })
    clearTimeout(timer)
    setTimer(setTimeout(() => dispatch(UPDATE_CARD({ name, value, cardId })), 500))
  }

  const togglePopover = (ev, cmp) => {
    ev.stopPropagation()
    setDynCmp(cmp ? () => cmp : null)
    setAnchorEl(ev.currentTarget !== anchorEl ? ev.currentTarget : null)
  }

  return (
    <div className="modal-screen" onClick={closeModal}>
      <CardNav />
      {card && (
        <section className="card-modal white grid g16" onClick={togglePopover}>
          <CardHeader title={title} handleEdit={handleEdit} closeModal={closeModal} />
          <main className="flex wrap gb16  ">
            <CardMembers togglePopover={togglePopover} />
            <CardLabels togglePopover={togglePopover} />
            <CardVideo />
            <CardAttachments />
            <CardDescription desc={desc} handleEdit={handleEdit} />
            <CardChecklists />
            <CardActivity />
          </main>
          <CardAside togglePopover={togglePopover} />
        </section>
      )}
      {DynCmp && (
        <Popover anchorEl={anchorEl} togglePopover={togglePopover} pos="bottom-start">
          <DynCmp anchorEl={anchorEl} togglePopover={togglePopover} list={list} card={card} />
        </Popover>
      )}
    </div>
  )
}
