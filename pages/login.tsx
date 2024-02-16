import { NextPage } from "next";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import Logo from "../components/common/Logo";
import Link from "next/link";

interface Props {}

const Login: NextPage<Props> = (): JSX.Element => {
  const { data: session } = useSession();
  const user = session?.user as any;

  const handleSignIn = async () => await signIn("github");
  const handleSignOut = async () => await signOut();
  return (
    <div className="max-w-[280px] mx-auto min-h-screen flex items-center justify-center">
      <div className="flex h-full flex-col items-center justify-center mt-[10vh]">
        <Link href="/" passHref className="mb-10">
          <div className="flex items-center space-x-2">
            <Logo />
            <h1 className="text-xl font-semibold text-gray-950 dark:text-white">
              Dev Blogs
            </h1>
          </div>
        </Link>

        {session ? (
          <>
            <button
              className="flex items-center justify-center px-4 py-2 text-white bg-gray-800 rounded-md"
              onClick={handleSignOut}
            >
              <BsGithub className="w-5 h-5 mr-2" />
              Sign out
            </button>
            {user?.role === "admin" && (
              <Link href="/admin" passHref>
                <button className="flex items-center justify-center px-4 py-2 mt-4 text-white bg-gray-800 rounded-md">
                  <BsGithub className="w-5 h-5 mr-2" />
                  Admin
                </button>
              </Link>
            )}
          </>
        ) : (
          <button
            className="flex items-center justify-center px-4 py-2 text-white bg-gray-800 rounded-md"
            onClick={handleSignIn}
          >
            <BsGithub className="w-5 h-5 mr-2" />
            Sign in with GitHub
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
