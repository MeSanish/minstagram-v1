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

const Reactions: React.SFC<{ reaction: IReactionMap }> = (props) => {
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
  useEffect(() => {
    fetchReactions();
  }, [])
  return (
    <ReactionWrapper className="reactions">
      {reactions.map(({ emoji, id }) => (
        <div key={id}>
          <span style={{ fontSize: '80px' }}>{emoji}</span>
          <span>{props.reaction[id] ? props.reaction[id] : 0}</span>
        </div>
      ))}
    </ReactionWrapper>
  );
};

export default Reactions;