import { NextApiHandler } from "next";
import Post from "../../../models/Post";
import { readFile } from "../../../lib/utils";
import { postValidationSchema, validatePost } from "../../../lib/validator";
import cloudinary from "../../../lib/cloudinary";
import { IncomingPost } from "../../../utils/types";
import dbConnect from "../../../lib/dbConnect";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "PATCH":
      return updatePost(req, res);

    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const updatePost: NextApiHandler = async (req, res) => {
  try {
    await dbConnect();
    const postId = req.query.postId as string;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false });
    }

    const { files, body } = await readFile<IncomingPost>(req);

    let tags = [];
    if (body.tags) tags = JSON.parse(body.tags as unknown as string);

    const error = validatePost(postValidationSchema, { ...body, tags });
    if (error) return res.status(400).json({ success: false, error });

    const { title, slug, content, meta } = body;

    post.title = title;
    post.slug = slug;
    post.content = content;
    post.meta = meta;
    post.tags = tags;

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

      const publicId = post.thumbnail?.public_id;
      if (publicId) await cloudinary.uploader.destroy(publicId);

      post.thumbnail = { url, public_id };
    }
    await post.save();
    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

export default handler;
