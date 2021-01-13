import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CardAvatars } from '../avatars/CardAvatars'

export const Card = ({ card, handleDrop }) => {
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const { _id, title, attachments, members, desc, dueDate, labels } = card || {}
  const [placeholderPos, setPlaceholderPos] = useState(null)
  const rectRef = useRef(null)
  const history = useHistory()

  const onOpenModal = () => history.push(`/board/modal/${_id}`)

  const [{ isDragging }, drag] = useDrag({
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
    item: { type: 'CARD' },
    begin: () => {
      const { height, width } = rectRef.current.getBoundingClientRect()
      return {
        type: 'CARD',
        card,
        sourceCardId: _id,
        height,
        width,
      }
    },
  })

  const [{ cardOver, hoverHeight }, drop] = useDrop({
    accept: 'CARD',
    hover: (item, monitor) => handleDragOver(monitor.getClientOffset().y),
    collect: monitor => ({
      cardOver: !!monitor.isOver() && monitor.getItem().sourceCardId !== _id,
      hoverHeight: monitor.getItem()?.height,
    }),
    drop: item => {
      handleDrop && handleDrop({ item, targetCardId: _id, placeholderPos })
    },
  })

  const handleDragOver = offsetY => {
    const { top, height } = rectRef.current.getBoundingClientRect()
    setPlaceholderPos(top + height / 2 > offsetY ? 0 : 1)
  }

  return (
    <div ref={drop} className={`card-drop-container${isDragging ? ' hidden' : ''}`}>
      <div ref={rectRef} className="rect-ref">
        {cardOver && !placeholderPos && (
          <div className="placeholder top" style={{ height: `${hoverHeight}px` }} />
        )}
        <div ref={drag} className="card-preview fast">
          <div onClick={onOpenModal} className={`container`}>
            <div className="card-title">{title}</div>
            <div>{attachments[0] ? <img src={attachments[0]} alt="" /> : ''}</div>
            <p className="card-desc">{desc}</p>
            <div className="labels-section">
              {labels[0] &&
                gLabels.map(
                  gLabel =>
                    labels.some(label => label === gLabel._id) && (
                      <div className={`label ${gLabel.color}`} key={gLabel._id}></div>
                    )
                )}
            </div>
            <div className="bottom-section">
              {dueDate && (
                <div className="due-date">
                  <img
                    src="https://res.cloudinary.com/ariecloud/image/upload/v1610026807/tallo/clock-circular-outline_rdwoyz.svg"
                    alt=""
                  />
                  <p>{new Date(dueDate).toDateString()}</p>
                </div>
              )}
              {!dueDate && <div></div>}
              {members[0] && <CardAvatars members={members}></CardAvatars>}
            </div>
          </div>
        </div>
        {cardOver && !!placeholderPos && (
          <div className="placeholder bottom" style={{ height: `${hoverHeight}px` }} />
        )}
      </div>
    </div>
  )
}
