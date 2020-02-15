import { IUser } from '../models/user';

import config from '../config';

interface IProfile {
  id: string;
  email: string;
  profile: {
    id: string;
    profileUrl: string;
  };
  posts: Array<{}>;
}

export const profileDTO = (user: IUser): IProfile => {
  const { email, profile, posts, _id: id } = user;
  return {
    id,
    email,
    profile: {
      id: profile._id,
      profileUrl: `${config.resource.staticPath}/${profile.path}`
    },
    posts
  }
}