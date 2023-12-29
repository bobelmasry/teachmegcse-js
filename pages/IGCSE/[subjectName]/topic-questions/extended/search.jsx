import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import { useSession } from '@supabase/auth-helpers-react'
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import fs from 'fs/promises';
import path from 'path';
import data from "public/chapters.json"
import { useRouter } from 'next/router';

    function SubjectPage({searchArray}) {
        const session = useSession()
        const [chapterValue, setChapterValue] = useState(0);
        const [questionText, setQuestionText] = useState('')
        const router = useRouter();
        const data2 = router.query;
        const subject = data2.subjectName

        const [questionArray, setQuestionArray] = useState(searchArray);
        const handleToggleAnswer = (questionName) => {
          setQuestionArray((prevQuestions) =>
            prevQuestions.map((question) =>
              question.questionName === questionName
                ? { ...question, showAnswer: !question.showAnswer }
                : question
            )
          );
        };
        

        const filteredData = data.filter(item => (item.subject === subject) && (item.level === 'IGCSE'));
  
      if (filteredData.length === 0) {
        throw new Error('chapters not found');
      }
  
      const chapters = filteredData;

      const filteredQuestionsRef = useRef();


      useEffect(() => {
        // Filtering logic
        let tempFilteredQuestions = searchArray;

        if (questionText) {
          tempFilteredQuestions = tempFilteredQuestions.filter(question => question.questionText.includes(questionText));
        }

        if (chapterValue !== 0) {
          tempFilteredQuestions = tempFilteredQuestions.filter(question => question.Chapter.toString() == chapterValue.toString());
        }

        // Limit the results to the first 100 items
        tempFilteredQuestions = tempFilteredQuestions.slice(0, 100);

        // Store filteredQuestions in the ref
        filteredQuestionsRef.current = tempFilteredQuestions;

        // Update the state with the filtered questions
        setQuestionArray(tempFilteredQuestions);
      }, [questionText, chapterValue]);

      async function reset() {
        setChapterValue(0)
        setQuestionArray(searchArray)
        setQuestionText('')
        }

    return (
      <>
        <Head>
          <title>Search for a question or a keyword</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, IGCSE revision notes, IGCSE past papers, IGCSE topic questions, 
    `}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="mt-40 mb-20">
            <div className='flex justify-center'>
                <div className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6">
                  <div className=""></div>
                    <h1 className='text-3xl mb-12 font-bold text-white'>Search for a question or a keyword</h1>
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
                    onChange={(event) => setQuestionText(event.target.value)}
                    value={questionText}
                    />
                </div>
                <div className="flex justify-around flex-col sm:flex-row flex-wrap mt-4">
                <div className="w-4/6 sm:w-3/6 md:w-2/6 lg:w-1/8">
                <label htmlFor="chapters" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Choose a Chapter</label>
                <select id="chapters" value={chapterValue} onChange={(event) => setChapterValue(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option id='0' value={0} defaultValue={true}>All Chapters</option>
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>{chapter.name}</option>
                ))}
                </select>
                </div>
                <div className="mt-10">
                <button onClick={reset} className="text-white transition-all ease-out bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800">
                  Reset
                </button>
                </div>
                </div>
                </div>
                </div>
                <div className="flex flex-col items-center gap-32 mt-32 mb-20">
                {questionArray.map((question) => (
                <div key={question.questionName}>
                  <div key={question.questionName} className='border border-8 border-green-600 p-2 rounded rounded-2xl'>
                      <Image key={question.questionName} className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/IGCSE/${question.Subject}/p${question.paperNumber}/${question.Chapter}/${question.questionName}`} alt='image' height={800} width={800} />
                  </div>
                  <button onClick={() => handleToggleAnswer(question.questionName)} className="mt-4 text-xl text-white transition-all ease-out bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800">
                      {question.showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </button>
                    {question.showAnswer && (
                    <div className="mt-2 flex text-white">
                      <div>
                        <p className="text-xl font-bold text-white">Answer:</p>
                        <p className='text-white text-xl'>{question.Answer}</p>
                      </div>
                      <div className='ml-8'>
                        <p className="text-xl font-bold text-white">Source:</p>
                        <p className='text-white text-xl'>{question.pdfName}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
        </div>
        </div>
      </>
    );
    
  }
  export async function getStaticProps({ params }) {
    try {
      const filePath = path.join(process.cwd(), 'public', `all.json`);
      const fileData = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileData);
  
      const filteredData = data.filter(question => (question.Level == 'IGCSE') && (question.paperNumber == 2) && (question.Subject === params.subjectName));
  
      if (filteredData.length === 0) {
        throw new Error('questions not found');
      }
  
      const searchArray = filteredData;
  
      return {
        props: {
            searchArray
        }
      };
    } catch (error) {
      console.error(`Error reading JSON file: ${error}`);
      return {
        props: {
            searchArray: null
        }
      };
    }
  }

  export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'public', 'chapters.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    const paths = data.map(question => ({
      params: { subjectName: question.subject.toString()}
    }));
    return { paths, fallback: false };
  }

export default SubjectPage