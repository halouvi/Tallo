import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CardAvatars } from '../avatars/CardAvatars'
import { CardMenu } from './CardMenu/CardMenu'
import clock from '../../../assets/clock.svg'
import { HANDLE_DROP } from '../../../store/board/BoardActions'
import { Popover } from '@material-ui/core'
import { VideoPlayer } from '../ReUsables/VideoPlayer/VideoPlayer'

export const Card = ({ card, isDragLayer }) => {
  const { users, labels: gLabels } = useSelector(state => state.boardReducer.board)
  const { _id: cardId, title, attachments, desc, dueDate, labels, cardVideo } = card
  const members = users.filter(({ _id }) => card.members.includes(_id))
  const [anchorEl, setAnchorEl] = useState(null)
  const rectRef = useRef()
  const history = useHistory()
  const dispatch = useDispatch()

  const [isDragging, drag] = useDrag({
    collect: monitor => monitor.isDragging(),
    item: { type: 'CARD' },
    begin: () => {
      const { height, width } = rectRef.current.getBoundingClientRect()
      return {
        type: 'CARD',
        sourceId: cardId,
        card,
        height,
        width
      }
    }
  })

  const [{ hoverHeight, posOffset }, drop] = useDrop({
    accept: 'CARD',
    collect: monitor => {
      if (monitor.isOver()) {
        const { top, height } = rectRef.current.getBoundingClientRect()
        const mouseY = monitor.getClientOffset().y
        return {
          posOffset: top + height / 2 > mouseY ? 0 : 1,
          hoverHeight: monitor.getItem().height
        }
      } else return {}
    },
    drop: item => dispatch(HANDLE_DROP({ ...item, posOffset, targetId: cardId }))
  })

  const openModal = () => history.push(`/board/modal/${cardId}`)

  const togglePopover = ev => {
    ev.stopPropagation()
    setAnchorEl(ev.target)
  }

  return (
    <div
      ref={!isDragLayer ? drop : null}
      className={`card-drop-container${isDragging ? ' hidden' : ''}`}>
      <div ref={rectRef} className="rect-ref">
        {!!hoverHeight && !posOffset && (
          <div className="placeholder top" style={{ height: `${hoverHeight}px` }} />
        )}
        <div ref={!isDragLayer ? drag : null} className="card-preview flex col fast gb8 sbl">
          <div onClick={openModal} className={`container f-110 flex col gb8 sbl`}>
            <span className="title">{title}</span>
            <button className="menu-btn" onClick={togglePopover}>
              ···
            </button>
            <span className="desc fw">{desc}</span>
            {cardVideo && <VideoPlayer videoUrl={cardVideo} isGrouped={true} />}
            {attachments[0] && (
              <div className="attachments">
                <img src={attachments[0]} alt="" />
              </div>
            )}
            {labels[0] && (
              <div className="labels flex">
                {gLabels.map(
                  gLabel =>
                    labels.some(label => label === gLabel._id) && (
                      <div className={`label ${gLabel.color}`} key={gLabel._id}></div>
                    )
                )}
              </div>
            )}
            {(!!dueDate || !!members[0]) && (
              <div className="flex jb">
                {!!dueDate && (
                  <div className="due-date flex ac">
                    <img src={clock} alt="" />
                    <p>{new Date(dueDate).toDateString()}</p>
                  </div>
                )}
                <div className="spacer" />
                {members[0] && <CardAvatars max={4} users={members} />}
              </div>
            )}
          </div>
        </div>
        {!!hoverHeight && !!posOffset && (
          <div className="placeholder bottom" style={{ height: `${hoverHeight}px` }} />
        )}
      </div>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <CardMenu card={card} setAnchorEl={setAnchorEl} />
      </Popover>
    </div>
  )
}
