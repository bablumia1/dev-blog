import Link from "next/link";
import { BsBrowserFirefox, BsGithub, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-3 space-x-4">
          <Link
            href="https://github.com/bablu22"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <BsGithub />
          </Link>

          <Link
            href="https://bd.linkedin.com/in/bablu-mia"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <BsLinkedin />
          </Link>
          <Link
            href="https://bablumia.info"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <BsBrowserFirefox />
          </Link>
        </div>
        <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Bablu Mia</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">Dev Blog</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/login">SignIn</Link>
        </div>
      </div>
    </footer>
  );
}
