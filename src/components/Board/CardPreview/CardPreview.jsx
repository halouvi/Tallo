import { memo, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { useToggle } from 'react-use'
import moment from 'moment'
import { useRect } from 'react-use-rect'
import clock from 'assets/clock.svg'
import { GET_BY_ID, HANDLE_DROP } from 'store/board/BoardActions'
import { usePopover } from 'components/Popover/Popover'
import { CardMenu } from 'components/Popover/PopoverCmps/Menus/CardMenu'
import { VideoPlayer } from 'components/VideoPlayer/VideoPlayer'
import { CardAvatars } from 'components/Avatars/CardAvatars'

export const CardPreview = memo(({ card }) => {
  const dispatch = useDispatch()

  const { users, labels: gLabels } = useSelector(state => state.boardReducer.board)
  const { _id: cardId, title, attachments, desc, dueDate, labels, cardVideo } = card
  const members = users.filter(({ _id }) => card.members.includes(_id))

  const [{ width, height, top }, rectRef] = useRect()

  const [isDragging, drag] = useDrag({
    collect: mon => mon.isDragging(),
    item: { type: 'card', sourceId: cardId, card, height, width }
  })

  const [hovPos, setHovPos] = useState(0)
  const [hovHeight, drop] = useDrop({
    accept: 'card',
    collect: mon => mon.isOver({ shallow: true }) && mon.getItem().height,
    hover: (_, mon) => hovHeight && setHovPos(top + height / 2 > mon.getClientOffset().y ? 0 : 1),
    drop: item => dispatch(HANDLE_DROP({ ...item, hovPos, targetId: cardId }))
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
    <div ref={drop} className={`card-drop-container${isDragging ? ' hidden' : ''}`}>
      <div ref={rectRef} className="rect-ref flex col">
        {hovHeight && (
          <div
            className="card-placeholder"
            style={{
              height: `${hovHeight}px`,
              order: hovPos,
              paddingTop: `${hovPos * 6}px`
            }}
          />
        )}
        <div ref={drag} className="card-preview flex col fast gb8 sbl shdw2">
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
                {members[0] && <CardAvatars className="gc3" max={4} users={members} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})
