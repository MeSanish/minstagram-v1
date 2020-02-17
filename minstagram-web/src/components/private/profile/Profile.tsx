import React, { useContext } from 'react';

import styled from 'styled-components';

import UserDetails from './UserDetails';
import PostCollage from './PostCollage';
import { PrivateRouterContext } from '../Router';


export const ProfileWrapper = styled.div`
  display: grid;
  grid-row-gap: 40px;
  justify-items: center;
  padding-top: 20px;
`

const Profile = () => {
  const { profile: { posts, email, profileUrl } } = useContext(PrivateRouterContext);
  return (
    <ProfileWrapper>
      <UserDetails email={email} profileUrl={profileUrl} />
      <PostCollage posts={posts} />
    </ProfileWrapper>
  );
};

export default Profile;