import { Avatar } from '@material-ui/core'
import moment from 'moment'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { GET_BOARD_BY_ID, GET_CARD_BY_ID, UPDATE_CARD } from '../../../store/board/BoardActions'
import { Textarea } from '../../Textarea/Textarea'
import { CardAvatars } from '../avatars/CardAvatars'
import { CardChecklists } from '../CardChecklists/CardChecklists'
import { SideBar } from './SideBar/SideBar'

export const CardModal = props => {
  const { board, list, card, users } = useSelector(state => state.boardReducer) || {}
  const { activity, title, attachments, members, desc, labels, checklist } = card || {}
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const outClick = useRef()

  useEffect(() => {
    if (board) dispatch(GET_CARD_BY_ID(id))
    else dispatch(GET_BOARD_BY_ID('5fe4b65432d4a24dbcb7afa2'))
  }, [id, board])

  useEffect(() => {
    document.addEventListener('keyup', closeModal)
    document.getElementById('root').addEventListener('mouseup', closeModal)
    return () => {
      document.removeEventListener('keyup', closeModal)
      document.getElementById('root').removeEventListener('mouseup', closeModal)
    }
  }, [])

  const updateCard = ({ field, value }) => {
    dispatch(UPDATE_CARD({ field, value, cardId: id }))
  }

  const closeModal = ev => {
    if (ev.key === 'Escape' || outClick.current === ev.target) history.push('/board')
  }

  const dateConvert = (time) => {
    return moment(time).fromNow();
  }

  return (
    card &&
    users && (
      <div className="modal-section" ref={outClick}>
        <div className="modal-container">
          <NavLink className="exit-btn" to="/board">
            X
          </NavLink>
          <SideBar card={card} />
          <div className="modal-title">
            <h3>{title}</h3>
            <p className="modal-subtitle">
              in list <span>{list.title}</span>
            </p>
          </div>
          <div className="members-container">
            {(members?.length > 0) && (
              <CardAvatars className="card-avatars" members={members}></CardAvatars>
            )}
          </div>
          {(labels?.length > 0) && (
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
            <Textarea desc={desc} updateCard={updateCard}></Textarea>
          </div>
          {checklist[0] && (
            <div className="checklists-container">
              {checklist.map((currChecklist, idx) => (
                <CardChecklists
                  key={idx}
                  cardChecklists={checklist}
                  checklist={currChecklist}
                  cardId={id}></CardChecklists>
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
    )
  )
}
