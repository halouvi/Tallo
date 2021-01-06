import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}))

export const Textarea = ({ desc, updateCard }) => {
  const classes = useStyles()
  const [value, setValue] = useState(desc)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    setValue(desc)
  }, [desc])

  useEffect(() => {
    if (value !== desc) {
      clearTimeout(timer)
      setTimer(
        setTimeout(() => {
          updateCard({ field: 'desc', value })
        }, 500)
      )
    }
  }, [value])

  return (
    <>
      {/* <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => onSaveDesc(event, value)}> */}
      {/* <div> */}
      <TextField
        id="outlined-multiline-static"
        multiline
        placeholder="Add a more detailed description..."
        rows={4}
        variant="outlined"
        value={value}
        onFocus={(ev => console.log(ev))}
        onChange={ev => setValue(ev.target.value)}
        name="desc"
      />
      {/* </div> */}
      {/* <div className="btns-container"><button >Save</button> <button>X</button></div> */}
      {/* </form> */}
      {/* <div className="btns-container"><button onClick={() => { onSaveDesc(value) }} >Save</button> <button>X</button></div> */}
    </>
  )
}
