import mongoose from "mongoose";
const { Schema } = mongoose;

interface User {
  email: string;
  fitstname: string;
  lastname: string;
  username: string;
  password: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: { type: String },
    password: {
      type: String,
      // required: true
    },
    roles: {
      Lisener: {
        type: String,
        default: "listener",
      },
      Producer: String,
      // required: true
    },
    avatar: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});

export default mongoose.model("User", userSchema);
