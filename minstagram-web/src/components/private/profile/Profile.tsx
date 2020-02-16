import React from 'react';

import styled from 'styled-components';

import UserDetails from './UserDetails';
import PostCollage from './PostCollage';


const ProfileWrapper = styled.div`
  display: grid;
  grid-row-gap: 40px;
  justify-items: center;
`

const Profile = () => {
  return (
    <ProfileWrapper>
      <UserDetails />
      <PostCollage />
    </ProfileWrapper>
  );
};

export default Profile;