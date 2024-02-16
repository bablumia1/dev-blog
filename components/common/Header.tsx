import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-6  ">
      {/* Logo and Blog Name */}
      <Link href="/" passHref>
        <div className="flex items-center space-x-2">
          <Logo />
          <h1 className="text-xl font-semibold text-gray-950 dark:text-white">
            Dev Blogs
          </h1>
        </div>
      </Link>

      {/* Navigation and Theme Switch */}
      <nav className="flex items-center space-x-4">
        {/* Add your navigation links here if needed */}
        <ThemeSwitch />
      </nav>
    </header>
  );
};

export default Header;
