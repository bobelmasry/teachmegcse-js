import Link from "next/link"

export default function Pricing () {
    return (
        <>
        <div>
  <div className="container px-6 py-8 mx-auto mt-24">
    <h1 className="text-3xl sm:text-5xl font-semibold text-center text-gray-800 capitalize dark:text-white">
      Pricing Plan
    </h1>
    <div className="flex justify-center gap-8 mt-6 xl:mt-12 xl:gap-12">
      <div className="w-11/12 dark:bg-slate-800/70 md:w-3/6 lg:w-5/12 p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700">
        <p className="font-medium text-gray-500 uppercase dark:text-gray-300">
          Premium
        </p>
        <h2 className="text-4xl font-semibold text-gray-800 uppercase dark:text-gray-100">
          $5
        </h2>
        <p className="font-medium text-gray-500 dark:text-gray-300">
          Per Month
        </p>
      <Link href="/login-or-signup">
        <button className="w-full text-lg hover:scale-[1.01] transition-all ease-out px-4 py-2 mt-10 tracking-wide text-white capitalize bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          Start Now
        </button>
      </Link>
      </div>
    </div>
  </div>
</div>

        </>
    )
}