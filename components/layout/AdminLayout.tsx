import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  UsersIcon,
  XMarkIcon,
  PlusCircleIcon,
  CodeBracketSquareIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { CiLogout } from "react-icons/ci";

import { useRouter } from "next/router";
import Link from "next/link";
import AppHead from "../common/AppHead";
import Logo from "../common/Logo";
import { signOut } from "next-auth/react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: CodeBracketSquareIcon,
    current: true,
  },
  {
    name: "Create Blog",
    href: "/admin/posts/create",
    icon: ClipboardDocumentIcon,
    current: false,
  },
  { name: "Posts", href: "/admin/posts", icon: FolderIcon, current: false },
  { name: "Users", href: "/admin/user", icon: UsersIcon, current: false },
  // { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

const AdminLayout: FC<Props> = ({ children, title, description }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavigation, setActiveNavigation] = useState(navigation);
  const router = useRouter();
  useEffect(() => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: router.pathname === item.href,
    }));
    setActiveNavigation(updatedNavigation);
  }, [router.pathname]);
  const handleSignOut = async () => await signOut();
  return (
    <>
      <AppHead title={title} description={description} />
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5 ring-1 ring-white/10">
                  <div className="flex items-center h-16 text-white shrink-0">
                    <h1 className="text-2xl font-bold">Bablu Mia Blog</h1>
                  </div>
                  <nav className="flex flex-col flex-1">
                    <ul role="list" className="flex flex-col flex-1 gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {activeNavigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <item.icon
                                  className="w-6 h-6 shrink-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <button
                              onClick={handleSignOut}
                              type="button"
                              className="flex items-center w-full p-2 text-sm font-semibold leading-6 text-red-300 rounded-md group gap-x-3 hover:text-red-500 hover:bg-gray-800"
                            >
                              <CiLogout />
                              Logout
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5">
          <div className="flex items-center h-16 text-white">
            <Link href="/" passHref>
              <div className="flex items-center space-x-2">
                <Logo />
                <h1 className="text-xl font-semibold text-white">Dev Blogs</h1>
              </div>
            </Link>
          </div>

          <nav className="flex flex-col flex-1">
            <ul role="list" className="flex flex-col flex-1 gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {activeNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className="w-6 h-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleSignOut}
                      type="button"
                      className="flex items-center w-full p-2 text-sm font-semibold leading-6 text-red-300 rounded-md group gap-x-3 hover:text-red-500 hover:bg-gray-800"
                    >
                      <CiLogout />
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm dark:bg-gray-900 shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <div
            className="w-px h-6 bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />
          Dashboard 🐱‍🏍
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
