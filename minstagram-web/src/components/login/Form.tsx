import React from 'react';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../utils/axios';
import { handleLogin } from '../../utils/auth';
import { history } from '../Router';

const FormWrapper = styled.form`
  display: grid;
  grid-row-gap: 20px;
`

const InputWrapper = styled.div`
  margin-bottom: 23px;
`
const Input = styled.input`
  line-height: 1.2;
  height: 35px;
  font-size: 16px;
  display: block;
  padding: 0 7px 0 43px;
`

const ErrorSpan = styled.span`
  color: red;
`

interface ILoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.SFC<{}> = () => {
  const { register, handleSubmit, errors  } = useForm<ILoginFormValues>()
  const onSubmit = async (credentials: ILoginFormValues) => { 
    try {
      await handleLogin(credentials)
      history.push('/')
    } catch (error) {
      
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputWrapper>
          <Input placeholder="Type your email" name="email" ref={register({ required: true})} autoComplete="off" />
          {errors.email && <ErrorSpan>Required</ErrorSpan>}
        </InputWrapper>
        <div>
          <Input placeholder="Type your password" name="password" ref={register({ required: true} )} autoComplete="off" />
          {errors.password && <ErrorSpan>Required</ErrorSpan>}
        </div>
      </div>
      <div>
        <button type="submit" >Login</button>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;