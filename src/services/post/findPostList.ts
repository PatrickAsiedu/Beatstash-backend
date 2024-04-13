import Post from "../../model/Post";

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

    const posts = Post.find(filter, projection, options)
      .populate({
        path: "user",
        select: { _id: 0, email: 1 },
      })
      .limit(perPage)
      .skip((page - 1) * perPage)
      .exec();

    return posts;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
export default findPostList;
