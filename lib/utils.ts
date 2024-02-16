import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./dbConnect";
import Post, { PostModelSchema } from "../models/Post";
import { PostDetail, UserProfile } from "../utils/types";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

export const readFile = <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      const convertedFields = convertArraysToStrings(fields);

      resolve({ files, body: convertedFields as T });
    });
  });
};

const convertArraysToStrings = (
  inputObject: Record<string, string[] | undefined>
): Record<string, string> => {
  const result: Record<string, string> = {};

  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      result[key] = inputObject[key]?.[0] || "";
    }
  }

  return result;
};

export const readPostsFromDB = async (
  limit: number,
  pageNo: number,
  skip?: number
) => {
  if (!limit || limit > 10) throw Error("Limit must be less than 10");
  const finalSkip = skip || pageNo * limit;
  await dbConnect();
  const posts = await Post.find()
    .sort({ createdAt: "desc" })
    .select("-content")
    .skip(finalSkip)
    .limit(limit);

  return posts;
};

export const formatPost = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map((post) => {
    return {
      id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      meta: post.meta,
      tags: post.tags,
      thumbnail: post.thumbnail?.url || "",
      createdAt: post.createdAt.toISOString(),
    };
  });
};

export const isAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const user = session?.user;
  if (user) return user as UserProfile;
};
