/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: theme.spacing(2)
  },
  select: {
    marginTop: theme.spacing(2),
    minWidth: 220
  },
  botton: {
    display: 'inline-block',
    minWidth: 120
  }
}));

const ControllPanel = ({
  option,
  isDisabled,
  buttonName,
  handleCancel,
  start
}) => {
  const classes = useStyles();
  const [valueSelect, setValueSelect] = useState('');
  const [valueInput, setValueInput] = useState('');

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-label">Check game's level</InputLabel>
      <Select
        className={classes.select}
        labelId="select-label"
        id="select-label"
        value={valueSelect}
        onChange={(e) => setValueSelect(e.target.value)}
      >
        <MenuItem value="Check game's level" />
        {option &&
          Object.entries(option).map((item) => (
            <MenuItem value={item[1]} key={item[0]}>
              {item[0]}
            </MenuItem>
          ))}
      </Select>
      <TextField
        id="standard-basic"
        label="Enter your name"
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => start(valueSelect, valueInput)}
        disabled={isDisabled}
      >
        {buttonName}
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={handleCancel}
      >
        Cansel
      </Button>
    </FormControl>
  );
};

export default ControllPanel;
