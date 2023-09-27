import Link from "next/link";

export default function Banner() {
    return (
        <>
  <section className="dark:text-white text-black">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">
          Improve Your Grades.
          <span className="sm:block"> Save Tons of Time. </span>
          <span className="sm:block"> all while having FUN </span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl sm:text-xl/relaxed">
          With teachmegcse get access to 10,000+ Questions that are sorted by
          topic along with our well known Revision Notes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-xl font-medium text-white hover:bg-blue-500 transition-all ease-out hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            href="/login-or-signup"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </section>
  </>
  );
}
