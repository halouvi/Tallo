import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useKey, useSetState, useUpdateEffect } from 'react-use'
import { CLEAR_CARD, GET_BY_ID, UPDATE_CARD } from '../../../store/board/BoardActions'
import { Popover } from '../ReUsables/Popover/Popover'
import { CardModalHeader } from './Header/CardModalHeader'
import { SideBar } from './SideBar/SideBar'
import { Activity } from './Content/Activity'
import { Description } from './Content/Description'
import { CardVideo } from './Content/CardVideo'
import { Attachments } from './Content/Attachments'
import { Checklists } from './Content/Checklists'
import { CardNav } from './CardNav/CardNav'
import { Members } from './Content/Members'
import { CardLabels } from './Content/Labels'

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
    <div className="modal-screen flex col ac js" onClick={closeModal}>
      <CardNav />
      {card && (
        <section className="card-modal white grid g16 " onClick={togglePopover}>
          <CardModalHeader title={title} handleEdit={handleEdit} closeModal={closeModal} />
          <div className="content flex wrap gb16  ">
            <Members togglePopover={togglePopover} />
            <CardLabels togglePopover={togglePopover} />
            <CardVideo />
            <Attachments />
            <Description desc={desc} handleEdit={handleEdit} />
            <Checklists />  
            <Activity />
          </div>
          <SideBar togglePopover={togglePopover} />
        </section>
      )}
      <Popover anchorEl={anchorEl} togglePopover={togglePopover} pos="bottom-start">
        {DynCmp && (
          <DynCmp anchorEl={anchorEl} togglePopover={togglePopover} list={list} card={card} />
        )}
      </Popover>
    </div>
  )
}
