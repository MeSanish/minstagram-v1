import React, { createContext, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Home from './home/Home';
import CreatePost from './post/Post';
import axiosInstance from 'src/utils/axios';
import Profile from './profile/Profile';
import { IPost } from './home/Post';

interface IProfile {
  id: string;
  email: string;
  profileUrl: string;
  posts: Array<IPost>;
}

const initialState = {
  id: '',
  email: '',
  profileUrl: '',
  posts: []
}

interface IPrivateRouterContext {
  profile: IProfile;
  fetchProfile: () => Promise<void>
}

export const PrivateRouterContext = createContext<IPrivateRouterContext>({
  profile: {} as IProfile,
  fetchProfile: () => new Promise((resolve) => {resolve()})
});

const PrivateRouter: React.SFC<{}> = () => {
  const [profile, setProfile] = useState<IProfile>(initialState);

  const fetchProfile = async () => {
    const profile: IProfile = await axiosInstance.get('/v1/users/me')
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    })
    setProfile(profile);
  }

  useEffect(() => {
    fetchProfile();
  }, [])

  return (
    <PrivateRouterContext.Provider value={{ profile, fetchProfile }}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/post" component={CreatePost} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </PrivateRouterContext.Provider>
  );
};

export default PrivateRouter;