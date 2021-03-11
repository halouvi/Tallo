import { useDragLayer } from 'react-dnd'
import { List } from '../Board/List/List'
import { CardPreview } from '../Board/CardPreview/CardPreview'

export const DragLayer = () => {
  const [{ type, list, card, width, height }, { x, y }] = useDragLayer(monitor => [
    monitor.getItem() || {},
    monitor.getSourceClientOffset() || {}
  ])

  return (
    <div
      className={`drag-layer${type ? ' dragging ' + type : ''}`}
      style={{
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`
      }}>
      {type === 'list' && <List list={list} isDragLayer={true} />}
      {type === 'card' && <CardPreview card={card} isDragLayer={true} />}
    </div>
  )
}
