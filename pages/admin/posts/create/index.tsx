import { NextPage } from "next";
import React from "react";
import Editor, { FinalPost } from "../../../../components/editor";
import AdminLayout from "../../../../components/layout/AdminLayout";

import axios from "axios";
import { useRouter } from "next/router";
import { generateFormData } from "../../../../utils/helper";

interface Props {}
const Create: NextPage<Props> = () => {
  const [creating, setCreating] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (post: FinalPost) => {
    setCreating(true);
    try {
      // we have to generate FormData
      const formData = generateFormData(post);

      // submit our post
      const { data } = await axios.post("/api/posts", formData);

      router.push("/admin/posts/update/" + data.post.slug);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setCreating(false);
  };

  return (
    <AdminLayout
      title="New Post"
      description="Discover the latest insights and updates by adding a new post on Bablu Mia's blog website. Stay tuned for informative articles, tutorials, and valuable content on various topics, including React development and more."
    >
      <Editor onSubmit={handleSubmit} busy={creating} />
    </AdminLayout>
  );
};

export default Create;
