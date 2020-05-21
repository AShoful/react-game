/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import gameApi from '../../api';

import { cells } from './functions';

import FildGame from './FildGame';
import ControllPanel from './ControllPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    margin: 0,
    padding: 0
  },
  winner: {
    marginTop: '10%',
    position: 'absolute',
    zIndex: 10,
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

function GamePanel() {
  const [mainState, setMainState] = useState({
    buttonName: 'Play',
    isDisabled: false,
    isPlay: false,
    currentIndex: -1,
    winner: null,
    currentOption: { field: 5, delay: 2000 },
    playerName: 'player'
  });
  const [option, setOption] = useState(null);
  const intervalRef = useRef(null);
  const { field, delay } = mainState.currentOption;
  const onInterval = (go) => {
    intervalRef.current = setInterval(go, delay);
  };

  const classes = useStyles();

  const generateRandomIndex = (arr) => {
    if (!Array.isArray(arr)) {
      return;
    }
    if (mainState.currentIndex !== -1) {
      setMainState({ ...mainState, currentIndex: -1, winner: null });
    }
    setMainState({ ...mainState, isDisabled: true, winner: null });
    let count = 0;
    onInterval(() => {
      setMainState((mainState) => ({ ...mainState, currentIndex: arr[count] }));
      count += 1;
    });
  };

  useEffect(() => {
    gameApi
      .get()
      .then((res) => setOption(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if (mainState.winner) {
      clearInterval(intervalRef.current);
      setMainState((mainState) => ({
        ...mainState,
        buttonName: 'Play again',
        isDisabled: false,
        isPlay: false
      }));
    }
  }, [mainState.winner]);

  useEffect(() => {
    if (mainState.isPlay) {
      generateRandomIndex(cells(field ** 2));
    }
    return () => clearInterval(intervalRef.current);
  }, [mainState.isPlay]);

  const handleCancel = () => {
    clearInterval(intervalRef.current);
    setMainState({ ...mainState, isPlay: false, isDisabled: false });
  };

  const start = () =>
    setMainState({
      ...mainState,
      isPlay: true
    });

  const setWinner = (user) => setMainState({ ...mainState, winner: user });

  const {
    isDisabled,
    currentIndex,
    isPlay,
    buttonName,
    winner,
    playerName
  } = mainState;
  return (
    <Container maxWidth="md" className={classes.root}>
      <ControllPanel
        isDisabled={isDisabled}
        buttonName={buttonName}
        handleCancel={handleCancel}
        start={start}
        option={option}
        mainState={mainState}
        setMainState={setMainState}
      />
      {winner && (
        <Container className={classes.winner}>
          <Alert
            variant="filled"
            severity="success"
            onClose={() => setWinner(null)}
          >
            Победил {winner}
          </Alert>
        </Container>
      )}
      <FildGame
        currentIndex={currentIndex}
        isPlay={isPlay}
        setWinner={setWinner}
        playerName={playerName}
        field={field}
        delay={delay}
      />
    </Container>
  );
}

export default GamePanel;
