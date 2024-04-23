import Post from "../../model/Post";
import { Document, Types } from "mongoose";
import { PostDocument } from "../../types/postsTypes";

// interface PostListResult {
//   total: number;
//   posts: PostDocument[];
// }

const findPostList = async (
  page: number,
  perPage: number,
  search: string,
  filter: {}
) => {
  try {
    const options = search
      ? {
          sort: { score: { $meta: "textScore" } },
        }
      : {};
    const projection = search
      ? { title: 1, tags: 1, score: { $meta: "textScore" } }
      : { title: 1, tags: 1 };

    const postsP = Post.find(filter, projection, options)
      .populate({
        path: "user",
        select: { _id: 0, email: 1 },
      })
      .limit(perPage)
      .skip((page - 1) * perPage)
      .exec();

    const totalP = Post.countDocuments(filter);
    const [posts, total] = await Promise.all([postsP, totalP]);

    return { total, posts };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw new Error("An error occured while querying Posts");
  }
};
export default findPostList;
