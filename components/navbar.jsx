import "flowbite";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from '../contexts/ThemeContext.js';


// DarkModeToggle.js

function DarkModeToggle(){
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <label htmlFor="darkModeToggle" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          id="darkModeToggle"
          type="checkbox"
          className="hidden"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <div className="toggle-path w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
        <div
          className={`toggle-circle absolute w-6 h-6 bg-white rounded-full shadow inset-y-0.5 ${
            darkMode ? 'right-0.5' : 'left-0.5'
          } transition-all duration-200 ease-in-out`}
        ></div>
      </div>
    </label>
  );
}


export default function Navbar() {
  const { darkMode } = useTheme();
  return (
<nav className="bg-white dark:bg-blue-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
    <Link href="/" className="flex items-center">
      <Image
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8 mr-3"
        alt="Flowbite Logo"
        height={50}
        width={50}
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        teachmegcse
      </span>
    </Link>
    <div className="flex md:order-2">
      <button
        data-collapse-toggle="navbar-sticky"
        type="button"
        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-sticky"
        aria-expanded="false"
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
    </div>
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-sticky"
    >
      <ul className="flex flex-col text-xl p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-600">
      <li>
          <Link
            href="/IGCSE"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            IGCSE
          </Link>
        </li>
        <li>
          <Link
            href="/A-level"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            A-level
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
};
