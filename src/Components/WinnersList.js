import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import gameApi from '../api';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper
  }
}));

const WinnersList = () => {
  const [winnersList, setWinnersList] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    gameApi
      .getWinners()
      .then((res) => setWinnersList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <List className={classes.root}>
      {winnersList &&
        Object.entries(winnersList).map((item) => (
          <>
            <ListItem alignItems="center" key={item[0]}>
              <ListItemText
                primary={`Winner ${item[1].winner}`}
                secondary={`Date game ${new Date(
                  item[1].date
                ).toLocaleDateString()}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
    </List>
  );
};

export default WinnersList;
