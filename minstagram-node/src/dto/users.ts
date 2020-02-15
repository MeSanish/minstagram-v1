import { IUser } from '../models/user';

import config from '../config';

interface IProfile {
  email: string;
  profile: {
    id: string;
    profileUrl: string;
  };
  posts: Array<{}>;
}

export const profileDTO = (user: IUser): IProfile => {
  const { email, profile, posts } = user;
  return {
    email,
    profile: {
      id: profile._id,
      profileUrl: `${config.resource.staticPath}/${profile.path}`
    },
    posts
  }
}