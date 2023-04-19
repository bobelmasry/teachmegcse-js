import "flowbite";
import Link from "next/link";

export default function SubjectCard({linkSrc, header}) {
    return (
      <div>
      <Link href={`/A-level/${linkSrc}`}>
      <div className="btn dark:shadow-[0_9px_0_rgb(3,175,261)] shadow-[0_9px_0_rgb(3,105,161)] hover:shadow-[0_4px_0px_rgb(3,105,161)] text-black bg-white ease-out hover:translate-y-1 transition-all rounded block w-72 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-32">
    <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{header}</h5>
    </div>
    </Link>
      </div>
    )
};