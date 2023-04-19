import "flowbite";
import Link from "next/link";

export default function TopicCard({linkSrc, header}) {
    return (
      <div>
      <div className="shadow shadow-xl shadow-blue-100 text-black bg-white ease-out hover:translate-y-1 transition-all rounded block p-6 bg-gray-50 border border-gray-400 rounded-xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 sm:w-96 w-80">
    <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{header}</h5>
    </div>
      </div>
    )
  };