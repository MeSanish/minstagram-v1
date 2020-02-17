import React from 'react';

import styled from 'styled-components';

import { handleLogout } from 'src/utils/auth';
import { history } from '../Router';
import Stalk from './Stalk';

export const ShadowWrapper = styled.div`
  box-shadow: 1px 1px 10px rgba(0,0,0,0.2);
`

const HeaderWrapper = styled(ShadowWrapper)`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-items: center;
  padding: 20px 0;
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  background: white;
`;

const Link = styled.a`
  cursor: pointer;
  font-size: 25px;
  text-decoration: none;
  color: black;
`;

const Header: React.SFC<{}> = () => {
  const onLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    handleLogout()
  }
  const onHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    history.push('/')
  }
  return (
    <HeaderWrapper className="header">
      <Link href="/" className="logo" onClick={onHome}>📷</Link>
      <Stalk />
      <Link href="/logout" className="logout" onClick={onLogout}>🚪</Link>      
    </HeaderWrapper>
  );
};

export default Header;