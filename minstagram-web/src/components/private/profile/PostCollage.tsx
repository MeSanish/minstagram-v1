import React, { useContext } from 'react';
import styled from 'styled-components';
import { IPost } from '../home/Post';
import { PrivateRouterContext } from '../Router';
import Reactions from '../home/Reactions';

const PostCollageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 18px;
`

const ImageWrapper = styled.img`
  max-width: 250px;
  max-height: 250px;
  min-width: 250px;
  min-height: 250px;
`

const PostWrapper = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  justify-items: center;
`

const SinglePost: React.SFC<IPost> = ({ id, imageUrl, reactions }) => (
  <PostWrapper>
    <ImageWrapper src={imageUrl} />
    <Reactions disabled emojiSize="40px" reaction={reactions} postId={id} onReactionChange={() => {}} />
  </PostWrapper>
)

const PostCollage: React.SFC<{}> = () => {
  const { profile: { posts } } = useContext(PrivateRouterContext);
  return (
    <PostCollageWrapper>
      {posts.map((post) => <SinglePost key={post.id} {...post} />)}
    </PostCollageWrapper>
  );
};

export default PostCollage;