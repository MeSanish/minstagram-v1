import React, { useContext } from 'react';
import { PrivateRouterContext } from '../Router';
import styled from 'styled-components';

const ProfileImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 50px;
`

const UserDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

interface IUserDetailsProps {
  email: string;
  profileUrl: string;
  disabled?: boolean;
}

const UserDetails: React.SFC<IUserDetailsProps> = ({ email, profileUrl }) => {
  return (
    <UserDetailsWrapper>
      <ProfileImage src={profileUrl} />
      <span>{email}</span>
    </UserDetailsWrapper>
  );
};

export default UserDetails;