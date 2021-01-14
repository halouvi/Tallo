import { Avatar } from '@material-ui/core'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { GET_BOARD_BY_ID, GET_CARD_BY_ID, UPDATE_CARD } from '../../../store/board/BoardActions'
import TextField from '@material-ui/core/TextField'
import { CardAvatars } from '../avatars/CardAvatars'
import { CardChecklists } from '../CardChecklists/CardChecklists'
import { SideBar } from './SideBar/SideBar'

export const CardModal = props => {
  const { board, users } = useSelector(state => state.boardReducer) || {}
  const [list, setList] = useState(null)
  const [card, setCard] = useState(null)
  const [timer, setTimer] = useState(null)
  const { activity, attachments, members, labels, checklist } = card || {}
  const [editables, setEditables] = useState(null)
  const { title, desc } = editables || {}
  const { _id } = useParams()
  const { goBack } = useHistory()
  const dispatch = useDispatch()
  const outClick = useRef()

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
    document.getElementById('root').addEventListener('mouseup', closeModal)
    return () => {
      document.removeEventListener('keyup', closeModal)
      document.getElementById('root').removeEventListener('mouseup', closeModal)
    }
  }, [])

  const handleInput = ({ target: { name, value } }) => {
    setEditables({ ...editables, [name]: value })
    clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        dispatch(UPDATE_CARD({ name, value, cardId: _id }))
      }, 1000)
    )
  }

  const closeModal = ({ key, target, type }) => {
    if (type === 'keyup' && key === 'Escape') goBack()
    else if (type === 'mouseup' && !outClick.current.contains(target)) goBack()
  }

  const dateConvert = time => {
    return moment(time).fromNow()
  }

  return (
    card &&
    users && (
      <div className="modal-screen flex as jc">
        <div className="modal-section" ref={outClick}>
          <div className="container">
            <div className="modal-header flex as jb">
              <input autoComplete="off" name="title" value={title} onChange={handleInput} />
              <button className="exit-btn fast flex ac jc" onClick={goBack}>
                X
              </button>
            </div>
            <p className="modal-subtitle">
              in list <span>{list.title}</span>
            </p>
            <SideBar card={card} />
            <div className="members-container">
              {members[0] && <CardAvatars className="card-avatars" members={members}></CardAvatars>}
            </div>
            {labels[0] && (
              <div className="labels-section">
                <h3>Labels</h3>
                <div className="labels-container">
                  {board.labels.map(
                    ({ _id: gLabelId, color, name }) =>
                      labels.some(labelId => labelId === gLabelId) && (
                        <div className="label-container" key={gLabelId}>
                          <div className={`label ${color}`}></div>
                          <p>{name}</p>
                        </div>
                      )
                  )}
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
                <img src={attachments[0]} alt="" />
              </div>
            )}
            <div className="activity-section">
              <h3>Activity</h3>
              <ul className="activity-container">
                {activity.map(({ activity, createdBy, createdAt }) => {
                  const { fullname, imgUrl } = users.find(user => user._id === createdBy) || {}
                  return (
                    fullname && (
                      <li key={createdAt}>
                        <div className="activity-main">
                          <Avatar alt={fullname} src={imgUrl ? imgUrl : '/'} />
                          <div className="activity-secondary">
                            <div className="activity-txt">
                              <h3>{fullname}</h3>
                              <p>{activity}</p>
                            </div>
                            <p>{dateConvert(createdAt)}</p>
                          </div>
                        </div>
                      </li>
                    )
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
