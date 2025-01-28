import "flowbite";
import Link from "next/link";

export default function TopicCard({linkSrc, header, amountSolved, totalAmount}) {
  return (
    <div>
    <Link href={`${linkSrc}`}>
    <div className="btn shadow-[0_7px_0_0px_rgb(3,105,161)] md:hover:scale-[1.05] ease-out transition-all rounded block p-6 border rounded-lg shadow bg-slate-600 border-gray-600 md:hover:bg-gray-500">
  <h5 className="text-2xl font-semibold text-white">{header}</h5>
  <h5 className="text-xl mt-2 font-bold text-white">{amountSolved} / {totalAmount} Solved</h5>
  </div>
  </Link>
    </div>
  )
};