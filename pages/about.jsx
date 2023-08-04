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
    <title>About | teachmegcse</title>
    <meta name="description" content="About Page"></meta>
    <meta name="keywords" content="teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
    <Headstuff />
  </Head>
  <Navbar session={session} />
    <div className="flex justify-center">
        <div className="w-3/4 sm:w-2/4 md:w-1/4 mt-36 mb-20">
            <h1 className="text-5xl dark:text-white">Welcome to teachmegcse.</h1>
            <p className="mt-20 text-2xl dark:text-white">We{"'"}re passionate about transforming education for IGCSE and A-level students. Founded by two visionary individuals, Aly and Amr, our journey began with a shared goal to create a learning platform that empowers students to achieve their academic dreams.</p>
            <p className="mt-20 text-2xl dark:text-white">With years of experience in education and a deep understanding of the challenges students face, we envisioned a platform that goes beyond traditional learning methods. We wanted to provide a comprehensive and personalized approach that caters to the diverse needs of every student.</p>
            <p className="mt-20 text-2xl dark:text-white">Join us on this transformative educational journey and unlock your true potential. Empower yourself with knowledge, gain confidence, and achieve academic excellence with teachmegcse.</p>
            <p className="mt-20 text-2xl dark:text-white">Thank you for being a part of our story.<br />Aly and Amr<br />Co-founders, teachmegcse</p>
            <p className="mt-20 text-2xl dark:text-white">Feel free to reach out to us<br />Aly : alyhassan2254@gmail.com<br /> Amr : amrobadrcm@hotmail.com</p>
        </div>
    </div>
    </>
  )
}

export default Home