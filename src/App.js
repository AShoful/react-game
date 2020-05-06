/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { cells } from './functions';

import './App.css';

function App() {
  const FILD_SIZE = 2;
  const WIDTH_GAME_FILD = 310;
  const delay = 2000;

  const [randomCeil, setRandomCeil] = useState([]);
  const [buttonName, setButtonName] = useState('Play');
  const [isDisabled, setIsDisabled] = useState(false);
  const [rezult, setRezult] = useState(0);
  // const [option, setOption] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [isStart, setIsStart] = useState(false);

  const randomCeilRef = useRef(randomCeil);
  randomCeilRef.current = randomCeil;

  const rezultRef = useRef(rezult);
  rezultRef.current = rezult;

  // useEffect(() => {
  //   fetch('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
  //     .then((res) => res.json())
  //     .then((res) => setOption(res))
  //     .catch((err) => console.log(err.message));
  // }, []);

  useEffect(() => {
    const user = randomCeil.filter((i) => i && i === 'green').length;
    const computer = randomCeil.filter((i) => i && i === 'red').length;
    if (user > FILD_SIZE ** 2 / 2) {
      setRezult(1);
      console.log('You are winner!!!!');
    }
    if (computer > FILD_SIZE ** 2 / 2) {
      setRezult(2);
      console.log('Computer is winner!!!!');
    }
  }, [randomCeil]);

  const on = (go) => {
    setTimeout(go, delay);
  };

  // const off = () => {
  //   clearTimeout(timeoutId);
  // };

  const randomCeilIndex = (arr) => {
    if (!Array.isArray(arr)) {
      return;
    }
    if (currentIndex !== -1) {
      setCurrentIndex(-1);
      setRandomCeil([]);
    }

    setIsDisabled(true);
    let count = 0;
    const timer = setInterval(() => {
      const index = arr[count];
      setCurrentIndex(index);
      setRandomCeil((randomCeil) => {
        on(() => {
          if (randomCeilRef.current[index] === 'green') {
            return;
          }
          setRandomCeil((randomCeil) => {
            const newArr = [...randomCeil];
            newArr[index] = 'red';
            return [...newArr];
          });
        });

        const newArr = [...randomCeil];
        newArr[index] = 'blue';
        return [...newArr];
      });
      count += 1;
      if (count >= arr.length) {
        console.log(rezultRef.current);
        clearInterval(timer);
        // setCurrentIndex(-1);
        setButtonName('Play again');
        setIsDisabled(false);
      }
    }, delay);
  };

  const action = (index) => {
    if (!(currentIndex === index)) {
      return;
    }
    setRandomCeil((randomCeil) => {
      const newArr = [...randomCeil];
      newArr[index] = 'green';
      return [...newArr];
    });
  };

  // console.log(currentIndex);
  console.log('rezult', rezult);
  const sizeCell = (WIDTH_GAME_FILD - FILD_SIZE * 2) / FILD_SIZE;
  return (
    <>
      <button
        onClick={() => randomCeilIndex(cells(FILD_SIZE ** 2))}
        type="button"
        disabled={isDisabled}
      >
        {buttonName}
      </button>
      <div className="App">
        <div className="field" style={{ width: WIDTH_GAME_FILD }}>
          {Array(FILD_SIZE ** 2)
            .fill('')
            .map((item, index) => (
              <div
                className={
                  randomCeil[index] ? `ceil ${randomCeil[index]}` : 'ceil'
                }
                style={{ width: sizeCell, height: sizeCell }}
                key={`${index + Date.now()}`}
                onClick={() => action(index)}
                role="button"
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
