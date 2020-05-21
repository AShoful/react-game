import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const AboutGame = () => (
  <Container maxWidth="md">
    <Typography align="center" variant="h5">
      Game In Dots
    </Typography>
    <Typography variant="h6">We have next gameplay:</Typography>
    <Typography variant="body2" paragraph>
      user set game difficulty and name press PLAY at a specified time interval
      (in the delay field) a random square on the field is highlighted in blue
      if the user managed to click on the square during this time - he turns
      green, the player gets a point and the field changes color to green if
      not, the field turns red and the point goes to the computer when a player
      or computer paints >50% of all possible squares in his color - he becomes
      the winner an inscription appears between the control buttons and the
      playing field that the player (the name he entered) / computer won button
      PLAY changes the caption to PLAY AGAIN result of the game need to be send
      to server on this endpoint /winners in JSON with two fields winner and
      date both strings. results in table should be auto update
    </Typography>
  </Container>
);

export default AboutGame;
