import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

const AppSection = styled.section`
  padding: 4em;
  background: papayawhip;
`

const App: React.SFC<{}> = () => (
  <AppSection>
    <Title>Minstagram v1</Title>
  </AppSection>
);

export default App;