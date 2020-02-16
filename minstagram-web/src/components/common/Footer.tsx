import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  justify-items: center;
`

const Header = () => {
  return (
    <Footer>
      <div>home</div>
      <div>post</div>
      <div>profile</div>
    </Footer>
  );
};

export default Header;