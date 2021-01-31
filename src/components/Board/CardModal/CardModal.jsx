import moment from 'moment'
import TextField from '@material-ui/core/TextField'
import { Avatar } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { CardAvatars } from '../avatars/CardAvatars'
import { CardChecklists } from '../CardChecklists/CardChecklists'
import { SideBar } from './SideBar/SideBar'
import { Labels } from '../ReUsables/Labels/Labels'
import { Popover } from '../ReUsables/Popover/Popover'
import { useKey, useSetState, useUpdateEffect } from 'react-use'
import { GET_CARD_BY_ID, UPDATE_CARD, CLEAR_CARD } from '../../../store/board/BoardActions'

export const CardModal = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { board, list, card } = useSelector(state => state.boardReducer) || {}
  const { users } = board || {}
  const { activity, attachments, members, labels, checklist, cardVideo } = card || {}
  const [{ title, desc }, setEditables] = useSetState({ title: '', desc: '' })
  const { cardId } = useParams()
  const [anchorEl, setAnchorEl] = useState(null)
  const [DynCmp, setDynCmp] = useState(null)
  const [timer, setTimer] = useState(null)

  const activityToShow = activity?.slice(0, 5)
  const attachmentsToShow = attachments?.slice(0, 3)

  useEffect(() => dispatch(GET_CARD_BY_ID(cardId)), [board, cardId])
  useUpdateEffect(() => setEditables({ title: card.title, desc: card.desc }), [card?._id])

  const closeModal = () => {
    history.push('/board')
    dispatch(CLEAR_CARD())
  }

  useKey('Escape', closeModal)

  const handleEdit = ({ target: { name, value } }) => {
    setEditables({ [name]: value })
    clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        dispatch(UPDATE_CARD({ name, value, cardId }))
      }, 500)
    )
  }

  const cycleCards = ev => {
    ev.stopPropagation()
    const cardIdx = list.cards.findIndex(crd => crd._id === cardId)
    const nextCardId = cardIdx > -1 && list.cards[cardIdx + +ev.target.value]?._id
    if (nextCardId) history.push(nextCardId)
  }

  const togglePopover = (ev, cmp) => {
    ev.stopPropagation()
    setDynCmp(cmp ? () => cmp : null)
    setAnchorEl(ev.currentTarget !== anchorEl && cmp ? ev.currentTarget : null)
  }

  return (
    <div className="modal-screen flex col ac js" onClick={closeModal}>
      <nav className="card-nav flex jb fw">
        <button value={-1} onClick={cycleCards}>
          Previous Card
        </button>
        <button value={1} onClick={cycleCards}>
          Next Card
        </button>
      </nav>
      <div className="modal-section" onClick={togglePopover}>
        <div className="container">
          {card && (
            <>
              <div className="modal-header fw flex col as">
                <div className="title-header flex fw jb">
                  <div className="flex ac">
                    <img src={process.env.PUBLIC_URL + `/Card.png`} alt="" />
                    <input
                      className="card-title"
                      autoComplete="off"
                      name="title"
                      value={title}
                      onFocus={ev => ev.target.select()}
                      onChange={handleEdit}
                    />
                  </div>
                  <button className="exit-btn fast flex ac jc" onClick={closeModal}>
                    X
                  </button>
                </div>
                <p className="modal-subtitle fw">
                  in list <span>{list.title}</span>
                </p>
              </div>
              <div className="content sbl">
                {members[0] && (
                  <div className="members-container">
                    <CardAvatars className="card-avatars" members={members}></CardAvatars>
                  </div>
                )}
                {labels[0] && (
                  <div className="labels-section">
                    <h3>Labels</h3>
                    <div
                      className="labels-container flex wfc"
                      onClick={ev => togglePopover(ev, Labels)}>
                      {board.labels.map(
                        ({ _id: gLabelId, color, name }) =>
                          labels.some(labelId => labelId === gLabelId) && (
                            <div className={`label ${color} pointer fast`} key={gLabelId}>
                              {name}
                            </div>
                          )
                      )}
                      <button className="modal-btn">+</button>
                    </div>
                  </div>
                )}
                {cardVideo && <div className="video-section">
                  <div className="video-header">
                    <img src={process.env.PUBLIC_URL + `/AddVideo.png`} alt="" />
                    <h3>Card Video</h3>
                  </div>
                  <video className="card-video" controls>
                    <source src={cardVideo} />
                  </video>
                </div>}
                <div className="desc-container">
                  <div className="desc-header">
                    <img src={process.env.PUBLIC_URL + `/Description.png`} alt="" />
                    <h3>Description</h3>
                  </div>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    placeholder="Add a more detailed description..."
                    rows={4}
                    variant="outlined"
                    name="desc"
                    value={desc}
                    onChange={handleEdit}
                  />
                </div>
                {checklist[0] && (
                  <div className="checklists-container">
                    {checklist.map((currChecklist, idx) => (
                      <CardChecklists
                        key={idx}
                        cardChecklists={checklist}
                        checklist={currChecklist}
                        cardId={cardId}
                      />
                    ))}
                  </div>
                )}
                {attachments[0] && (
                  <div className="attachments-container">
                    <div className="attachments-header">
                      <img src={process.env.PUBLIC_URL + `/Attachment.png`} alt="" />
                      <h3>Attachments</h3>
                    </div>
                    <div className="attach-container flex">
                      {attachmentsToShow.map((attachment, index) => (
                        <img key={index} src={attachment} alt="" />
                      ))}
                    </div>
                  </div>
                )}
                <div className="activity-section">
                  <div className="activity-header">
                    <img src={process.env.PUBLIC_URL + `/Activity.png`} alt="" />
                    <h3>Activity</h3>
                  </div>
                  <ul className="activity-container">
                    {activityToShow.map(({ activity, createdBy, createdAt }) => {
                      const { fullname, imgUrl } = users.find(user => user._id === createdBy) || {}
                      return (
                        fullname && (
                          <li key={createdAt}>
                            <div className="activity-main">
                              <div className="activity-secondary">
                                <Avatar alt={fullname} src={imgUrl ? imgUrl : '/'} />
                                <div className="activity-txt">
                                  <div>
                                    <span className="bold">{fullname} </span>
                                    {activity}
                                  </div>
                                  <p>{moment(createdAt).fromNow()}</p>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      )
                    })}
                  </ul>
                </div>
              </div>
              <SideBar togglePopover={togglePopover} />
            </>
          )}
        </div>
      </div>
      <Popover anchorEl={anchorEl} togglePopover={togglePopover} pos="bottom-start">
        {DynCmp && (
          <DynCmp anchorEl={anchorEl} togglePopover={togglePopover} list={list} card={card} />
        )}
      </Popover>
    </div>
  )
}
