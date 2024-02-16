import React, { FC, ReactNode } from "react";
import { PostDetail } from "../../utils/types";
import InfiniteScroll from "react-infinite-scroll-component";
import ListLayout from "../layout/ListLayout";
import Link from "next/link";
import { format } from "date-fns";

interface Props {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
}

const InfiniteAdminPosts: FC<Props> = ({
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
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.map((post) => {
            const { slug, title, createdAt, meta, tags } = post;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={createdAt}>
                          {format(new Date(createdAt), "MMMM dd, yyyy")}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/admin/posts/update/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {meta}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </InfiniteScroll>
    </>
  );
};

export default InfiniteAdminPosts;
