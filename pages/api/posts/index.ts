import { NextApiHandler } from "next";
import Post from "../../../models/Post";
import dbConnect from "../../../lib/dbConnect";
import {
  formatPost,
  isAuth,
  readFile,
  readPostsFromDB,
} from "../../../lib/utils";
import { postValidationSchema, validatePost } from "../../../lib/validator";
import cloudinary from "../../../lib/cloudinary";
import { IncomingPost } from "../../../utils/types";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return readPosts(req, res);
    case "POST":
      return createNewPost(req, res);
    default:
      res.status(400).json({ success: false });
      break;
  }
};

interface PostBody {
  title: string;
  slug: string;
  content: string;
  meta: string;
}

const createNewPost: NextApiHandler = async (req, res) => {
  try {
    const { files, body } = await readFile<IncomingPost>(req);

    let tags = [];
    if (body?.tags) tags = JSON.parse(body.tags as unknown as string);

    const error = validatePost(postValidationSchema, { ...body, tags });
    if (error) return res.status(400).json({ success: false, error });

    const { title, slug, content, meta }: PostBody = body as PostBody;

    await dbConnect();
    const postAlreadyExits = await Post.findOne({ slug });
    if (postAlreadyExits)
      return res
        .status(400)
        .json({ success: false, error: "Post already exists" });
    const user = await isAuth(req, res);
    const post = new Post({
      title,
      slug,
      content,
      meta,
      tags,
      author: {
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar,
      },
    });

    const thumbnail = Array.isArray(files.thumbnail)
      ? files.thumbnail[0]
      : files.thumbnail;

    if (thumbnail) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        thumbnail.filepath,
        {
          folder: "dev-blogs",
        }
      );
      post.thumbnail = { url, public_id };
    }

    await post.save();
    res.status(200).json({ success: true, post });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const readPosts: NextApiHandler = async (req, res) => {
  try {
    const { limit, pageNo, skip } = req.query as {
      limit: string;
      pageNo: string;
      skip: string;
    };
    const posts = await readPostsFromDB(
      parseInt(limit),
      parseInt(pageNo),
      parseInt(skip)
    );
    res.json({ posts: formatPost(posts) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
