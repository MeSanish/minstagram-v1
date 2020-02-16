import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  justify-items: center;
`

const Header = () => {
  return (
    <HeaderWrapper>
      <div className="logo">Logo</div>
      <input className="search" />
      <div className="logout">Log out</div>      
    </HeaderWrapper>
  );
};

export default Header;