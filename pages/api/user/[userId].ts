import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { readFile } from "../../../lib/utils";
import { UpdateRole } from "../../../utils/types";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      return res.json({ message: "Hello world" });
    case "PATCH":
      return updateUserRole(req, res);
    default:
      res.status(404).send("Not found!");
  }
};

const updateUserRole: NextApiHandler = async (req, res) => {
  try {
    const { userId } = req.query as { userId: string };
    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { files, body } = await readFile<UpdateRole>(req);
    console.log(body);

    const { role } = body;
    if (role !== "user" && role !== "admin") {
      return res.status(400).json({ error: "Invalid role" });
    }
    user.role = role;
    await user.save();
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
