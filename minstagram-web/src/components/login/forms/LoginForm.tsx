import React from 'react';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { handleLogin } from 'src/utils/auth';
import { history } from 'src/components/Router';
import { FormTypes, ICommonFormProps } from '../Login';

export const FormWrapper = styled.form`
  display: grid;
  grid-row-gap: 20px;
`

export const InputWrapper = styled.div`
  margin-bottom: 23px;
`
export const Input = styled.input`
  line-height: 1.2;
  height: 35px;
  font-size: 16px;
  display: block;
  padding: 0 7px 0 43px;
`

export const ErrorSpan = styled.span`
  color: red;
`

interface ILoginFormValues {
  email: string;
  password: string;
}

type ILoginFormProps = ICommonFormProps;

const LoginForm: React.SFC<ILoginFormProps> = (props) => {
  const { register, handleSubmit, errors } = useForm<ILoginFormValues>()
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
          <Input placeholder="Type your email" name="email" ref={register({ required: true })} autoComplete="off" />
          {errors.email && <ErrorSpan>Required</ErrorSpan>}
        </InputWrapper>
        <div>
          <Input type="password" placeholder="Type your password" name="password" ref={register({ required: true })} autoComplete="off" />
          {errors.password && <ErrorSpan>Required</ErrorSpan>}
        </div>
      </div>
      <div>
        <button type="submit" >Login</button>
      </div>
      <span>Or <a style={{ cursor: 'pointer' }} onClick={() => props.onFormChange(FormTypes.signup)}>Sign Up</a></span>
    </FormWrapper>
  );
};

export default LoginForm;