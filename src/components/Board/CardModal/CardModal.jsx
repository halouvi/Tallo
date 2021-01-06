import { Avatar } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { GET_BOARD_BY_ID, GET_BOARD_USER_BY_ID, GET_CARD_BY_ID, UPDATE_CARD } from '../../../store/board/BoardActions'
import { Textarea } from '../../Textarea/Textarea'
import { CardAvatars } from '../avatars/CardAvatars'
import { SideBar } from './SideBar/SideBar'

export const CardModal = props => {
  const { board, list, card } = useSelector(state => state.boardReducer)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(async () => {
    if (!board) await dispatch(GET_BOARD_BY_ID('5fe4b65432d4a24dbcb7afa2'))
    dispatch(GET_CARD_BY_ID(id))
  }, [id])

  const getMember = (memberId) => {
    const member = dispatch(GET_BOARD_USER_BY_ID(memberId));
    return member;
  }

  const updateCard = ({ field, value }) => {
    dispatch(UPDATE_CARD({ field, value, cardId: id }))
  }

  return (
    card && (
      <div className="modal-section">
        <div className="modal-container">
          <NavLink className="exit-btn" to="/board">
            X
          </NavLink>
          <SideBar card={card} />
          <div className="modal-title">
            <h3>{card.title}</h3>
            <p className="modal-subtitle">
              in list <span>{list.title}</span>
            </p>
          </div>
          <div className="members-container">
            <h4>MEMBERS</h4>
            <CardAvatars card={card}></CardAvatars>
          </div>
          <div className="desc-container">
            <h3>Description</h3>
            <Textarea desc={card.desc} updateCard={updateCard}></Textarea>
          </div>
          {card.attachments && card.attachments[0] && (
            <div className="attachments-container">
              <h3>Attachments</h3>
              <img src={card?.attachments[0]} alt="" />
            </div>
          )}
          <div className="activity-section">
            <h3>Activity</h3>
            <ul className="activity-container">
              {card.activity?.map((activity, idx) => (
                <li key={idx}>
                  <div className="activity-main">
                    <Avatar key={idx} alt={getMember(activity.createdBy).fullname} src={getMember(activity.createdBy).imgUrl ? getMember(activity.createdBy).imgUrl : '/'} />
                    <h3>{getMember(activity.createdBy).fullname}</h3>
                    <p>{activity.activity}</p>
                  </div>
                  <p>{activity.createdAt}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  )
}
