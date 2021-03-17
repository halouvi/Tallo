import { memo, useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Tooltip } from '@material-ui/core'
import { useToggle } from 'react-use'
import moment from 'moment'
import { useRect } from 'react-use-rect'
import clock from 'assets/clock.svg'
import { GET_BY_ID, HANDLE_DROP } from 'store/board/BoardActions'
import { usePopover } from 'components/Popover/Popover'
import { CardMenu } from 'components/Popover/PopoverCmps/Menus/CardMenu'
import { VideoPlayer } from 'components/VideoPlayer/VideoPlayer'
import { CardAvatars } from 'components/Avatars/CardAvatars'
import { Draggable } from 'react-beautiful-dnd'

export const CardPreview = memo(({ card, idx }) => {
  const dispatch = useDispatch()

  const { users, labels: gLabels } = useSelector(state => state.boardReducer.board)
  const { _id: cardId, title, attachments, desc, dueDate, labels, cardVideo } = card
  const members = users.filter(({ _id }) => card.members.includes(_id))

  const [{ width, height, top }, rectRef] = useRect()

  // const [isDragging, drag] = useDrag({
  //   collect: mon => mon.isDragging(),
  //   item: { type: 'CARD', sourceId: cardId, card, height, width }
  // })

  // const [[hovHeight, hovPos], drop] = useDrop({
  //   accept: !isDragLayer ? 'CARD' : '',
  //   collect: mon => [
  //     mon.isOver() && mon.getItem().height,
  //     mon.isOver() && top + height / 2 > mon.getClientOffset().y ? 0 : 1
  //   ],
  //   drop: item => dispatch(HANDLE_DROP({ ...item, hovPos, targetId: cardId }))
  // })

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
            className={`card-container white flex col p12 gb8 sbl rel shdw2
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
            {/* <span className="desc fw">{desc}</span> */}
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
                      <Tooltip title={gLabel.title} key={gLabel._id}>
                        <div className={`label ${gLabel.color}`} />
                      </Tooltip>
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
                {members[0] && <CardAvatars className="gc3" max={4} users={members} />}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
})
