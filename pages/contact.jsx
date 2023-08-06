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
            <h1 className="text-3xl mt-12 dark:text-white">Ahmed (Head of Sales)<br /> <span className="text-2xl"><a className="text-blue-500 hover:text-blue-400" href="mailto:ahwaleed154@gmail.com">ahwaleed154@gmail.com</a><br />+20 01554773333</span></h1>
            <h1 className="text-3xl mt-12 dark:text-white">Aly (Co-CEO)<br /> <span className="text-2xl"><a className="text-blue-500 hover:text-blue-400" href="mailto:alyhassan2254@gmail.com">alyhassan2254@gmail.com</a><br />+20 01011160288</span></h1>
            <h1 className="text-3xl mt-12 dark:text-white">Amr (Co-CEO)<br /> <span className="text-2xl"><a className="text-blue-500 hover:text-blue-400" href="mailto:amrobadrcm@hotmail.com">amrobadrcm@hotmail.com</a></span></h1>
        </div>
    </div>
    </>
  )
}

export default Home