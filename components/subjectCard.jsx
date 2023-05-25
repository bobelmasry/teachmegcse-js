import "flowbite";
import Link from "next/link";

export default function SubjectCard({header, revisionNotes, topicQuestions, link1, link2, link3}) {
    return (
      <div>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-7 dark:bg-gray-700 dark:border-gray-700">
  <h5 className="mb-3 font-semibold text-gray-900 text-4xl dark:text-white">
    {header}
  </h5>
  <ul className="mt-12 space-y-5">
    <li>
      <Link
        href={link1}
        className="flex items-center hover:scale-[1.02] transition-all ease-out p-3 text-base font-bold text-gray-900 rounded-lg bg-green-50 hover:bg-green-100 group dark:bg-green-500 dark:hover:bg-green-400 dark:text-white"
      >
        <span className="flex-1 text-xl ml-3 whitespace-nowrap">Past Papers</span>
      </Link>
    </li>
    {revisionNotes && 
    <li>
      <Link
        href={link2}
        className="flex items-center hover:scale-[1.02] transition-all ease-out p-3 text-base font-bold text-gray-900 rounded-lg bg-green-50 hover:bg-green-100 group dark:bg-green-500 dark:hover:bg-green-400 dark:text-white"
      >
        <span className="flex-1 text-xl ml-3 whitespace-nowrap">Revision Notes</span>
      </Link>
    </li>
    }
    {topicQuestions && 
    <li>
      <Link
        href={link3}
        className="flex items-center hover:scale-[1.02] transition-all ease-out p-3 text-base font-bold text-gray-900 rounded-lg bg-green-50 hover:bg-green-100 group dark:bg-green-500 dark:hover:bg-green-400 dark:text-white"
      >
        <span className="flex-1 text-xl ml-3 whitespace-nowrap">Topic Questions</span>
      </Link>
    </li>
    }
  </ul>
</div>

      </div>
    )
};