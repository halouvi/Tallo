import { useDragLayer } from 'react-dnd'
import { memo } from 'react'
import { useUpdateEffect } from 'react-use'
import { List } from 'components/Board/List/List'
import { CardPreview } from 'components/Board/CardPreview/CardPreview'

export const DragLayer = memo(() => {
  const [{ list, card, width, height }, { x, y }] = useDragLayer(mon => [
    mon.getItem() || {},
    mon.getSourceClientOffset() || {}
  ])

  useUpdateEffect(() => {
    document
      .querySelectorAll(`.list-drop-container *:not(.card-drop-contsainer)`)
      .forEach(el => el.classList.toggle('no-hover', width ? true : false))
  }, [width])

  return (
    <div
      className={`drag-layer${width ? ' dragging ' : ''}`}
      style={{
        width: `${width || 0}px`,
        height: `${height || 0}px`,
        top: `${Math.round(y || 0)}px`,
        left: `${Math.round(x || 0)}px`,
        pointerEvents: 'none'
      }}>
      {list && <List list={list} isDragLayer={true} />}
      {card && <CardPreview card={card} isDragLayer={true} />}
    </div>
  )
})
