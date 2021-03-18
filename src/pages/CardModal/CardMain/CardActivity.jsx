import { CardAvatar } from '../../../components/Avatars/CardAvatar'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Fragment } from 'react'
import { img } from 'assets/img'


export const CardActivity = ({ activity }) => {
  const users = useSelector(state => state.boardReducer.board.users)
  // The activity array contains only the user Id (createdBy)
  // Here we get his name and image from the global users array
  const activityWithUserData = activity.map(item => ({
    ...item,
    ...users.find(({ _id }) => _id === item.createdBy)
  }))

  const isSameUserAsPrev = idx =>
    !idx || activity[idx]._id !== activity[idx - 1]._id ? false : true

  return (
    <div className="activity fw grid tc-aaaa1 g8">
      <img className="section-icon" src={img.activity} alt="" />
      <h3 className="gc2-6">Activity</h3>
      {activityWithUserData.slice(0, 10).map((item, idx) => (
        <Fragment key={item.createdAt}>
          {!isSameUserAsPrev(idx) && (
            <>
              <CardAvatar className="gc2" user={item} size="small" />
              <h4 className="gc3-6 asc">{item.name} :</h4>
            </>
          )}
          <span className="gc2-4">{item.activity}</span>
          <h5 className="gc5">{moment(item.createdAt).fromNow()}</h5>
        </Fragment>
      ))}
    </div>
  )
}
