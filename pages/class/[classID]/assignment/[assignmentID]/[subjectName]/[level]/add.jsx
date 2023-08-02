import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import { useSession, useUser } from '@supabase/auth-helpers-react'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from 'utils/supabase';
import data from "public/chapters.json"
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import path from 'path';
import { promises as fs } from 'fs';

 async function updateSupabase(object, table, field, assignmentID) {

  const { data: existingData, error: existingError } = await supabase
    .from(table)
    .select(field)
    .eq('assignmentID', assignmentID)
    .single();

  if (existingError) {
    console.error(`Error retrieving existing ${field}:`, existingError);
    return;
  }

  const newData = { ...existingData };
  const data2 = newData[field] || [];

    newData[field] = [...data2, object];

  const { data, error } = await supabase
    .from(table)
    .update(newData)
    .eq('assignmentID', assignmentID)

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

        const session = useSession()

        const router = useRouter()
        const data2 = router.query;
        const subject = data2.subjectName
        const assignmentID = data2.assignmentID
        const level = data2.level
        const filteredData = data.filter(item => (item.subject === subject) && (item.level2 === level));

        useEffect(() => {
          async function getQuestions() {
            if (session) {
              // Check if user and user.id are defined
              let { data, error, status } = await supabase
                .from('assignments')
                .select(`questions`)
                .eq('assignmentID', assignmentID)
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
        }, [assignmentID, questionsAvailable, session, user]);
  
      if (filteredData.length === 0) {
        throw new Error('chapters not found');
      }
  
      const chapters = filteredData;

      const papers = [
        {
          "id" : 1,
          "name":"Paper 1",
          "subject": "economics",
          "level" : "A-level",
          "level2" : "AS"
        },
        {
          "id" : 3,
          "name":"Paper 3",
          "subject": "economics",
          "level" : "A-level",
          "level2" : "A2"
        },
        {
          "id" : 1,
          "name":"Paper 1",
          "subject": "biology",
          "level" : "A-level",

        },
        {
          "id" : 1,
          "name":"Paper 1",
          "subject": "chemistry",
          "level" : "A-level",
          "level2" : "AS"
        },
        {
          "id" : 1,
          "name":"Paper 1",
          "subject": "physics",
          "level" : "A-level",
          "level2" : "AS"
        }
      ]
      const filteredPapers = papers.filter(item => (item.subject === subject) && (item.level2 === level));

        const [questionArray, setquestionArray] = useState([]);
        const [chapterValue, setChapterValue] = useState(0);
        const [paperValue, setPaperValue] = useState(0);
        const [questionText, setQuestionText] = useState('')

        async function addAQuestion(question) {        
          await updateSupabase(question, 'assignments', 'questions', assignmentID);
        
          const updatedAvailableArray = questionsAvailable.filter((obj) => obj.questionName !== question.questionName);
          setQuestionsAvailable(updatedAvailableArray);
        
          const updatedQuestionArray = questionArray.filter((obj) => obj.questionName !== question.questionName);
          setquestionArray(updatedQuestionArray);
        }

        async function handleText(event) {
          event.preventDefault();
          setQuestionText(event.target.value);
        
          const filteredQuestions = questionsAvailable.filter((question) => {
            const isChapterMatch = chapterValue === 0 || question.Chapter.toString() === chapterValue.toString();
            const isTextMatch = question.questionText.includes(questionText) || questionText === '';
            return isChapterMatch && isTextMatch;
          }).slice(0, 100);
        
          setquestionArray(filteredQuestions);
        }
        
        async function handleSelect(event) {
          event.preventDefault();
          setChapterValue(event.target.value);
          setquestionArray([]);
          setQuestionText('');
        
          const filteredQuestions = questionsAvailable.filter((question) => {
            const isChapterMatch = event.target.value === '0' || question.Chapter.toString() === event.target.value.toString();
            const isTextMatch = question.questionText.includes(questionText) || questionText === '';
            return isChapterMatch && isTextMatch;
          }).slice(0, 100);
        
          setquestionArray(filteredQuestions);
        }
        
        async function handlePaper(event) {
          event.preventDefault();
          setPaperValue(event.target.value);
          setquestionArray([]);
          setQuestionText('');
        
          const filteredQuestions = questionsAvailable.filter((question) => {
            const isPaperMatch = event.target.value === '0' || question.paperNumber.toString() === event.target.value.toString();
            const isTextMatch = question.questionText.includes(questionText) || questionText === '';
            return isPaperMatch && isTextMatch;
          }).slice(0, 100);
        
          setquestionArray(filteredQuestions);
        }

          async function reset() {
            setChapterValue(0)
            setPaperValue(0)
            setquestionArray([])
            setQuestionText('')
            }

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
                    onChange={handleText}
                    value={questionText}
                    />
                </div>
                <div className="flex gap-4">
                  <div className="w-4/6 sm:w-3/6 md:w-2/6 lg:w-1/8">
                    <label htmlFor="chapters" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Choose a Chapter</label>
                    <select value={chapterValue} onChange={handleSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option id='0' value={0} defaultValue={true}>All Chapters</option>
                      {chapters.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>{chapter.name}</option>
                    ))}
                    </select>
                  </div>
                  <div className="w-4/6 sm:w-3/6 md:w-2/6 lg:w-1/8">
                    <label htmlFor="chapters" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Choose a Paper number</label>
                    <select value={paperValue} onChange={handlePaper} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option id='0' value={0} defaultValue={true}>All Papers</option>
                      {filteredPapers.map((paper) => (
                        <option key={paper.id} value={paper.id}>{paper.name}</option>
                    ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-around flex-col sm:flex-row flex-wrap mt-4">
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
        <div key={question.questionName} className='flex'>
            <div className='border border-8 border-green-600 p-2 rounded rounded-2xl'>
                <Image key={question.questionName} className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/A-level/${question.Subject}/p${question.paperNumber}/${question.Chapter}/${question.questionName}`} alt='image' height={800} width={800} />
            </div>
            <AddIcon onClick={() => addAQuestion(question)} key={question.questionName} fontSize="large" className='ml-8 mt-24 cursor-pointer ease-out transition-all hover:bg-gray-200 bg-gray-400 rounded rounded-xl'/>
        </div>
        ))}
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
      const filePath = path.join(process.cwd(), 'public', `${params.subjectName}_db.json`);
      const fileData = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileData);
  
      const filteredData = data.filter((item) => item.Subject === params.subjectName);
  
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