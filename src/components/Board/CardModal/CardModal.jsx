import { Avatar, ClickAwayListener } from '@material-ui/core'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { GET_BOARD_BY_ID, GET_CARD_BY_ID, UPDATE_CARD } from '../../../store/board/BoardActions'
import TextField from '@material-ui/core/TextField'
import { CardAvatars } from '../avatars/CardAvatars'
import { CardChecklists } from '../CardChecklists/CardChecklists'
import { SideBar } from './SideBar/SideBar'
import { Popover } from '../ReUsables/Popover/Popover'
import { Labels } from '../ReUsables/Labels/Labels'

export const CardModal = props => {
  const { board, users } = useSelector(state => state.boardReducer) || {}
  const [list, setList] = useState(null)
  const [card, setCard] = useState(null)
  const [timer, setTimer] = useState(null)
  const [editables, setEditables] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const { activity, attachments, members, labels, checklist } = card || {}
  const labelsRef = useRef(null)
  const { title, desc } = editables || {}
  const { _id } = useParams()
  const { goBack } = useHistory()
  const dispatch = useDispatch()

  const activityToShow = activity?.slice(0, 5);
  const attachmentsToShow = attachments?.slice(0, 3);

  useEffect(() => {
    if (!board) dispatch(GET_BOARD_BY_ID('5fe4b65432d4a24dbcb7afa2'))
    else {
      const { list: lst, card: crd } = dispatch(GET_CARD_BY_ID(_id))
      setList(lst)
      setCard(crd)
      if (!editables) setEditables({ title: crd.title, desc: crd.desc })
    }
  }, [board, _id])

  useEffect(() => {
    document.addEventListener('keyup', closeModal)
    return () => {
      document.removeEventListener('keyup', closeModal)
    }
  }, [])
  const closeModal = ({ key }) => key === 'Escape' && goBack()

  const handleInput = ({ target: { name, value } }) => {
    setEditables({ ...editables, [name]: value })
    clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        dispatch(UPDATE_CARD({ name, value, cardId: _id }))
      }, 1000)
    )
  }

  const togglePopover = ev => {
    ev.stopPropagation()
    setAnchorEl(!anchorEl ? labelsRef.current : null)
  }

  const dateConvert = time => {
    return moment(time).fromNow()
  }

  return (
    card &&
    users && (
      <div className="modal-screen flex as jc">
        <ClickAwayListener onClickAway={goBack}>
          <div className="modal-section">
            <div className="container wrap">
              <div className="modal-header fw flex wrap as jb">
                <input
                  className="card-title"
                  autoComplete="off"
                  name="title"
                  value={title}
                  onFocus={ev => ev.target.select()}
                  onChange={handleInput}
                />
                <button className="exit-btn fast flex ac jc" onClick={goBack}>
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
                    <div ref={labelsRef} className="labels-container flex">
                      {board.labels.map(
                        ({ _id: gLabelId, color, name }) =>
                          labels.some(labelId => labelId === gLabelId) && (
                            <div
                              className={`label ${color} pointer fast`}
                              key={gLabelId}
                              onClick={togglePopover}>
                              {name}
                            </div>
                          )
                      )}
                      <button className="modal-btn" onClick={togglePopover}>
                        +
                      </button>
                      <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                        <Labels card={card} setAnchorEl={setAnchorEl} />
                      </Popover>
                    </div>
                  </div>
                )}
                <div className="desc-container">
                  <h3>Description</h3>
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
                {checklist[0] && (
                  <div className="checklists-container">
                    {checklist.map((currChecklist, idx) => (
                      <CardChecklists
                        key={idx}
                        cardChecklists={checklist}
                        checklist={currChecklist}
                        cardId={_id}></CardChecklists>
                    ))}
                  </div>
                )}
                {attachments[0] && (
                  <div className="attachments-container">
                    <h3>Attachments</h3>
                    <div className="attach-container flex">
                      {attachmentsToShow.map((attachment, index) => <img key={index} src={attachment} alt="" />)}
                      {/* <img src={attachments[0]} alt="" /> */}
                    </div>
                  </div>
                )}
                <div className="activity-section">
                  <h3>Activity</h3>
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
                                  <p>{dateConvert(createdAt)}</p>
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
              <SideBar card={card} />
            </div>
          </div>
        </ClickAwayListener>
      </div>
    )
  )
}
