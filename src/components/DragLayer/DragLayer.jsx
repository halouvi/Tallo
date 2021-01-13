import { useEffect } from 'react'
import { useDragLayer } from 'react-dnd'
import { Card } from '../Board/Card/Card'
import { List } from '../Board/List/List'

export const DragLayer = () => {
  const { item, pos } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    pos: monitor.getSourceClientOffset(),
  }))
  
  const { type, list, sourceListId, width, height, card } = item || {}

  return (
    item &&
    !!pos && (
      <div
        className="is-dragging"
        style={{
          position: 'absolute',
          top: `${pos.y}px`,
          left: `${pos.x}px`,
          width: `${width}px`,
          height: `${height}px`,
          transform: 'rotate(3deg)',
          zIndex: 10,
        }}>
        {type === 'CARD' && <Card card={card} listId={sourceListId} />}
        {type === 'LIST' && <List list={list} />}
      </div>
    )
  )
}
