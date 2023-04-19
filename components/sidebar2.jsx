import "flowbite";

function LargeLink({href, text}) {
  return (
    <li>
            <a
              href={href}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">{text}</span>
            </a>
          </li>
  );
}
function DrawerHeader({text}) {
  return (
    <h5
        id="drawer-navigation-label"
        className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        {text}
      </h5>
  );
}

function Link2Dropdowns({headerText, link1, text1, link2, text2}) {
  return (
    <li>
            <button
              type="button"
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                {headerText}
              </span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <ul id="dropdown-example" className="hidden py-2 space-y-2">
              <li>
                <a
                  href={link1}
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  {text1}
                </a>
              </li>
              <li>
                <a
                  href={link2}
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  {text2}
                </a>
              </li>
            </ul>
          </li>
  );
}

export default function SideBar() {
  return (
    <>
    <div className="text-center">
    </div>
    {/* drawer component */}
    <div
      id="drawer-navigation"
      className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
      tabIndex={-1}
      aria-labelledby="drawer-navigation-label"
    >
      <DrawerHeader text={"A level Computer Science P3"} />
      <button
        type="button"
        data-drawer-hide="drawer-navigation"
        aria-controls="drawer-navigation"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <div className="py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <Link2Dropdowns headerText={"Data Representation"} link1={"#"} link2={"#"} text1={"User Defined Data Types"} text2={"Floating Point"} />
          <LargeLink href="#" text="Chapter1" />
          <LargeLink href="#" text="Chapter2" />
          <LargeLink href="#" text="Chapter3" />
          <LargeLink href="#" text="Chapter4" />
          <LargeLink href="#" text="Chapter5" />
          <LargeLink href="#" text="Chapter6" />
        </ul>
      </div>
    </div>
  </>
  
  )
}
