import "flowbite";
import Link from "next/link";

export default function YearCard({linkSrc, header}) {
    return (
      <div>
      <Link href={`${linkSrc}`}>
      <div className="btn shadow-[0_11px_0_rgb(3,105,161)] hover:shadow-[0_4px_0px_rgb(3,105,161)] ease-out hover:translate-y-1 transition-all rounded block w-72 p-6 border rounded-xl shadow bg-gray-600 dark:border-gray-700 hover:bg-gray-500 h-32">
    <h5 className="text-3xl font-semibold tracking-tight text-white">{header}</h5>
    </div>
    </Link>
      </div>
    )
  };