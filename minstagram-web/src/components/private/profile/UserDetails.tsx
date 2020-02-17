import React, { useContext } from 'react';
import { PrivateRouterContext } from '../Router';
import styled from 'styled-components';
import Upload from 'src/components/common/Upload';
import axiosInstance from 'src/utils/axios';

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

const UserDetails: React.SFC<IUserDetailsProps> = ({ email, profileUrl, disabled = true }) => {
  const handleUploadComplete = async (profileId: string) => {
    try {
      await axiosInstance.patch('/v1/users/me', {
        profileId
      })
    } catch (error) {
      throw error;
    }
  }
  return (
    <UserDetailsWrapper>
      {profileUrl ? (
        <ProfileImage src={profileUrl} />
      ) : (
          !disabled ? <Upload onUploadComplete={handleUploadComplete} /> : null
        )}
      <span>{email}</span>
    </UserDetailsWrapper>
  );
};

export default UserDetails;