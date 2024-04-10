import Post from "../../model/Post";

const createPost = async (post: any) => {
  try {
    await Post.create(post);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return new Promise((resolve, reject) => {
        reject("failed to create post");
      });
    }
  }
};
export default createPost;
