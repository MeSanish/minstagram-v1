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
  text-decoration: none;
  color: black;
`

const Footer: React.SFC<{}> = () => {
  const handleClick = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); return history.push(path)}
  return (
    <FooterWrapper className="footer">
      <Link href="/" onClick={handleClick('/')}>🏠</Link>
      <Link href="/post" onClick={handleClick('/post')}>📷</Link>
      <Link href="/profile" onClick={handleClick('/profile')}>😎</Link>
    </FooterWrapper>
  );
};

export default Footer;