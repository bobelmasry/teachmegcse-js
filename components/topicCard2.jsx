import "flowbite";
import Link from "next/link";

export default function TopicCard2({linkSrc, header, hasSignIn}) {
  return (
    <div>
    <Link href={`${linkSrc}`}>
    <div className="btn flex justify-center shadow-[0_7px_0_0px_rgb(3,105,161)] md:hover:scale-[1.02] ease-out transition-all rounded block p-6 bg-gray-50 border border-gray-200 rounded-lg shadow md:hover:bg-gray-100 dark:bg-slate-600 dark:border-gray-600 md:dark:hover:bg-gray-500">
  <h5 className="text-3xl font-semibold text-gray-900 dark:text-white">{header}</h5>
  {(hasSignIn) && 
    <h5 className="text-xl mt-2 ml-2 font-bold text-gray-900 dark:text-white">Sign In to track your progress</h5>
  }
  </div>
  </Link>
    </div>
  )
};