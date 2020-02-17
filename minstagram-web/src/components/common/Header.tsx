import React from 'react';
import styled from 'styled-components';

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
`

const Header = () => {
  return (
    <HeaderWrapper className="header">
      <div className="logo">📷</div>
      <input className="search" placeholder="Want to stalk" />
      <div className="logout">🚪</div>      
    </HeaderWrapper>
  );
};

export default Header;