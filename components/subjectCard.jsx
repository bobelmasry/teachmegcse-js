import "flowbite";
import Link from "next/link";

export default function SubjectCard({ header, revisionNotes, topicQuestions, link1, link2, link3 }) {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-2xl shadow-lg transform transition duration-500 sm:hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-6 font-bold text-gray-900 text-4xl text-center dark:text-white">
          {header}
        </h5>
        <ul className="space-y-6">
          <li>
            <Link href={link1} passHref>
              <div className="flex items-center justify-center p-4 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-green-500 rounded-xl shadow-md transform transition duration-300 hover:shadow-lg hover:from-green-500 hover:to-green-600 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer">
                Past Papers
              </div>
            </Link>
          </li>
          {topicQuestions && (
            <li>
              <Link href={link3} passHref>
                <div className="flex items-center justify-center p-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl shadow-md transform transition duration-300 hover:shadow-lg hover:from-blue-500 hover:to-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer">
                  Topic Questions
                </div>
              </Link>
            </li>
          )}
          {revisionNotes && (
            <li>
              <Link href={link2} passHref>
                <div className="flex items-center justify-center p-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl shadow-md transform transition duration-300 hover:shadow-lg hover:from-purple-500 hover:to-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 cursor-pointer">
                  Revision Notes
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
