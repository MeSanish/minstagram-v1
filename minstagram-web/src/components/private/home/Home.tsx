import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Post, { IPost } from './Post';
import axiosInstance from 'src/utils/axios';

const HomeWrapper = styled.div`
  display: grid;
  grid-row-gap: 100px;
`

const Home = () => {
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const fetchPostList = async () => {
    try {
      const postList: Array<IPost> = await axiosInstance.get('/v1/posts')
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      })
      setPosts(postList)
    } catch (error) {
      throw error;
    }
  }
  const handleReactionChange = () => {
    fetchPostList();
  }
  useEffect(() => {
    fetchPostList();
  }, [])
  return (
    <HomeWrapper className="home">
      {posts.map((post) => <Post onReactionChange={handleReactionChange} key={post.id} post={post} />)}
    </HomeWrapper>
  );
};

export default Home;