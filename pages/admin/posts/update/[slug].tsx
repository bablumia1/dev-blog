import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React, { useState } from "react";
import Editor, { FinalPost } from "../../../../components/editor";
import dbConnect from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";
import AdminLayout from "../../../../components/layout/AdminLayout";
import { generateFormData } from "../../../../utils/helper";
import axios from "axios";

interface PostResponse extends FinalPost {
  id: string;
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Update: NextPage<Props> = ({ post }) => {
  const [updating, setUpdating] = useState(false);
  const handleSubmit = async (post: FinalPost) => {
    setUpdating(true);
    try {
      const formData = generateFormData(post);
      const { data } = await axios.patch("/api/posts/" + post.id, formData);
      console.log(data);
      setUpdating(false);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  return (
    <AdminLayout
      title={`Update ${post.title}`}
      description="Discover the latest insights and updates by adding a new post on Bablu Mia's blog website. Stay tuned for informative articles, tutorials, and valuable content on various topics, including React development and more."
    >
      <Editor
        onSubmit={handleSubmit}
        busy={updating}
        btnTitle="Update"
        initialValues={post}
      />
    </AdminLayout>
  );
};

interface ServerSideResponse {
  post: PostResponse;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const slug = ctx.query.slug as string;

    await dbConnect();
    const post = await Post.findOne({ slug });
    if (!post) return { notFound: true };

    const { _id, title, content, tags, thumbnail, meta } = post;

    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          tags: tags.join(","),
          thumbnail: thumbnail || "",
          slug,
          meta,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Update;
