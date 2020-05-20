/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  Grid,
  Container,
  InputLabel,
  FormControl,
  Select,
  TextField,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  controllPanel: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

const ControllPanel = ({
  option,
  isDisabled,
  buttonName,
  handleCancel,
  start,
  setMainState,
  mainState
}) => {
  const classes = useStyles();
  const [valueSelect, setValueSelect] = useState('');
  const [valueInput, setValueInput] = useState('');

  const handleSelect = (e) => {
    const obj = e.target.value;
    setValueSelect(obj);
    setMainState({ ...mainState, currentOption: obj });
  };

  const handleInput = (e) => {
    const str = e.target.value;
    setValueInput(str);
    setMainState({ ...mainState, playerName: str });
  };

  return (
    <Container className={classes.controllPanel}>
      <Grid container justify="space-between" spacing={2}>
        <Grid item lg={3} xs={6}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Check level</InputLabel>
            <Select
              labelId="select-label"
              id="select-label"
              value={valueSelect}
              onChange={(e) => handleSelect(e)}
            >
              <MenuItem value="Check game's level" />
              {option &&
                Object.entries(option).map((item) => (
                  <MenuItem value={item[1]} key={item[0]}>
                    {item[0]}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3} xs={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Your name"
            value={valueInput}
            onChange={(e) => handleInput(e)}
          />
        </Grid>
        <Grid item lg={3} xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => start()}
            disabled={isDisabled || !valueInput || !valueSelect}
          >
            {buttonName}
          </Button>
        </Grid>
        <Grid item lg={3} xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleCancel}
          >
            Cansel
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ControllPanel;
