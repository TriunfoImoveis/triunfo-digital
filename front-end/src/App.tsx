import React from 'react';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import theme from './styles/theme';
import SignIn from './pages/SignIn';
// import Action from './pages/Action';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <SignIn />
      {/* <Action /> */}
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
