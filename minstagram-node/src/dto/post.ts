import { IPost } from "../models/post";
import config from "../config";

interface IPostListItem {
  image: { id: string, imageUrl: string};
  caption: string;
  authorId: string;
  reactions: Array<string>;
}

export const postListDTO = (postList: Array<IPost>): Array<IPostListItem> => {
  const tranformedPostList = postList.map((post) => {
    const { imageId, caption, author, reactions } = post;
    const reactionIds = reactions.map((reaction) => reaction.reaction);
    return {
      image: {
        id: imageId._id,
        imageUrl: `${config.resource.staticPath}/${imageId.path}`
      },
      caption,
      authorId: author._id,
      reactions: reactionIds
    }
  })

  return tranformedPostList;
}