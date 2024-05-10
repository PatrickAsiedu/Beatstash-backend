import User from "../../model/User";

const findUser = async (username: string) => {
  try {
    const user = await User.findOne({ username: username }).populate("posts");
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default findUser;
