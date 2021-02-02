import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CardAvatars } from '../avatars/CardAvatars'
import { CardMenu } from './CardMenu/CardMenu'
import clock from '../../../assets/clock.svg'

export const Card = ({ card, list, handleDrop, togglePopover }) => {
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const { _id: cardId, title, attachments, members, desc, dueDate, labels, cardVideo } = card || {}
  const [posOffset, setPosOffset] = useState(0)
  const rectRef = useRef(null)
  const history = useHistory()

  const [{ isDragging }, drag] = useDrag({
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
    item: { type: 'CARD' },
    begin: () => {
      const { height, width } = rectRef.current.getBoundingClientRect()
      return {
        type: 'CARD',
        card,
        sourceCardId: cardId,
        sourceListId: list._id,
        height,
        width
      }
    }
  })

  const [{ cardOver, hoverHeight }, drop] = useDrop({
    accept: 'CARD',
    hover: (item, monitor) => {
      const { top, height } = rectRef.current.getBoundingClientRect()
      setPosOffset(top + height / 2 > monitor.getClientOffset().y ? 0 : 1)
    },
    collect: monitor => ({
      cardOver: monitor.isOver() && monitor.getItem().sourceCardId !== cardId,
      hoverHeight: monitor.getItem()?.height
    }),
    drop: item => {
      // handleDrop is not passed as prop when this instance is the drag layer to prevent this instance from accepting itself.
      handleDrop && handleDrop({ ...item, targetCardId: cardId, targetListId: list._id, posOffset })
    }
  })

  const openModal = () => history.push(`/board/modal/${cardId}`)

  const openMenu = ev => togglePopover(ev, CardMenu, cardId, rectRef.current)

  return (
    <div ref={drop} className={`card-drop-container${isDragging ? ' hidden' : ''}`}>
      <div ref={rectRef} className="rect-ref">
        {cardOver && !posOffset && (
          <div className="placeholder top" style={{ height: `${hoverHeight}px` }} />
        )}
        <div ref={drag} className="card-preview flex col fast m8 sbl">
          <div onClick={openModal} className={`container f-110 flex col m8 sbl`}>
            <span className="title">{title}</span>
            <button className="menu-btn" onClick={openMenu}>
              ···
            </button>
            <span className="desc fw">{desc}</span>
            {cardVideo && !attachments[0] && (
              <video controls>
                <source src={cardVideo} />
              </video>
            )}
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
                {members[0] && <CardAvatars members={members} />}
              </div>
            )}
          </div>
        </div>
        {cardOver && !!posOffset && (
          <div className="placeholder bottom" style={{ height: `${hoverHeight}px` }} />
        )}
      </div>
    </div>
  )
}
