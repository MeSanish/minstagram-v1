import React from 'react';
import LoginForm from './Form';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  display: grid;
`

const FormWrapper = styled.div`
  margin: 40px auto;
  padding: 2em;
  background: white;
  display: grid;
  grid-row-gap: 20px;
`

const Login: React.SFC<{}> = () => {
  return (
    <LoginWrapper>
      <FormWrapper>
        <span>
          Login
      </span>
        <LoginForm />
      </FormWrapper>
      <div />
      <div />
    </LoginWrapper>
  );
};

export default Login;