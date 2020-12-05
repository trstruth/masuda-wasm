import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const methods = [
    {
        value: '1',
        label: 'Method 1',
    },
    {
        value: '2',
        label: 'Method 2',
    },
    {
        value: '4',
        label: 'Method 4',
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const SearchForm = (props) => {
    const classes = useStyles();

    const handleMethodChange = (event) => {
        props.setMethod(event.target.value);
    };

    const handleNumFramesChange = (event) => {
        props.setNumFrames(event.target.value);
    };

    return (
        <form className={classes.Root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="method"
                    select
                    label="Method"
                    value={props.method}
                    onChange={handleMethodChange}
                >
                    {methods.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="numFrames"
                    type="number"
                    label="max frames"
                    value={props.numFrames}
                    onChange={handleNumFramesChange}
                />
            </div>
        </form>
    )
};

export default SearchForm;