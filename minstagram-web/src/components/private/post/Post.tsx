import React from 'react';

import CreatePostForm from './Form';
import styled from 'styled-components';

const PostFormWrapper = styled.div`
  margin: 150px 20px;
`

const CreatePost = () => {
  return (
    <PostFormWrapper>
      <CreatePostForm />
    </PostFormWrapper>
  );
};

export default CreatePost;