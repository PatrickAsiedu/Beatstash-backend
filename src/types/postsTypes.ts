import { Document, Types } from "mongoose";

interface PostDocument extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  title?: string;
  tags?: string[];
  key?: string;
  bpm?: string;
  artwork: string;
  mp3: string;
  wav?: string;
}

export { PostDocument };
