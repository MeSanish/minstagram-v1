import React from 'react';
import styled from 'styled-components';
import { history } from 'src/components/Router';

const FooterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  justify-items: center;
`
const Link = styled.a`
  cursor: pointer;
`

const Footer = () => {
  const handleClick = (path: string) => () => history.push(path)
  return (
    <FooterWrapper>
      <Link onClick={handleClick('/')}>home</Link>
      <Link onClick={handleClick('/post')}>post</Link>
      <Link onClick={handleClick('/profile')}>profile</Link>
    </FooterWrapper>
  );
};

export default Footer;