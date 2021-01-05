import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));

export const Textarea = ({ desc, onSaveDesc }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    useEffect(() => {
        setValue(desc)
    }, [desc])


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => onSaveDesc(event, value)}>
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        placeholder="Add a more detailed description..."
                        rows={4}
                        variant="outlined"
                        value={value}
                        onChange={handleChange}
                        name="desc"
                    />
                </div>
                <div className="btns-container"><button >Save</button> <button>X</button></div>
            </form>
            {/* <div className="btns-container"><button onClick={() => { onSaveDesc(value) }} >Save</button> <button>X</button></div> */}
        </>
    );
}