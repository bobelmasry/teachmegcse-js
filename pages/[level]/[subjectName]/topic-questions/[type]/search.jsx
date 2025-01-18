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
import papers from "public/paperNumbers.json"

    function SubjectPage({searchArray, level, subjectName, type}) {
        const session = useSession()
        const [chapterValue, setChapterValue] = useState(0);
        const [questionText, setQuestionText] = useState('')
        const [yearValue, setYearValue] = useState(0);
        const [paperValue, setPaperValue] = useState(0);

        const subject = subjectName

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
        

        const filteredData = data.filter(item => (item.subject === subject) && (item.level === level));
  
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

        if (paperValue !== 0) {
          tempFilteredQuestions = tempFilteredQuestions.filter(question => question.paperNumber == paperValue);
        }

        if (chapterValue !== 0) {
          tempFilteredQuestions = tempFilteredQuestions.filter(question => question.Chapter.toString() === chapterValue);
        }

        if (yearValue !== 0){
          tempFilteredQuestions = tempFilteredQuestions.filter(question => question.year.toString() == yearValue.toString());
        }

        // Limit the results to the first 100 items
        tempFilteredQuestions = tempFilteredQuestions.slice(0, 100);

        // Store filteredQuestions in the ref
        filteredQuestionsRef.current = tempFilteredQuestions;

        // Update the state with the filtered questions
        setQuestionArray(tempFilteredQuestions);
      }, [questionText, chapterValue, paperValue, yearValue]);

      async function reset() {
        setChapterValue(0)
        setPaperValue(0)
        setQuestionArray([])
        setQuestionText('')
        setYearValue(0)
        }

        const years = [
          {id: 2017, name : "2017"},
          {id: 2018, name : "2018"},
          {id: 2019, name : "2019"},
          {id: 2020, name : "2020"},
          {id: 2021, name : "2021"},
          {id: 2022, name : "2022"},
          {id: 2023, name : "2023"},
        ]
        const filteredPapers = papers.filter(item => (item.subject === subjectName) && (item.level === level));
  

    return (
      <>
        <Head>
          <title>Search for a question or a keyword</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, ${level} revision notes, ${level} past papers, ${level} topic questions, 
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
                <div className="flex gap-4">
                  <div className="w-4/6 sm:w-3/6">
                    <label htmlFor="chapters" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Choose a Chapter</label>
                    <select value={chapterValue} onChange={(event) => setChapterValue(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option id='0' value={0} defaultValue={true}>All Chapters</option>
                      {chapters.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>{chapter.name} ({chapter.level2})</option>
                    ))}
                    </select>
                  </div>
                  <div className="w-4/6 sm:w-3/6">
                    <label htmlFor="chapters" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Choose a Paper number</label>
                    <select value={paperValue} onChange={(event) => setPaperValue(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option id='0' value={0} defaultValue={true}>All Papers</option>
                      {filteredPapers.map((paper) => (
                        <option key={paper.id} value={paper.id}>{paper.name}</option>
                    ))}
                    </select>
                  </div>
                  <div className="w-4/6 sm:w-3/6 md:w-2/6 lg:w-1/8">
                <label htmlFor="years" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Choose a Year</label>
                <select id="years" value={yearValue} onChange={(event) => setYearValue(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option id='0' value={0} defaultValue={true}>All Years</option>
                  {years.map((year) => (
                    <option key={year.id} value={year.id}>{year.name}</option>
                ))}
                </select>
                </div>
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
                      <Image key={question.questionName} className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/${level}/${question.Subject}/p${question.paperNumber}/${question.Chapter}/${question.questionName}`} alt='image' height={800} width={800} />
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

      let type = params.type
      let filteredData = []

      if (type === "core") {
         filteredData = data.filter(question => (question.Level == 'IGCSE') && (question.paperNumber == 1) && (question.Subject === params.subjectName));
      }
      else if (type === "extended") {
        filteredData = data.filter(question => (question.Level == 'IGCSE') && (question.paperNumber == 2) && (question.Subject === params.subjectName));
      }
      else if (type === "a") {
        filteredData = data.filter(question => (question.Level == 'AS' || question.Level == 'A2') && (!question.MSName) && (question.Subject === params.subjectName));
      }
  
  
      if (filteredData.length === 0) {
        throw new Error('questions not found');
      }
  
      const searchArray = filteredData;
  
      return {
        props: {
            searchArray, 
            level : params.level,
            subjectName : params.subjectName,
            type : params.type
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
      let data = JSON.parse(fileData);
      let IGData = data.filter(question => question.level == 'IGCSE')
      let A_data = data.filter(question => question.level == 'A-level')
  
  
      let finaljsonData = IGData.map(question => ({
        params: { subjectName: question.subject.toString(), level : question.level.toString(), type : "core" }
      }))
      let finaljsonData2 = IGData.map(question => ({
        params: { subjectName: question.subject.toString(), level : question.level.toString(), type : "extended" }
      }))
      let finaljsonData3 = A_data.map(question => ({
        params: { subjectName: question.subject.toString(), level : question.level.toString(), type : "a" }
      }))
      const finaljsonData4 = finaljsonData.concat(finaljsonData2)
      .concat(finaljsonData3)
  
      const paths = finaljsonData4;
      return { paths, fallback: false };
    }
  
export default SubjectPage