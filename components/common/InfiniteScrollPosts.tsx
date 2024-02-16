import React, { FC, ReactNode } from "react";
import { PostDetail } from "../../utils/types";
import InfiniteScroll from "react-infinite-scroll-component";
import ListLayout from "../layout/ListLayout";

interface Props {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
}

const InfiniteScrollPosts: FC<Props> = ({
  posts,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
}): JSX.Element => {
  const defaultLoader = (
    <p className="p-3 text-xl font-semibold text-center opacity-50 text-secondary-dark animate-pulse">
      Loading...
    </p>
  );

  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        next={next}
        dataLength={dataLength}
        loader={loader || defaultLoader}
      >
        <ListLayout posts={posts} />
      </InfiniteScroll>
    </>
  );
};

export default InfiniteScrollPosts;
