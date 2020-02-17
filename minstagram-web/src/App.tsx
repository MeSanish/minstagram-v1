import React from 'react';
import styled from 'styled-components';
import AppRouter from './components/Router';

const AppSection = styled.div`
  width: 100%;
  height: 100vh;
`

const App: React.SFC<{}> = () => (
  <AppSection>
    <AppRouter />
  </AppSection>
);

export default App;