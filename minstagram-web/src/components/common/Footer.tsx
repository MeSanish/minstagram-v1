import React from 'react';
import styled from 'styled-components';
import { history } from 'src/components/Router';
import { ShadowWrapper } from './Header';

const FooterWrapper = styled(ShadowWrapper)`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  justify-items: center;
  padding: 20px 0;
  position: fixed;
  z-index: 100;
  bottom: 0;
  width: 100%;
  background: white;
`
const Link = styled.a`
  cursor: pointer;
  font-size: 25px;
`

const Footer = () => {
  const handleClick = (path: string) => () => history.push(path)
  return (
    <FooterWrapper className="footer">
      <Link onClick={handleClick('/')}>🏠</Link>
      <Link onClick={handleClick('/post')}>☁️</Link>
      <Link onClick={handleClick('/profile')}>😎</Link>
    </FooterWrapper>
  );
};

export default Footer;