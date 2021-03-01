import { useDragLayer } from 'react-dnd'
import { List } from '../Board/List/List'
import { CardPreview } from '../Board/CardPreview/CardPreview'

export const DragLayer = () => {
  const { item, pos } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    pos: monitor.getSourceClientOffset()
  }))

  const { type, list, card, width, height } = item || {}

  return (
    item &&
    !!pos && (
      <div
        className={`drag-layer ${type}`}
        style={{
          top: `${pos.y}px`,
          left: `${pos.x}px`,
          width: `${width}px`,
          height: `${height}px`
        }}>
        {type === 'LIST' && <List list={list} isDragLayer={true}/>}
        {type === 'CARD' && <CardPreview card={card} isDragLayer={true}/>}
      </div>
    )
  )
}
