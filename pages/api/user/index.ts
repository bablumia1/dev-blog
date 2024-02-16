import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getAllUsers(req, res);
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const getAllUsers: NextApiHandler = async (req, res) => {
  try {
    await dbConnect();
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
