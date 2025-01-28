import Link from "next/link"

export default function Cta() {
    return (
      <section>
    <div className="flex flex-col justify-center mb-8 mt-32 text-center">
        <h2 className="max-w-2xl mx-auto text-4xl font-semibold tracking-tight xl:text-5xl text-white">
            Ready to Get Started ?
        </h2>

        <div className="inline-flex justify-center w-full mt-6 sm:w-auto">
        <Link
          href="/login-or-signup"
          className="hover:scale-[1.02] transition-all ease-out mt-8 inline-block rounded bg-blue-500 px-12 py-3 text-2xl sm:text-3xl font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">
          <p className="hover:scale-[1.02] transition-all ease-out">Yeah !</p>
        </Link>
        </div>
    </div>
</section>
    )
  }
  