import mongoose, { Schema } from "mongoose";
import User from "./User";

const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    title: String,

    tags: [String],
    key: String,
    bpm: String,
    artwork: { type: String, required: true },
    mp3: { type: String, required: true },
    wav: String,
  },
  { timestamps: true }
);

postSchema.index({ title: "text", tags: "text" });

export default mongoose.model("Post", postSchema);
