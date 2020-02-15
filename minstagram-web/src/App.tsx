import React from 'react';
import styled from 'styled-components';
import AppRouter from './components/Router';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

const AppSection = styled.section`
  width: 100%;
  background: papayawhip;
  height: 100vh;
`

const App: React.SFC<{}> = () => (
  <AppSection>
    <Title>Minstagram v1</Title>
    <AppRouter />
  </AppSection>
);

export default App;