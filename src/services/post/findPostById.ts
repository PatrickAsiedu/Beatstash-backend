import Post from "../../model/Post";

const findPostById = async (_id: string) => {
  try {
    const post = await Post.findById(_id).populate({
      path: "user",
      select: { _id: 0, username: 1 },
    });

    return post;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw new Error("An error occured while querying Post");
  }
};
export default findPostById;
