import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CardAvatars } from '../../Avatars/CardAvatars'
import { CardMenu } from '../../Popover/PopoverCmps/Menus/CardMenu'
import clock from '../../../assets/clock.svg'
import { GET_BY_ID, HANDLE_DROP } from '../../../store/board/BoardActions'
import { VideoPlayer } from '../../VideoPlayer/VideoPlayer'
import { Button } from '@material-ui/core'
import { useToggle } from 'react-use'
import { usePopover } from '../../Popover/Popover'

export const CardPreview = ({ card, isDragLayer }) => {
  const dispatch = useDispatch()

  const { users, labels: gLabels } = useSelector(state => state.boardReducer.board)
  const { _id: cardId, title, attachments, desc, dueDate, labels, cardVideo } = card
  const members = users.filter(({ _id }) => card.members.includes(_id))

  const rectRef = useRef()
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

  const togglePopover = usePopover()

  const openMenu = ev => {
    ev.avoidModal = true
    dispatch(GET_BY_ID(cardId))
    togglePopover(ev, CardMenu)
  }

  const history = useHistory()
  const openModal = ev => {
    if (ev.avoidModal) return
    history.push(`/board/modal/${cardId}`)
  }

  const [menuBtnHovered, setMenuBtnHovered] = useToggle(false)
  return (
    <div
      ref={!isDragLayer ? drop : null}
      className={`card-drop-container${isDragging ? ' hidden' : ''}`}>
      <div ref={rectRef} className="rect-ref">
        {!!hoverHeight && !posOffset && (
          <div className="placeholder top" style={{ height: `${hoverHeight}px` }} />
        )}
        <div ref={!isDragLayer ? drag : null} className="card-preview flex col fast gb8 sbl shdw2">
          <div
            onClick={openModal}
            className={`container white flex col p12 gb8 sbl rel${
              menuBtnHovered ? ' menu-btn-hovered' : ''
            }`}>
            <div className="flex jb ac">
              <span className="title">{title}</span>
              <Button
                size="small"
                className=""
                onMouseEnter={() => setMenuBtnHovered(true)}
                onMouseLeave={() => setMenuBtnHovered(false)}
                onClick={openMenu}>
                ···
              </Button>
            </div>
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
                      <div className={`label ${gLabel.color}`} key={gLabel._id} />
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
    </div>
  )
}
