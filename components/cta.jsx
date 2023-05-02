import Link from "next/link"

export default function Cta() {
    return (
      <section>
    <div className="container flex flex-col items-center px-4 py-12 mt-16 mx-auto text-center">
        <h2 className="max-w-2xl mx-auto text-4xl font-semibold tracking-tight text-gray-800 xl:text-5xl dark:text-white">
            Ready to Get Started ?
        </h2>

        <div className="inline-flex justify-center hover:scale-[1.02] transition-all ease-out w-full mt-6 sm:w-auto">
        <Link
          href="/"
          className="mt-8 inline-block rounded bg-blue-500 px-12 py-3 text-2xl sm:text-3xl font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">
          <p>Yeah !</p>
        </Link>
        </div>
    </div>
</section>
    )
  }
  