import { useSession, useUser } from '@supabase/auth-helpers-react'
import Head from 'next/head';
import Navbar from "@/components/navbar.jsx"
import Headstuff from "@/components/headstuff.jsx"
import "flowbite"
import { supabase } from '@/components/utils/supabase';
import Image from 'next/image';
import { useState, useEffect } from 'react';


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

 export default function ClassPage({ assignmentData }) {
    const session = useSession()
    const user = useUser()
    const [solved, setSolved] = useState(false)
    const [isTeacher, setIsTeacher] = useState(false)
    const [solvedPreviously, setSolvedPreviously] = useState(false)
    const [solvedPreviouslyData, setSolvedPreviouslyData] = useState(null)
    const [studentInClass, setStudentInClass] = useState(false)
    const [activeOptions, setActiveOptions] = useState({});
    const arrayLength = assignmentData.questions.length;
    const [questionsCorrect, setQuestionsCorrect] = useState(0)

    async function handleAnswer(questionName, option) {
        setActiveOptions((prevState) => ({
          ...prevState,
          [questionName]: option,
        }));          
    }

    async function handleSubmit() {
        let correctAnswers = 0
        for (let i = 0; i < arrayLength; i++) {  // Fix loop condition: i < arrayLength
          if (activeOptions[assignmentData.questions[i].questionName] === assignmentData.questions[i].Answer) {  // Use strict equality (===) for comparison
            correctAnswers ++;
          }
          setQuestionsCorrect(correctAnswers)
        }
        const dataToUpdate = {
          id: user.id,
          Score: correctAnswers,
          numOfQuestions: arrayLength 
        }
        updateSupabase(dataToUpdate, 'assignments', 'completedBy', assignmentData.assignmentID)
        setSolved(true);
      }
    useEffect(() => {
        async function getStudentsInClass() {
            if (user && user.id) {
          try {
            let { data, error, status } = await supabase
              .from('classes')
              .select(`*`)
              .eq('classID', assignmentData.classID)
              .single()
  
            if (error && status !== 406) {
              throw error
            }
  
            if (data) {
              if (user && user.id && (data.students.includes(user.id))){
                setStudentInClass(true)
              }
              else if (user.id === assignmentData.user_id) {
                    setIsTeacher(true)
                  }
              }
          } catch (error) {
            console.log(error)
          }
        }}
  
        getStudentsInClass()
        async function getCompletedBy() {
          if (user && user.id) {
        try {
          let { data, error, status } = await supabase
            .from('assignments')
            .select(`*`)
            .eq('assignmentID', assignmentData.assignmentID)
            .single()

          if (error && status !== 406) {
            throw error
          }

          if (data) {
            const completedUser = data.completedBy.find((userObj) => userObj.id === user.id);
            if (completedUser) {
              setSolvedPreviouslyData(completedUser)
              setSolvedPreviously(true);
            } else {
              setSolvedPreviously(false);
            }
        }
        } catch (error) {
          console.log(error)
        }
      }}

      getCompletedBy()
        }, [assignmentData.assignmentID, assignmentData.classID, assignmentData.user_id, user])

     const title = `${assignmentData.name} - exceed`
    return (
        <>
        <Head>
            <title>{title}</title>
            <meta name="description" content="Class"></meta>
            <meta name="keywords" content="exceed, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
            A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
            <Headstuff />
        </Head>
        <Navbar session={session} />
        {((studentInClass) && (!solvedPreviously)) && (!isTeacher) && 
        <div className="flex flex-col items-center gap-32 mt-32 mb-20">
        <h1 className='text-5xl font-bold mt-20 text-white'>{assignmentData.name} - ({assignmentData.questions.length}) Questions</h1>
        {assignmentData.questions.map((question, index) => (
        <div key={question.questionName}>
            <div key={question.questionName} className='border border-4 md:border-8 border-green-600 p-2 rounded rounded-2xl'>
                <Image key={question.questionName} className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/${question.Level}/${question.Subject}/p${question.paperNumber}/${question.Chapter}/${question.questionName}`} alt='image' height={800} width={800} />
            </div>
            <div className="flex mt-12 md:ml-0 flex-wrap justify-center gap-8">
            {!solved && 
            <>
                <button
                onClick={() => handleAnswer(question.questionName, 'A')}
                className={`inline-block rounded border ${
                    activeOptions[question.questionName] === 'A' ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-600 text-white border-gray-500'
                } px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium hover:bg-sky-500 focus:outline-none focus:ring`}
                >
                A
                </button>

                <button
                onClick={() => handleAnswer(question.questionName, 'B')}
                className={`inline-block rounded border ${
                  activeOptions[question.questionName] === 'B' ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-600 text-white border-gray-500'
              } px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium hover:bg-sky-500 focus:outline-none focus:ring`}
              >
                B
                </button>
                <button
                onClick={() => handleAnswer(question.questionName, 'C')}
                className={`inline-block rounded border ${
                  activeOptions[question.questionName] === 'C' ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-600 text-white border-gray-500'
              } px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium hover:bg-sky-500 focus:outline-none focus:ring`}
              >
                C
                </button>
                <button
                onClick={() => handleAnswer(question.questionName, 'D')}
                className={`inline-block rounded border ${
                  activeOptions[question.questionName] === 'D' ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-600 text-white border-gray-500'
              } px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium hover:bg-sky-500 focus:outline-none focus:ring`}
              >
                D
                </button>
                </>
                }
                <div>
                {solved && (
                <>
                    {activeOptions[assignmentData.questions[index].questionName] === assignmentData.questions[index].Answer ? (
                    <p className='dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl'><span className='text-green-400'>Correct</span>: the Answer is {assignmentData.questions[index].Answer}</p>
                    ) : (
                    <p className='dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl'><span className='text-red-600'>Incorrect</span>: the Answer is {assignmentData.questions[index].Answer} <br /> Source: {assignmentData.questions[index].pdfName}</p>
                    )}
                    <p className='dark:text-white text-lg sm:text-lg md:text-xl lg:text-2xl'>Explanations coming soon ! <br /> Source: {assignmentData.questions[index].pdfName}<br /><br /> Disclaimer: {"there's"} a 2% chance that the answer is incorrect <br />Disclaimer 2: {"there's"} a 5% chance that the question is not in the syllabus </p>
                </>
                )}
                </div>
        </div>
        </div>
        
        ))}
        <div className="flex flex-flow justify-center mt-20 ml-60 md:ml-96">
        {!solved && !isTeacher &&
        <button
                onClick={handleSubmit}
                className="inline-block rounded border border-blue-500 bg-blue-600 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-blue-500"
                >
                Submit
        </button>
        }
        {solved && !isTeacher &&
        <h1 className='text-4xl text-white'>You got : {questionsCorrect} / {arrayLength}</h1>
        }
        </div>
        </div>
        }
        {(!studentInClass && !isTeacher && !solvedPreviously && !solved) && 
            <h1 className='mt-32 flex justify-center text-4xl text-white'>Hey, you {"don't"} seem to be in this class</h1>
        }
        {(solvedPreviously) && 
            <h1 className='mt-32 flex justify-center text-4xl text-white'>Hey, you already solved this assignment, your score was {solvedPreviouslyData.Score} / {arrayLength}</h1>
        }
        {(isTeacher) && 
            <h1 className='mt-32 flex justify-center text-4xl text-white'>Hey, {"you're"} a teacher you {"can't"} solve this, go back and press show questions</h1>
        }
        </>
    )
}


export async function getServerSideProps({ params }) {
    let { data } = await supabase
      .from('assignments')
      .select(`*`)
      .eq('assignmentID', params.assignmentID)
      .single();
  
    if (data.length === 0) {
      throw new Error('Assignment not found');
    }
    
    const assignmentData = data;
  
    return {
      props: { assignmentData },
    };
  }