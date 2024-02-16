import ScrollTopAndComment from "../components/common/ScrollToTop";
import LayoutWrapper from "../components/common/LayoutWrapper";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import dbConnect from "../lib/dbConnect";
import Post from "../models/Post";
import parse from "html-react-parser";
import Tag from "../components/common/Tag";
import Image from "next/image";
import Footer from "../components/common/Footer";
import AppHead from "../components/common/AppHead";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePost: NextPage<Props> = ({ post }) => {
  const { title, content, tags, meta, author, thumbnail, createdAt } = post;

  return (
    <LayoutWrapper>
      <ScrollTopAndComment />
      <AppHead title={title} description={meta} />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={createdAt}>
                      {new Date(createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                  {title}
                </h1>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  <li
                    className="flex items-center space-x-2"
                    key={author?.name}
                  >
                    {author?.avatar && (
                      <Image
                        src={author?.avatar}
                        width={38}
                        height={38}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {author?.name}
                      </dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="pt-10 pb-8 prose max-w-none dark:prose-invert">
                {parse(content)}
              </div>
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      width={200}
                      height={100}
                      alt="thumbnail"
                      className="mt-4 rounded-lg"
                    />
                  ) : (
                    <Image
                      src="https://res.cloudinary.com/dsftrmdil/image/upload/v1701235491/dev-blogs/hnp4vjcrfr48q33pqnkj.png"
                      width={200}
                      height={100}
                      alt="placeholder"
                      className="mt-4 rounded-lg"
                    />
                  )}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
      <Footer />
    </LayoutWrapper>
  );
};
export default SinglePost;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    await dbConnect();
    const posts = await Post.find().select("slug");
    const paths = posts.map(({ slug }) => ({ params: { slug } }));
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [{ params: { slug: "/" } }],
      fallback: false,
    };
  }
};
interface StaticPropsResponse {
  post: {
    id: string;
    title: string;
    content: string;
    meta: string;
    tags: string[];
    slug: string;
    thumbnail: string;
    createdAt: string;
    author: {
      name: string;
      email: string;
      avatar: string;
    };
  };
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug });

    if (!post) return { notFound: true };

    const {
      id,
      title,
      content,
      meta,
      tags,
      slug,
      thumbnail,
      author,
      createdAt,
    } = post;
    return {
      props: {
        post: {
          id: id.toString(),
          title,
          content,
          meta,
          tags,
          slug,
          thumbnail: thumbnail?.url || "",
          createdAt: createdAt.toString(),
          author: {
            name: author?.name || "",
            email: author?.email || "",
            avatar: author?.avatar || "",
          },
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};
