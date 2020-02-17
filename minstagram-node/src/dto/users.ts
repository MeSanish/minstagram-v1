import { IUser } from '../models/user';

import config from '../config';
import { createReactionMap } from './post';
import { IPost } from '../models/post';

interface IProfile {
  id: string;
  email: string;
  profileUrl: string;
  posts: Array<{}>;
}

export const profileDTO = (user: IUser): IProfile => {
  const { email, profile, posts, _id: id } = user;
  return {
    id,
    email,
    profileUrl: `${config.resource.staticPath}/${profile.path}`,
    posts: parsePosts(posts)
  }
}

const parsePosts = (posts: Array<IPost>) => {
  return posts.map((post) => ({
    id: post._id,
    imageUrl: `${config.resource.staticPath}/${post.imageId.path}`,
    caption: post.caption,
    reactions: createReactionMap(post.reactions)
  }))
}


interface IUserListItem {
  id: string;
  email: string;
  profileUrl: string;
}

export const userListDTO = (user: IUser): IUserListItem => {
  const { email, profile, _id: id } = user;
  return {
    id,
    email,
    profileUrl: `${config.resource.staticPath}/${profile.path}`,
  }
}