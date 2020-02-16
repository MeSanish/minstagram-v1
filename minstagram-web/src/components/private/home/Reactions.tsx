import React, { useState, useEffect } from 'react';
import axiosInstance from 'src/utils/axios';
import styled from 'styled-components';


export interface IReactionMap {
  [reactionId: string]: number
}

interface IReactions {
  id: string;
  emoji: string;
}

const ReactionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-column-gap: 60px;

`

interface IReactionsProps {
  postId: string;
  reaction: IReactionMap;
  onReactionChange: () => void;
  emojiSize?: string;
  disabled?: boolean;
}

const Reactions: React.SFC<IReactionsProps> = (props) => {
  const [reactions, setReactions] = useState<Array<IReactions>>([]);

  const fetchReactions = async () => {
    try {
      const reactions: Array<IReactions> = await axiosInstance.get('/v1/reactions')
        .then(({ data }) => data)
        .catch((error) => {
          throw error;
        })
      setReactions(reactions);
    } catch (error) {
      throw error;
    }
  }

  const addReaction = async (reactionId: string) => {
    try {
      await axiosInstance.patch(`/v1/posts/${props.postId}/react`, {
        reactionId
      })
      props.onReactionChange();
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    fetchReactions();
  }, [])
  return (
    <ReactionWrapper className="reactions">
      {reactions.map(({ emoji, id }) => (
        <div key={id}>
          <span 
          style={
            { fontSize: `${props.emojiSize ? props.emojiSize : '80px'}`, 
            cursor: `${props.disabled ? 'auto':'pointer'}` }
            } 
            onClick={() => !props.disabled && addReaction(id)}>{emoji}</span>
          <span>{props.reaction[id] ? props.reaction[id] : 0}</span>
        </div>
      ))}
    </ReactionWrapper>
  );
};

export default Reactions;