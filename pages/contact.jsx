import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import { useSession } from '@supabase/auth-helpers-react'

const Home = () => {
  const session = useSession()
  return (
    <>
    <Head>
    <title>Contact Us | teachmegcse</title>
    <meta name="description" content="Contact Us Page"></meta>
    <meta name="keywords" content="teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
    <Headstuff />
  </Head>
  <Navbar session={session} />
    <div className="flex justify-center">
        <div className="w-3/4 sm:w-2/4 md:w-1/4 mt-36">
            <h1 className="text-5xl dark:text-white">Thank you for wanting to reach out to us !</h1>
            <h1 className="text-4xl mt-12 dark:text-white">Our contact information :</h1>
            <h1 className="text-3xl mt-12 dark:text-white">Ahmed (Head of Sales) ahwaleed154@gmail.com</h1>
            <h1 className="text-3xl mt-12 dark:text-white">Aly (Co-CEO) alyhassan2254@gmail.com</h1>
            <h1 className="text-3xl mt-12 dark:text-white">Amr (Co-CEO) amrobadrcm@gmail.com</h1>
        </div>
    </div>
    </>
  )
}

export default Home