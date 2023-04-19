import "flowbite";
import  Sidebar  from "../components/sidebar.jsx";
import  Navbar  from "../components/navbar.jsx";
import Head from "next/head.js";
import Table from "../components/table.jsx";

export default function Home() {
  return (
  <>
  <Head>
    <title>teachmegcse</title>
  </Head>
    <Navbar />
    <div className="mt-28 sm:ml-8 ml-2">
        <h1 className="sm:text-4xl font-bold text-3xl">October/November 2022</h1>
        <div className="mt-10 md:w-4/5 lg:w-2/5">
        </div>
    </div>
  </>
  )
}
