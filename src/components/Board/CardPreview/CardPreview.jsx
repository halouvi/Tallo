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
import moment from 'moment'

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
        overListId: '',
        card,
        height,
        width
      }
    }
  })

  const [{ hoverHeight = 0, posOffset = 0 }, drop] = useDrop({
    accept: !isDragLayer ? 'CARD' : '',
    hover: item => (item.overListId = ''),
    collect: monitor => {
      if (!monitor.isOver()) return {}
      else {
        const { top, height } = rectRef.current.getBoundingClientRect()
        const mouseY = monitor.getClientOffset().y
        return {
          posOffset: top + height / 2 > mouseY ? 0 : 1,
          hoverHeight: monitor.getItem().height
        }
      }
    },
    drop: item => dispatch(HANDLE_DROP({ ...item, posOffset, targetId: cardId }))
  })

  const togglePopover = usePopover()

  const cardInStore = useSelector(state => state.boardReducer.card)
  const toggleMenu = ev => {
    ev.avoidModal = true
    if (card !== cardInStore) dispatch(GET_BY_ID(card._id))
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
          <div className="card-placeholder top" style={{ height: `${hoverHeight}px` }} />
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
                onClick={toggleMenu}>
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
              <div className="grid tc-a1a">
                {!!dueDate && (
                  <div className="gc1 due-date flex ac">
                    <img src={clock} alt="" />
                    <p>{moment(dueDate).format('ddd, MMM do')}</p>
                  </div>
                )}
                {members[0] && (
                  <CardAvatars className="gc3" max={4} users={members} isDragLayer={isDragLayer} />
                )}
              </div>
            )}
          </div>
        </div>
        {!!hoverHeight && !!posOffset && (
          <div className="card-placeholder bottom" style={{ height: `${hoverHeight}px` }} />
        )}
      </div>
    </div>
  )
}
