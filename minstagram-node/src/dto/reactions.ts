import { IReaction } from "../models/reaction"

interface IReactionDTOResponse {
  id: string;
  emoji: string;
}

export const reactionDTO = (reaction: IReaction): IReactionDTOResponse => {
  return {
    id: reaction.id,
    emoji: reaction.emoji
  }
}

export const reactionListDTO = (reactions: Array<IReaction>) => {
  return reactions.map(reactionDTO);
}