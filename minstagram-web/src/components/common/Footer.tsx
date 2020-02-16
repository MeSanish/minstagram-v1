import React from 'react';
import styled from 'styled-components';
import { history } from 'src/components/Router';

const Footer = styled.div`
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
    <Footer>
      <Link onClick={handleClick('/')}>home</Link>
      <Link onClick={handleClick('/post')}>post</Link>
      <Link onClick={handleClick('/profile')}>profile</Link>
    </Footer>
  );
};

export default Footer;