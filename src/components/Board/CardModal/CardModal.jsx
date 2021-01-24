import { Avatar, Popper } from '@material-ui/core'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { GET_BOARD_BY_ID, GET_CARD_BY_ID, UPDATE_CARD } from '../../../store/board/BoardActions'
import TextField from '@material-ui/core/TextField'
import { CardAvatars } from '../avatars/CardAvatars'
import { CardChecklists } from '../CardChecklists/CardChecklists'
import { SideBar } from './SideBar/SideBar'
import { Labels } from '../ReUsables/Labels/Labels'
import { Popover } from '../ReUsables/Popover/Popover'

export const CardModal = props => {
  const { board, list, card, users } = useSelector(state => state.boardReducer) || {}
  const { activity, attachments, members, labels, checklist } = card || {}
  const [editables, setEditables] = useState(null)
  const { title, desc } = editables || {}
  const [timer, setTimer] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [DynCmp, setDynCmp] = useState(null)
  const { _id } = useParams()
  const { push } = useHistory()
  const dispatch = useDispatch()

  const activityToShow = activity?.slice(0, 5)
  const attachmentsToShow = attachments?.slice(0, 3)

  useEffect(() => {
    if (!board) dispatch(GET_BOARD_BY_ID('5fe4b65432d4a24dbcb7afa2'))
    else dispatch(GET_CARD_BY_ID(_id))
  }, [board, _id])

  useEffect(() => setEditables(null), [_id])

  useEffect(() => !editables && setEditables({ title: card?.title, desc: card?.desc }), [card])

  useEffect(() => {
    document.addEventListener('keyup', closeModal)
    return () => {
      document.removeEventListener('keyup', closeModal)
    }
  }, [])

  const closeModal = ({ type, key }) => {
    if (type === 'click' || key === 'Escape') push('/board')
  }

  const handleInput = ({ target: { name, value } }) => {
    setEditables({ ...editables, [name]: value })
    clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        dispatch(UPDATE_CARD({ name, value, cardId: _id }))
      }, 1000)
    )
  }

  const togglePopover = (ev, cmp) => {
    ev.stopPropagation()
    setDynCmp(cmp ? () => cmp : null)
    setAnchorEl(ev.currentTarget !== anchorEl && cmp ? ev.currentTarget : null)
  }

  return (
    card &&
    users && (
      <div className="modal-screen flex as jc" onClick={closeModal}>
        <div className="modal-section" onClick={togglePopover}>
          <div className="container wrap">
            <div className="modal-header fw flex wrap as jb">
              <div className="title-header">
                <img src={process.env.PUBLIC_URL + `/Card.png`} alt="" />
                <input
                  className="card-title"
                  autoComplete="off"
                  name="title"
                  value={title}
                  onFocus={ev => ev.target.select()}
                  onChange={handleInput}
                />
              </div>
              <button className="exit-btn fast flex ac jc" onClick={closeModal}>
                X
              </button>
              <p className="modal-subtitle fw">
                in list <span>{list.title}</span>
              </p>
            </div>
            <div className="content">
              {members[0] && (
                <div className="members-container">
                  <CardAvatars className="card-avatars" members={members}></CardAvatars>
                </div>
              )}
              {labels[0] && (
                <div className="labels-section">
                  <h3>Labels</h3>
                  <div className="labels-container flex wfc" onClick={ev => togglePopover(ev, Labels)}>
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
                  onChange={handleInput}
                />
              </div>
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
                              <p>{moment(createdAt).fromNow()}</p>
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
            <Popover anchorEl={anchorEl} togglePopover={togglePopover} pos="bottom-start">
              {DynCmp && (
                <DynCmp anchorEl={anchorEl} togglePopover={togglePopover} list={list} card={card} />
              )}
            </Popover>
          </div>
        </div>
      </div>
    )
  )
}
