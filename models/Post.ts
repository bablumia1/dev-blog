import { Model, ObjectId, Schema, model, models } from "mongoose";

export interface PostModelSchema {
  _id: ObjectId;
  title: string;
  slug: string;
  content: string;
  meta: string;
  tags: string[];
  thumbnail?: { url: string; public_id: string };
  author?: { name: string; email: string; avatar: string };
  createdAt: Date;
}

const PostSchema = new Schema<PostModelSchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    meta: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    thumbnail: {
      type: Object,
      url: String,
      public_id: String,
      required: false,
    },
    author: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = models?.Post || model("Post", PostSchema);

export default Post as Model<PostModelSchema>;
