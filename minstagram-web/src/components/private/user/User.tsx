import React, { useState, useEffect } from 'react';

import UserDetails from '../profile/UserDetails';
import PostCollage from '../profile/PostCollage';
import { ProfileWrapper } from '../profile/Profile';
import { IProfile } from 'src/components/private/Router';
import axiosInstance from 'src/utils/axios';
import { RouteComponentProps } from 'react-router-dom';

type IUserProps = RouteComponentProps<{ userId: string;}>;

const User: React.SFC<IUserProps> = (props) => {
  const [user, setUser] = useState<IProfile | null>(null);
  const fetchUser = async () => {
    try {
      const userId = props.match.params.userId;
      if(userId) {
        const fetchedUser: IProfile  = await axiosInstance.get(`/v1/users/${userId}`)
        .then(({ data }) => data)
        .catch((error) => {
          throw error;
        })
        setUser(fetchedUser);
      }
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    fetchUser();
  }, [])
  return (
    user ? (
      <ProfileWrapper>
        <UserDetails disabled email={user.email} profileUrl={user.profileUrl} />
        <PostCollage posts={user.posts} />
      </ProfileWrapper>
    ): null
  );
};

export default User;