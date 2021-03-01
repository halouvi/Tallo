import { Button } from '@material-ui/core'

export const ColorPicker = ({ className = '', onClick = () => {}, selected = '' }) => {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'black']

  return (
    <div className={`${className} grid g6 tc4`}>
      {colors.map(color => (
        <Button
          size="large"
          key={color}
          name="color"
          value={color}
          onClick={onClick}
          className={`${color}${selected === color ? ' selected' : ''}`}
        />
      ))}
    </div>
  )
}
