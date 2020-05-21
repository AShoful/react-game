/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import gameApi from '../../api';

const useStyles = makeStyles((theme) => ({
  field: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    cursor: 'copy',
    marginBottom: theme.spacing(2),
    border: '1.5px solid grey'
  },
  green: {
    backgroundColor: theme.palette.success.dark
  },
  blue: {
    backgroundColor: theme.palette.primary.main
  },
  red: {
    backgroundColor: theme.palette.secondary.main
  }
}));

function FildGame({
  currentIndex,
  isPlay,
  setWinner,
  field,
  delay,
  playerName
}) {
  const classes = useStyles();
  const red = 'red';
  const blue = 'blue';
  const green = 'green';
  const WIDTH_GAME_FILD = 310;
  const totalFilds = field ** 2;
  const sizeCell = (WIDTH_GAME_FILD - (field + 1) * 3) / field;
  const [randomCeil, setRandomCeil] = useState([]);

  const timerRef = useRef(null);

  const onTimer = (go) => {
    timerRef.current = setTimeout(go, delay);
  };

  const changeColorCell = (currentIndex, color) => {
    setRandomCeil((randomCeil) => {
      const newArr = [...randomCeil];
      newArr[currentIndex] = color;
      return [...newArr];
    });
  };

  const checkWinner = (color) =>
    randomCeil.filter((i) => i && i === color).length;

  useEffect(() => {
    if (!isPlay) {
      setRandomCeil([]);
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlay]);

  useEffect(() => {
    changeColorCell(currentIndex, blue);
    onTimer(() => {
      changeColorCell(currentIndex, red);
    });
  }, [currentIndex]);

  useEffect(() => {
    if (checkWinner(green) > totalFilds / 2) {
      setWinner(playerName);
      clearTimeout(timerRef.current);
      gameApi
        .post({ date: Date.now(), winner: playerName })
        .catch((err) => console.log(err));
    }
    if (checkWinner(red) > totalFilds / 2) {
      setWinner('computer');
      clearTimeout(timerRef.current);
      gameApi
        .post({ date: Date.now(), winner: 'computer' })
        .catch((err) => console.log(err));
    }
  }, [randomCeil]);

  const action = (index) => {
    if (!(currentIndex === index)) {
      return;
    }
    clearTimeout(timerRef.current);
    changeColorCell(index, green);
  };

  return (
    <div
      className={classes.field}
      style={{ width: WIDTH_GAME_FILD }}
      onClick={(e) => action(+e.target.id)}
      role="button"
    >
      {Array(totalFilds)
        .fill('')
        .map((_, index) => (
          <div
            className={randomCeil[index] ? classes[randomCeil[index]] : ''}
            style={{
              width: sizeCell,
              height: sizeCell,
              border: '1.5px solid grey'
            }}
            key={`${index + Date.now()}`}
            id={index}
          />
        ))}
    </div>
  );
}

FildGame.propTypes = {
  currentIndex: PropTypes.number,
  isPlay: PropTypes.bool,
  setWinner: PropTypes.func,
  field: PropTypes.number,
  delay: PropTypes.number,
  playerName: PropTypes.string
};

FildGame.defaultProps = {
  currentIndex: 0,
  isPlay: false,
  setWinner: () => {},
  field: 3,
  delay: 2000,
  playerName: 'player'
};

export default FildGame;
