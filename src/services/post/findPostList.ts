import Post from "../../model/Post";

const findPostList = async (perPage: number, page: number, filter?: {}) => {
  try {
    const posts = await Post.find({
      limit: perPage,
      skip: page - 1 * perPage,
    }).exec();

    return posts;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
export default findPostList;
