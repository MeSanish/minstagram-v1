import { Schema, model, Document } from 'mongoose';

export interface IReaction extends Document {
  emoji: string;
}

const ReactionSchema = new Schema({
  emoji: { 
    type: String,
    required: true
  }
})

export default model<IReaction>('Reaction', ReactionSchema);

