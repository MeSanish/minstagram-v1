import { Schema, model, Document } from "mongoose";

export interface IResource extends Document {
  path: string;
}

const resourceSchema = new Schema({
  path: String
})

export default model<IResource>('Resource', resourceSchema)