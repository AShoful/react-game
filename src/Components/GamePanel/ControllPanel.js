import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  Grid,
  Container,
  InputLabel,
  FormControl,
  Select,
  TextField,
  Button,
  ButtonGroup
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  controllPanel: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

const ControllPanel = ({
  option,
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
  const { isDisabled, buttonName } = mainState;
  return (
    <Container className={classes.controllPanel} maxWidth="md">
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
        <Grid item lg={6} xs={12}>
          <ButtonGroup fullWidth>
            <Button
              variant="contained"
              color="primary"
              onClick={() => start()}
              disabled={isDisabled || !valueInput || !valueSelect}
            >
              {buttonName}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
              disabled={!isDisabled}
            >
              Cansel
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Container>
  );
};

ControllPanel.propTypes = {
  option: PropTypes.shape({
    field: PropTypes.number,
    delay: PropTypes.number
  }),
  handleCancel: PropTypes.func,
  start: PropTypes.func,
  setMainState: PropTypes.func,
  mainState: PropTypes.shape({
    buttonName: PropTypes.string,
    isDisabled: PropTypes.bool,
    isPlay: PropTypes.bool,
    currentIndex: PropTypes.number,
    winner: PropTypes.string,
    currentOption: PropTypes.object,
    playerName: PropTypes.string
  })
};

ControllPanel.defaultProps = {
  option: PropTypes.shape({
    field: 3,
    delay: 2000
  }),
  handleCancel: () => {},
  start: () => {},
  setMainState: () => {},
  mainState: PropTypes.shape({
    buttonName: 'Play',
    isDisabled: false,
    isPlay: false,
    currentIndex: -1,
    winner: null,
    currentOption: { field: 5, delay: 2000 },
    playerName: 'player'
  })
};

export default ControllPanel;
