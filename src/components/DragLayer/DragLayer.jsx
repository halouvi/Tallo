import { useDragLayer } from 'react-dnd'
import { Card } from '../Board/Card/Card'
import { List } from '../Board/List/List'

export const DragLayer = () => {
  const { item, init, diff } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    init: monitor.getInitialSourceClientOffset(),
    diff: monitor.getDifferenceFromInitialOffset(),
  }))
  const { type, list, sourceListId, dimensions, card, handleDrop } = item || {}

  return (
    item &&
    init && (
      <div
        className="is-dragging"
        style={{
          position: 'absolute',
          top: `${init.y + diff.y || 0}px`,
          left: `${init.x + diff.x || 0}px`,
          width: `${dimensions?.width}px`,
          transform: 'rotate(3deg)',
        }}>
        {type === 'Card' && <Card card={card} listId={sourceListId} />}
        {type === 'List' && <List list={list} />}
      </div>
    )
  )
}
