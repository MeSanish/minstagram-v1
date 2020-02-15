import { Schema, model, Document } from 'mongoose';

import { IUser } from './user';

import { IResource } from './resource';

interface IPostReaction extends Document {
  reactedBy: string;
  reaction: string
}


export interface IPost extends Document {
  imageId: IResource;
  caption: string;
  author: IUser;
  reactions: Array<IPostReaction>;
}

const PostReactionSchema = new Schema({
  reactedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reaction: {
    type: Schema.Types.ObjectId,
    ref: 'Reaction'
  }
})

const PostSchema = new Schema({
  imageId: {
    type: Schema.Types.ObjectId,
    ref: 'Resource',
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  reactions: [PostReactionSchema],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


export default model<IPost>('Post', PostSchema)