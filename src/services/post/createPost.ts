import Post from "../../model/Post";

const createPost = async (post: any) => {
  try {
    const newPost = await Post.create(post);
    // return newPost;
    // console.log(newPost);
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
