import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Tooltip } from '@material-ui/core'
import { useToggle } from 'react-use'
import moment from 'moment'
import clock from 'assets/img/clock.svg'
import { usePopover } from 'components/Popover/Popover'
import { CardMenu } from 'components/Popover/PopoverCmps/Menus/CardMenu'
import { VideoPlayer } from 'components/VideoPlayer/VideoPlayer'
import { CardAvatars } from 'components/Avatars/CardAvatars'
import { Draggable } from 'react-beautiful-dnd'
import { GET_BY_ID } from 'store/board/BoardActions'
import { ReactSVG } from 'react-svg'

export const CardPreview = memo(({ card, idx }) => {
  const dispatch = useDispatch()

  const { labels: gLabels, users } = useSelector(state => state.boardReducer.board)
  const { _id: cardId, title, members, attachments, dueDate, labels, cardVideo } = card
  const activeMembers = users.filter(({ _id }) => members.includes(_id))
  const activeLabels = gLabels.filter(({ _id }) => labels.includes(_id))

  const { togglePopover } = usePopover()
  const cardInStore = useSelector(state => state.boardReducer.card)
  const toggleMenu = ev => {
    ev.avoidModal = true
    if (card !== cardInStore) dispatch(GET_BY_ID(card._id))
    togglePopover(ev, CardMenu)
  }

  const history = useHistory()
  const openModal = ev => {
    if (ev.avoidModal) return
    history.push(`/board/card/${cardId}`)
  }

  const [menuBtnHovered, setMenuBtnHovered] = useToggle(false)

  const classPicker = ({ isDragging, isDropAnimating, draggingOver }) => {
    return menuBtnHovered
      ? ' menu-btn-hovered'
      : isDropAnimating && draggingOver === 'TRASH'
      ? ' trashing'
      : isDropAnimating
      ? ' dropping'
      : isDragging
      ? ' dragging'
      : ''
  }

  return (
    <Draggable draggableId={cardId} index={idx}>
      {({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
        <div
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          className={`card-preview flex col gb8 sbl`}>
          <div
            onClick={openModal}
            className={`card-container white flex col p8 gb8 sbl rel shdw2
            ${classPicker(snapshot)}`}>
            <div className="flex jb ac">
              <span className="title">{title}</span>
              <Button
                anchorid={cardId}
                size="small"
                onMouseEnter={() => setMenuBtnHovered(true)}
                onMouseLeave={() => setMenuBtnHovered(false)}
                onClick={toggleMenu}>
                ···
              </Button>
            </div>
            {cardVideo && <VideoPlayer videoUrl={cardVideo} isGrouped={true} />}
            {attachments[0] && (
              <div className="attachments">
                <img src={attachments[0]} alt="" />
              </div>
            )}
            {activeLabels[0] && (
              <div className="labels flex">
                {activeLabels.map(label => (
                  <Tooltip title={label.title} key={label._id}>
                    <div className={`label ${label.color}`} />
                  </Tooltip>
                ))}
              </div>
            )}
            {(!!dueDate || !!activeMembers[0]) && (
              <div className="grid tc-a1a">
                {!!dueDate && (
                  <div className="gc1 due-date flex ac">
                    <ReactSVG src={clock} className="svg icon small mr2" />
                    <p>{moment(dueDate).format('MMM Do')}</p>
                  </div>
                )}
                {activeMembers[0] && <CardAvatars className="gc3" max={4} users={activeMembers} />}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
})
