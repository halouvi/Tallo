import { Avatar } from '@material-ui/core'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { GET_BOARD_BY_ID, GET_CARD_BY_ID, UPDATE_CARD } from '../../../store/board/BoardActions'
import { Textarea } from '../../Textarea/Textarea'
import { CardAvatars } from '../avatars/CardAvatars'
import { SideBar } from './SideBar/SideBar'

export const CardModal = props => {
  const { board, list, card, users } = useSelector(state => state.boardReducer) || {}
  const { activity, title, attachments, members, desc, labels } = card || {}
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(async () => {
    if (!board) await dispatch(GET_BOARD_BY_ID('5fe4b65432d4a24dbcb7afa2'))
    dispatch(GET_CARD_BY_ID(id))
  }, [id])

  const updateCard = ({ field, value }) => {
    dispatch(UPDATE_CARD({ field, value, cardId: id }))
  }
  return (
    card &&
    users && (
      <div className="modal-section">
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
            {members && members[0] && (
              <CardAvatars className="card-avatars" members={members}></CardAvatars>
            )}
          </div>
          {card?.labels[0] && (
            <div className="labels-section">
              <h3>Labels</h3>
              <div className="labels-container">
                {board.labels.map(
                  ({ _id, color, name }) =>
                    labels.some(label => label === _id) && (
                      <div className="label-container" key={_id}>
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
          {attachments.length && (
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
                        <Avatar key={createdAt} alt={fullname} src={imgUrl ? imgUrl : '/'} />
                        <h3>{fullname}</h3>
                        <p>{activity}</p>
                      </div>
                      <p>{createdAt}</p>
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
