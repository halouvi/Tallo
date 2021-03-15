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
      .querySelectorAll('.card-preview')
      .forEach(el => el.classList.toggle('cancel-pointer', width ? true : false))
  }, [width])

  return (
    <div
      className={`drag-layer${width ? ' dragging ' : ''}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        top: `${Math.round(y)}px`,
        left: `${Math.round(x)}px`
      }}>
      {list && <List list={list} />}
      {card && <CardPreview card={card} />}
    </div>
  )
})
