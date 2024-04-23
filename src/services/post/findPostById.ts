import Post from "../../model/Post";

const findPostById = async (_id: string) => {
  try {
    const post = await Post.findById(_id);

    return post;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw new Error("An error occured while querying Post");
  }
};
export default findPostById;
