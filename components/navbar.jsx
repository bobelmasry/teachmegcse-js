import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ session }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavigate = (href) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  return (
    <nav className="bg-white dark:bg-blue-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
        <Link className="flex items-center" href="/">
          <Image
            src="/logo.svg"
            className="h-8 mr-3"
            alt="Logo"
            height={50}
            width={50}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            exceed
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            onClick={handleToggleMenu}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {!session ? (
            <Link
              className="ml-2 text-white transition-all ease-out bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
              href={"/login-or-signup"}
            >
              Sign In
            </Link>
          ) : (
            <Link
              className="text-white transition-all ease-out bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800"
              href={"/login-or-signup"}
            >
              Sign Out
            </Link>
          )}
        </div>
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } flex flex-col text-xl p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-600`}
          >
            <li>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 transition-all dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={() => handleNavigate("/IGCSE")}
                href="/IGCSE"
              >
                IGCSE
              </Link>
            </li>
            <li>
              <Link
                className="block transition-all py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={() => handleNavigate("/A-level")}
                href="/A-level"
              >
                A-level
              </Link>
              <Link
                className="block transition-all py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={() => handleNavigate("/contact")}
                href="/contact"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        {/* Centered div for IGCSE and A-level links */}
        <div className="hidden md:flex md:gap-8 md:ml-28 md:items-center md:justify-center">
          <Link
            className="block text-2xl py-2 px-4 font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 transition-all dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
            onClick={() => handleNavigate("/IGCSE")}
            href="/IGCSE"
          >
            IGCSE
          </Link>
          <Link
            className="block text-2xl py-2 px-4 font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            onClick={() => handleNavigate("/A-level")}
            href="/A-level"
          >
            A-level
          </Link>
        </div>
      </div>
    </nav>
  );
}
