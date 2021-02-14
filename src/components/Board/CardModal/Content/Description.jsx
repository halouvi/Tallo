import { TextField } from '@material-ui/core'

export const Description = ({ desc, handleEdit = () => {} }) => {
  return (
    <div className="description fw grid tc-a1 g8">
      <img className="icon gc1" src={process.env.PUBLIC_URL + `/Description.png`} alt="" />
      <h3 className="icon gc2">Description</h3>
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
