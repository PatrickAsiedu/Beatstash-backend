import User from "../model/User";
import bcrypt from "bcrypt";
import { Response, Request } from "express";

type Userdata = {
  email: string;
  password: string;
};

const handleSIgnUp = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password }: Userdata = req.body;
  // validate fields
  //check if required fields exist
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are rquired" });
  }
  try {
    //check for duplicates of email in db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) {
      return res
        .status(409)
        .json({ message: "an account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });
    console.log(newUser);
    res.status(201).json({ success: `New user ${email} created` });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
};
export default handleSIgnUp;
