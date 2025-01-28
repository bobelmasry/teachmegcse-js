import "flowbite";
import Head from 'next/head';
import Navbar from "@/components/navbar.jsx"
import Headstuff from "@/components/headstuff.jsx"
import { useSession } from '@supabase/auth-helpers-react'

const Home = () => {
  const session = useSession()
  return (
    <>
    <Head>
    <title>Contact Us | exceed</title>
    <meta name="description" content="Contact Us Page"></meta>
    <meta name="keywords" content="exceed, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
    <Headstuff />
  </Head>
  <Navbar session={session} />
    <div className="flex justify-center">
        <div className="w-3/4 sm:w-2/4 mt-36">
            <h1 className="text-5xl dark:text-white">Our Roadmap:</h1>
            <ul className="list-disc pl-5 mt-8 text-2xl dark:text-white">
                <li>
                    Fix misaligned question numbers and answers in long answers 
                    (e.g., question 2 has the answer for question 1).
                </li>
                <li>
                    Fix cropping of mcq topic questions that have images.
                </li>
                <li>
                    Fix multiple questions in 1 image in long answers.
                </li>
                <li>
                    Add long answer questions for all subjects.
                </li>
                <li>
                    Add notes for all subjects.
                </li>
                <li>
                    Add ability to add long answer questions to classes with the teacher giving the score (e.g 3/5).
                </li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default Home