import React, { useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { formatPost, readPostsFromDB } from "../../../lib/utils";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { PostDetail } from "../../../utils/types";
import axios from "axios";
import InfiniteScrollPosts from "../../../components/common/InfiniteScrollPosts";
import AppHead from "../../../components/common/AppHead";
import InfiniteAdminPosts from "../../../components/common/InfiniteAdminPosts";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const AdminPosts: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);

  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&skip=${postsToRender.length}`
      );
      if (data.posts.length < limit) {
        setPostsToRender([...postsToRender, ...data.posts]);
        setHasMorePosts(false);
      } else setPostsToRender([...postsToRender, ...data.posts]);
    } catch (error) {
      setHasMorePosts(false);
      console.log(error);
    }
  };
  return (
    <AdminLayout>
      <AppHead
        title="Home"
        description="Discover engaging and informative content on Bablu Blogs. Explore a variety of topics, including technology, lifestyle, and personal insights. Stay informed and entertained with our thought-provoking articles."
      />
      <InfiniteAdminPosts
        hasMore={hasMorePosts}
        next={fetchMorePosts}
        dataLength={postsToRender.length}
        posts={postsToRender}
        showControls={false}
      />
    </AdminLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
}
let pageNo = 0;
const limit = 9;

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async () => {
  try {
    // read posts
    const posts = await readPostsFromDB(limit, pageNo);
    // format posts
    const formattedPosts = formatPost(posts);
    return {
      props: {
        posts: formattedPosts,
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};

export default AdminPosts;
