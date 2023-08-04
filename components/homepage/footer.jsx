import Link from "next/link"
import Image from "next/image"

export default function Footer () {
    return (
        <>
        <footer aria-label="Site Footer" className="mt-32 md:mt-72">
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-500"></hr>
  <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="flex justify-center text-teal-600">
    <Link href="/" className="flex items-center">
      <Image
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8 mr-3"
        alt="Flowbite Logo"
        height={50}
        width={50}
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        teachmegcse
      </span>
    </Link>
    </div>

    <nav aria-label="Footer Nav" className="mt-12">
      <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
        <li>
          <Link className="text-gray-300 transition hover:text-gray-300/60" href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="text-gray-300 transition hover:text-gray-300/60" href="/contact">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  </div>
</footer>
</>
    )
}