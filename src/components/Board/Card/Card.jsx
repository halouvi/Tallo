import { useLayoutEffect } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UPDATE_DRAG_LAYER } from '../../../store/board/BoardActions'
import { CardAvatars } from '../avatars/CardAvatars'

export const Card = ({ card, listId, handleDrop }) => {
  const gLabels = useSelector(state => state.boardReducer.board.labels)
  const { _id, title, attachments, members, desc, dueDate, labels } = card || {}
  const [placeholderPos, setPlaceholderPos] = useState(null)
  var thisCardDimensions = useRef({})
  const heightRef = useRef(null)
  const history = useHistory()

  const onOpenModal = () => history.push(`/board/modal/${_id}`)

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'Card' },
    begin: () => ({
      type: 'Card',
      sourceListId: listId,
      sourceCardId: _id,
      dimensions: heightRef.current.getBoundingClientRect(),
      card,
      handleDrop,
    }),
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  })

  const [{ isOver, hoveringCardHeight }, drop] = useDrop({
    accept: 'Card',
    drop: item => handleDrop({ item, targetListId: listId, targetCardId: _id, placeholderPos }),
    hover: (item, monitor) => handleDragOver(monitor.getClientOffset().y),
    collect: monitor => ({
      isOver: !!monitor.isOver() && monitor.getItem().sourceCardId !== _id,
      hoveringCardHeight: monitor.getItem()?.dimensions.height,
    }),
  })

  const handleDragOver = offsetY => {
    const { top, height } = heightRef.current.getBoundingClientRect()
    setPlaceholderPos(top + height / 2 > offsetY ? 0 : 1)
  }

  return (
    <div ref={drop} className={`card-drop-container${isDragging ? ' hidden' : ''}`}>
      <div ref={heightRef} className="height-ref">
        <div
          // className={isOver ? 'fast' : ''}
          style={{ height: isOver && !placeholderPos ? `${hoveringCardHeight}px` : '0px' }}
        />
        <div ref={drag} className="card-preview fast">
          <div onClick={onOpenModal} className={`container`}>
            <div className="card-title">{title}</div>
            {attachments[0] ? <img src={attachments[0]} alt="" /> : ''}
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
        <div
          // className={isOver ? 'fast' : ''}
          style={{ height: isOver && placeholderPos ? `${hoveringCardHeight}px` : '0px' }}
        />
      </div>
    </div>
  )
}
