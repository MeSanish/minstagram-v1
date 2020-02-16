import * as React from 'react';
import styled from 'styled-components';
import Reactions, { IReactionMap } from './Reactions';

export interface IPost {
  id: string;
  imageUrl: string;
  caption: string;
  author: Object;
  reactions: IReactionMap;
}


const PostWrapper = styled.div`
  display: grid;
  grid-template-rows: 3fr 1fr 1fr;
  justify-items: center;
`

const ImageWrapper = styled.img`
  max-width: 335px;
`

const Post: React.SFC<{ post: IPost}> = ({ post }) => {
  return (
    <PostWrapper className="post">
      <div className="image">
        <ImageWrapper src={post.imageUrl} />
      </div>
      <div className="caption">
        <span>{post.caption}</span>
      </div>
      <Reactions reaction={post.reactions} />
    </PostWrapper>
  );
};

export default Post;