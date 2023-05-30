import "flowbite";
import YearCard from "components/yearCard.jsx"
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"

export default function Home() {
  return (
  <div>
  <Head>
    <title>Past Papers | A Levels</title>
    <meta name="description" content="CAIE Past Papers for Cambridge Int'l IGCSE"></meta>
    <meta name="keywords" content="teachmegcse, teach me gcse, IGCSE revision notes, IGCSE past papers, IGCSE topic questions, 
    IGCSE math past papers, IGCSE physics past papers, IGCSE chemistry past papers"></meta>
    <Headstuff />
  </Head>
  <Navbar />
    <div className="flex justify-center items-center">
        <h1 className=" mt-32 font-bold dark:text-white text-4xl">Under Construction ...</h1>
    </div>
  </div>
  )
}