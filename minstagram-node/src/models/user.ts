import { Schema, model, Document } from 'mongoose';
import { IResource } from './resource';
import { IPost } from './post';

export interface IUser extends Document {
  email: string;
  password: string;
  profile: IResource;
  posts: Array<IPost>;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  },
  posts: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }]
  }
})

export default model<IUser>('User', UserSchema)