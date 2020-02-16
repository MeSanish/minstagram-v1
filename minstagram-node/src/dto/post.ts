import { IPost, IPostReaction } from "../models/post";
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
  reactions: IResponseMap;
}

interface IResponseMap {
  [reactionId: string]: number
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

    return {
      id,
      imageUrl: `${config.resource.staticPath}/${imageId.path}`,
      caption,
      author: parseAuthor(author),
      reactions: createReactionMap(reactions)
    }
  })

  return tranformedPostList;
}

const createReactionMap = (reactions: Array<IPostReaction>) => {
  const reactionMap = new Map<string, number>();

  reactions.forEach((reaction) => {
    const reactionId = reaction.reaction;
    const reactionCount = reactionMap.get(reactionId)
    if(reactionCount) {
      reactionMap.set(reactionId, reactionCount + 1);
    } else {
      reactionMap.set(reactionId, 1);
    }
  });
  const responseMap: IResponseMap = {};

  for(let [reactionId, reactionCount] of reactionMap) {
    responseMap[reactionId] = reactionCount;
  }
  return responseMap;
}