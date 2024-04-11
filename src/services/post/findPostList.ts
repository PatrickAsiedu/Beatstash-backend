import Post from "../../model/Post";

const findPostList = async (
  perPage: number,
  page: number,
  // search: string,
  filter: {}
) => {
  try {
    const posts = await Post.find(
      filter,
      { score: { $meta: "textScore" } },
      { sort: { score: { $meta: "textScore" } } }
    )
      .populate({
        path: "user",
        select: { _id: 0, email: 1 },
      })
      .exec();

    return posts;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
export default findPostList;
