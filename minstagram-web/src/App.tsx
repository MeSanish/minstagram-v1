import React from 'react';
import styled from 'styled-components';
import AppRouter from './components/Router';

const AppSection = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 20px 1fr 50px;
  grid-row-gap: 40px;
`

const App: React.SFC<{}> = () => (
  <AppSection>
    <AppRouter />
  </AppSection>
);

export default App;