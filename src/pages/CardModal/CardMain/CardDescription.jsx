import { TextField } from '@material-ui/core'
import { img } from 'assets/img'


export const CardDescription = ({ desc, handleEdit = () => {} }) => {
  return (
    <div className="description fw grid tc-a1 g8">
      <img className="section-icon" src={img.description} alt="" />
      <h3 className="gc2">Description</h3>
      <TextField
        className="gc2"
        multiline
        placeholder="Add a more detailed description..."
        rows={4}
        variant="outlined"
        name="desc"
        value={desc}
        onChange={handleEdit}
      />
    </div>
  )
}
