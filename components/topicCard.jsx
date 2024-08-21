import "flowbite";
import Link from "next/link";

export default function TopicCard({linkSrc, header, amountSolved, totalAmount}) {
  return (
    <div>
    <Link href={`${linkSrc}`}>
    <div className="btn shadow-[0_7px_0_0px_rgb(3,105,161)] md:hover:scale-[1.05] ease-out transition-all rounded block p-6 bg-gray-50 border border-gray-200 rounded-lg shadow md:hover:bg-gray-100 dark:bg-slate-600 dark:border-gray-600 md:dark:hover:bg-gray-500">
  <h5 className="text-2xl font-semibold text-gray-900 dark:text-white">{header}</h5>
  <h5 className="text-xl mt-2 font-bold text-gray-900 dark:text-white">{amountSolved} / {totalAmount} Solved</h5>
  </div>
  </Link>
    </div>
  )
};