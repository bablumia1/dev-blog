import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPage,
} from "next";
import { ThemeProviders } from "../components/common/theme-provider";
import LayoutWrapper from "../components/common/LayoutWrapper";
import AppHead from "../components/common/AppHead";
import ListLayout from "../components/layout/ListLayout";
import InfiniteScrollPosts from "../components/common/InfiniteScrollPosts";
import { useState } from "react";
import { PostDetail } from "../utils/types";
import axios from "axios";
import { formatPost, readPostsFromDB } from "../lib/utils";
import ScrollTopAndComment from "../components/common/ScrollToTop";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);

  // const profile = useAuth();
  // const isAdmin = profile && profile.role === "admin";

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
    <LayoutWrapper>
      <AppHead
        title="Home"
        description="Discover engaging and informative content on Bablu Blogs. Explore a variety of topics, including technology, lifestyle, and personal insights. Stay informed and entertained with our thought-provoking articles."
      />
      <InfiniteScrollPosts
        hasMore={hasMorePosts}
        next={fetchMorePosts}
        dataLength={postsToRender.length}
        posts={postsToRender}
        showControls={false}
      />
      <ScrollTopAndComment />
    </LayoutWrapper>
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

export default Home;
