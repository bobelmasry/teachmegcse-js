import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image';
import Link from 'next/link';
import questions from "public/chemistry_db.json"
import { useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react'


export const supabase = createClient('https://dgunybghtjqbawjpkcvg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRndW55YmdodGpxYmF3anBrY3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMzA3NDcsImV4cCI6MTk5ODYwNjc0N30.YhH31WDmaWw9QZgx4cvu09g4aQojJ6fKer1B8gRnXGM')

    function SubjectPage() {
        const [questionArray, setquestionArray] = useState([]);

        async function handleText(event) {
        event.preventDefault();
        if (event.target.value.length > 3) {
            const filteredQuestions = questions.filter(question =>
            question.questionText.includes(event.target.value)
            ).slice(0, 25);
            setquestionArray(filteredQuestions);
        }
        }
        const session = useSession()

    return (
      <>
        <Head>
          <title>Search for a question or a keyword</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    `}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="mt-40 mb-20">
            <div className='flex justify-center'>
                <div className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6">
                    <h1 className='text-2xl mb-12 font-bold text-white'>Search for a question or a keyword ...</h1>
                <label
                    htmlFor="searchbar"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    </div>
                    <input
                    type="search"
                    id="searchbar"
                    className="block text-md w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="eg : chlorine"
                    onChange={handleText}
                    />
                </div>
                </div>
                </div>
                <div className="flex flex-col items-center gap-32 mt-32 mb-20">
        {questionArray.map((question) => (
        <>
            <div key={question.questionName} className='border border-8 border-green-600 p-2 rounded rounded-2xl'>
                <Link href={`/A-level/${question.Subject}/topic-questions/${question.Chapter}/${question.questionName}`}>
                <Image className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/sortedp1/${question.Chapter}/${question.questionName}`} alt='image' height={800} width={800} />
                </Link>
            </div>
        </>
        ))}
        </div>
        </div>
      </>
    );
    
  }

export default SubjectPage