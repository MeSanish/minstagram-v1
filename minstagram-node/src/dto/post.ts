import { IPost } from "../models/post";
import config from "../config";
import { profileDTO } from "./users";
import { IUser } from "../models/user";

interface IPostAuthor {
  email: string;
  profileUrl: string;
}

interface IPostListItem {
  id: string;
  imageUrl: string;
  caption: string;
  author: IPostAuthor;
  reactions: Array<string>;
}

const parseAuthor = (user: IUser): IPostAuthor => {
  return {
    email: user.email,
    profileUrl: `${config.resource.staticPath}/${user.profile.path}`
  }
}

export const postListDTO = (postList: Array<IPost>): Array<IPostListItem> => {
  const tranformedPostList = postList.map((post) => {
    const { _id: id, imageId, caption, author, reactions } = post;
    const reactionIds = reactions.map((reaction) => reaction.reaction);
    return {
      id,
      imageUrl: `${config.resource.staticPath}/${imageId.path}`,
      caption,
      author: parseAuthor(author),
      reactions: reactionIds
    }
  })

  return tranformedPostList;
}