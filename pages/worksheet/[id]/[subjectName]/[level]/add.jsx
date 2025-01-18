import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import { useSession, useUser } from '@supabase/auth-helpers-react'
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { supabase } from 'utils/supabase';
import data from "public/chapters.json"
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import path from 'path';
import { promises as fs } from 'fs';
import Link from 'next/link';
import papers from "public/paperNumbers.json"

 async function updateSupabase(object, table, field, worksheetID) {

  const { data: existingData, error: existingError } = await supabase
    .from(table)
    .select(field)
    .eq('id', worksheetID)
    .single();

  if (existingError) {
    console.error(`Error retrieving existing ${field}:`, existingError);
    return;
  }
  const newData = { ...existingData };
  const data2 = newData[field] || [];

    newData[field] = [...data2, object];
    console.log(newData);
  const { data, error } = await supabase
    .from(table)
    .update(newData)
    .eq('id', worksheetID)

  if (error) {
    console.error(`Error updating ${field}:`, error);
    return;
  }

  console.log(`${field} updated successfully!`);
}

    function SubjectPage({searchArray}) {
      const user = useUser()
        const [questionsAvailable, setQuestionsAvailable] = useState(searchArray)
        const [isTeacher, setIsTeacher] = useState(false)
        const [bannerShown, setBannerShown] = useState(false)

        const session = useSession()

        const router = useRouter()
        const data2 = router.query;
        const subject = data2.subjectName
        const worksheetID = data2.id
        const level = data2.level
        let level2 = ''
        if (level === 'AS' || level === 'A2'){
           level2 = 'A-level'
        }
        else if (level === 'IGCSE'){
           level2 = 'IGCSE'
        }
        const filteredData = data.filter(item => (item.subject === subject) && (item.level2 === level));

        useEffect(() => {
          async function getQuestions() {
            if (session) {
              // Check if user and user.id are defined
              let { data, error, status } = await supabase
                .from('worksheets')
                .select(`questions`)
                .eq('id', worksheetID)
                //.single();
      
              if (error && status !== 406) {
                throw error;
              }
        
              if (data) {
                const solvedQuestions = data.questions ? data.questions.map((question) => question.questionName) : [];
              
                const updatedQuestionsAvailable = questionsAvailable.filter(
                  (question) => !solvedQuestions.some((solvedQuestion) => solvedQuestion === question.questionName)
                );
              
                setQuestionsAvailable(updatedQuestionsAvailable);
              }
            }
          }
          async function getInitial() {
            if (user && user.id) {
              // Check if user and user.id are defined
              let { data, error, status } = await supabase
                .from('profiles')
                .select(`*`)
                .eq('id', user.id)
                .single();
      
              if (error && status !== 406) {
                throw error;
              }
        
              if (data.isTeacher === true) {
                setIsTeacher(true)
              }
              }
            }
          getInitial()
          getQuestions(); // Call the function
        }, [worksheetID, session, user, questionsAvailable]);
  
      if (filteredData.length === 0) {
        throw new Error('chapters not found');
      }
  
      const chapters = filteredData;

      const years = [
        {id: 2017, name : "2017"},
        {id: 2018, name : "2018"},
        {id: 2019, name : "2019"},
        {id: 2020, name : "2020"},
        {id: 2021, name : "2021"},
        {id: 2022, name : "2022"},
        {id: 2023, name : "2023"},
      ]
      const filteredPapers = papers.filter(item => (item.subject === subject) && (item.level2 === level));

        const [questionArray, setquestionArray] = useState([]);
        const [chapterValue, setChapterValue] = useState(0);
        const [paperValue, setPaperValue] = useState(0);
        const [questionText, setQuestionText] = useState('')
        const [yearValue, setYearValue] = useState(0);


        async function addAQuestion(question) {
          setBannerShown(true)        
          await updateSupabase(question, 'worksheets', 'questions', worksheetID);
        
          const updatedAvailableArray = questionsAvailable.filter((obj) => obj.questionName !== question.questionName);
          setQuestionsAvailable(updatedAvailableArray);
        
          const updatedQuestionArray = questionArray.filter((obj) => obj.questionName !== question.questionName);
          setquestionArray(updatedQuestionArray);
          await timeout(3500)
          setBannerShown(false)
        }

        function timeout(delay) {
          return new Promise( res => setTimeout(res, delay) );
      }
          async function reset() {
            setChapterValue(0)
            setPaperValue(0)
            setquestionArray([])
            setQuestionText('')
            setYearValue(0)
            }
            const filteredQuestionsRef = useRef();

            useEffect(() => {
              // Filtering logic
              let tempFilteredQuestions = questionsAvailable;

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
              setquestionArray(tempFilteredQuestions);
            }, [questionText, chapterValue, paperValue, yearValue]);
    return (
      <>
        <Head>
          <title>Search for a question or a keyword</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    `}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        {bannerShown &&
        <div className="bg-indigo-600 mt-12 w-full fixed px-4 py-3 text-white">
        <p className="text-center text-lg font-semibold">
          Added !
        </p>
      </div>
        }
        {isTeacher ? (
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
                <div className="flex justify-around flex-col sm:flex-row flex-wrap mt-12 gap-4">
                <button onClick={reset} className="text-white transition-all ease-out bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800">
                  Reset
                </button>
                <button className="text-white transition-all ease-out bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                  <Link href={`/worksheet/${worksheetID}`}>
                  Save and Quit
                  </Link>
                </button>
                </div>
                </div>
                </div>
                <div className="flex flex-col items-center gap-32 mt-32 mb-20">
                {questionArray.map((question) => {
                  const paperNumber = question.questionNumber ? "long" : `p${question.paperNumber}`;
                  const imageUrl = `https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/${level2}/${question.Subject}/${paperNumber}/${question.Chapter}/${question.questionName}`;

                  return (
                    <div key={question.questionName} className='flex'>
                      <div className='border border-8 border-green-600 p-2 rounded rounded-2xl'>
                        <Image
                          key={question.questionName}
                          className='rounded rounded-md'
                          src={imageUrl}
                          alt='image'
                          height={800}
                          width={800}
                        />
                      </div>
                      <AddIcon
                        onClick={() => addAQuestion(question)}
                        key={question.questionName}
                        fontSize="large"
                        className='ml-4 md:ml-8 mt-24 cursor-pointer ease-out transition-all hover:bg-gray-200 bg-gray-400 rounded rounded-xl'
                      />
                    </div>
                  );
                })}
        </div>
        </div>
        ) : (
          <h1 className='mt-20 flex justify-center text-4xl text-white'>Hey, you {"don't"} seem to be a teacher</h1>
        )
        }
      </>
    );
    
  }
  export async function getServerSideProps({ params }) {
    try {
      const filePath = path.join(process.cwd(), 'public', `all.json`);
      const fileData = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileData);
  
      const filteredData = data.filter((question) => (question.Subject === params.subjectName) && (question.Level === params.level));
  
      if (filteredData.length === 0) {
        throw new Error('Chapters not found');
      }
  
      const searchArray = filteredData;
  
      return {
        props: {
          searchArray,
        },
      };
    } catch (error) {
      console.error(`Error reading JSON file: ${error}`);
      return {
        props: {
          searchArray: null,
        },
      };
    }
  }

export default SubjectPage