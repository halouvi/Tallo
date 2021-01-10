import { useDragLayer } from 'react-dnd'
import { Card } from '../Board/Card/Card'
// import { List } from '../Board/List/List'

export const DragLayer = () => {
  const { item, init, diff } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    init: monitor.getInitialSourceClientOffset(),
    diff: monitor.getDifferenceFromInitialOffset(),
  }))

  return (
    item &&
    init && (
      <div
        className="is-dragging"
        style={{
          position: 'absolute',
          top: `${init.y + diff.y || 0}px`,
          left: `${init.x + diff.x || 0}px`,
          width: `${item.dimensions.width}px`,
          transform: 'rotate(5deg)',
        }}>
        {<Card card={item.card} listId={item.sourceListId} handleDrop={item.handleDrop} />}
        {/* {item?.type === 'List' && <List list={item.list}/>} */}
      </div>
    )
  )
}
