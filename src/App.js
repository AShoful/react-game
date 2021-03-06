import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import Navbar from './Components/Navbar';
import Router from './Router';

import themeObject from './utills/themes';

const theme = createMuiTheme(themeObject);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <Router />
    </MuiThemeProvider>
  );
}

export default App;
