import Head from 'next/head';
import Navbar from "@/components/navbar.jsx"
import "flowbite"
import Headstuff from "@/components/headstuff.jsx"
import Image from 'next/image';
import { useSession, useUser } from '@supabase/auth-helpers-react'
import chapters from "@/public/chapters.json"
import fs from 'fs/promises';
import path from 'path';
import { useState, useEffect} from 'react';
import { supabase } from '@/components/utils/supabase';
import { updateSupabase } from '@/components/utils/updateSupabase'
import Link from 'next/link';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

    function SubjectPage({questionArray, subjectName, Chapter, type}) {

        const user = useUser()

        function AnswerButton({name}){
          return (
            <button
                id={name}
                onClick={handleAnswer}
                className="inline-block rounded border bg-slate-600 text-white border-gray-500 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-sky-500 focus:outline-none focus:ring"
                >
                {name}
                </button>
          )
        }

        //now for interactive element
        const [initialGotten, setinitialGotten] = useState(false)
        const [questionsFinished, setQuestionsFinished] = useState(false)
        const [firstQuestion, setFirstQuestion] = useState(true)
        const [actualQuestionsSolved, setActualQuestionsSolved] = useState([])
        const [remainingQuestions, setRemainingQuestions] = useState([])
        const [selectedExplanation, setSelectedExplanation] = useState("");

        const [randInt, setrandInt] = useState(Math.floor(Math.random() * remainingQuestions.length));

        async function updateRandInt() {
          if (remainingQuestions.length <= 0) {
            setQuestionsFinished(true);
          } else {
            updateRemaining2();
            let newVal = Math.floor(Math.random() * (remainingQuestions.length - 1));
            setrandInt(newVal);
            setcorrect(false);
            setnotalreadySolved(true);
          }
        }

        useEffect(() => {
          async function getInitial() {
            if (!initialGotten) {
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
        
              if (data) {
                setActualQuestionsSolved(data.questionsSolved);
                setinitialGotten(true);
              }
              }
            }
          }
          async function updateRemaining () {
            if (firstQuestion){
              setRemainingQuestions(questionArray.filter((obj2) => {
                return !actualQuestionsSolved?.some((obj1) => obj1.QuestionName?.toString() === obj2.questionName.toString());
                
              })) // Update remainingQuestions when questionArray prop changes
            }
            }
            getInitial(); // Call the function
            updateRemaining()
            if (remainingQuestions.length <= 0) {
            setQuestionsFinished(true)
          }
          else {
            setQuestionsFinished(false)
          }
        }, [initialGotten, subjectName, user, questionArray, firstQuestion, actualQuestionsSolved, remainingQuestions.length]);
        
        async function resetQuestions() {
          for (let i = 0; i < actualQuestionsSolved.length; i++) {
            if (
              actualQuestionsSolved[i].Chapter.toString() === Chapter.toString() &&
              actualQuestionsSolved[i].Subject.toString() === subjectName.toString() &&
              actualQuestionsSolved[i].Level.toString() === questionArray[0].Level.toString()
            ) {
              actualQuestionsSolved.splice(i, 1);
              i--; // Decrement i to account for the removed element
            }
          }
          const { data, error } = await supabase
               .from('profiles')
               .update({
                 questionsSolved: actualQuestionsSolved
               })
               .eq('id', user.id);
           
             if (error) {
               console.error('Error updating questionsSolved:', error);
               return;
             }
          setRemainingQuestions(questionArray)
          }   

        const [correct, setcorrect] = useState(false)
        const [notalreadySolved, setnotalreadySolved] = useState(true)
        
        const currentQuestion = remainingQuestions[randInt];

        const questionName = currentQuestion?.questionName;
        const answer = currentQuestion?.Answer;
        const chapter = currentQuestion?.Chapter;
        const subject = currentQuestion?.Subject;
        const paperNumber = currentQuestion?.paperNumber;
        const source = currentQuestion?.pdfName;
        let level = currentQuestion?.Level === 'AS' ? 'A-level' : currentQuestion?.Level;

        async function updateRemaining2() {
          const updatedArray = remainingQuestions.filter((obj) => obj.questionName !== questionName);
          setRemainingQuestions(updatedArray)
        }

        const session = useSession()
        const chapterString = chapters.filter(item => (item.id === questionArray[0].Chapter) && (item.subject === questionArray[0].Subject) && (item.level2 === questionArray[0].Level));
        const chapterString2 = chapterString[0].name

        async function handleAnswer(event) {
            event.preventDefault();
            setnotalreadySolved(false)
            setFirstQuestion(false)
            let explanation;
            if (event.target.id === "A") explanation = currentQuestion?.ExplanationA;
            if (event.target.id === "B") explanation = currentQuestion?.ExplanationB;
            if (event.target.id === "C") explanation = currentQuestion?.ExplanationC;
            if (event.target.id === "D") explanation = currentQuestion?.ExplanationD;
          
            setSelectedExplanation(explanation); // Set the explanation for the clicked answer

            if (event.target.id === answer && !questionsFinished){
              setcorrect(true)
              const dataToUpdate = {
                PaperNumber: currentQuestion.paperNumber,
                Chapter: currentQuestion.Chapter,
                QuestionName: currentQuestion.questionName,
                Subject : currentQuestion.Subject,
                Correct : true,
                Level : currentQuestion.Level
              }
                updateSupabase(dataToUpdate, 'profiles', 'questionsSolved', user)
            } else {
              const dataToUpdate = {
                PaperNumber: currentQuestion.paperNumber,
                Chapter: currentQuestion.Chapter,
                QuestionName: currentQuestion.questionName,
                Subject : currentQuestion.Subject,
                Correct : false,
                Level : currentQuestion.Level
              }
                updateSupabase(dataToUpdate, 'profiles', 'questionsSolved', user, null, null, false)
                }
            }
          
            const title = `${level} ${questionArray[0].Subject} Topic Questions ${chapterString2}`
            const str = title;
            const str2 = str.charAt(0).toUpperCase() + str.slice(1);

    return (
      <>
        <Head>
          <title>{str2}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, ${level} revision notes, ${level} past papers, ${level} topic questions`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        {session ? ( 
        <>
        <div className="mb-12">
            {(!questionsFinished) &&
            <>
            <div className="flex flex-col items-center gap-24 mt-32 mb-24">
                <h1 className='text-3xl ml-8 md:ml-0 sm:text-5xl font-bold text-white mb-8'>{chapterString2} Topic Questions</h1>
                <div className='border ml-2 md:ml-0 border-4  md:border-8 border-green-600 p-2 rounded rounded-2xl'>
                <Image className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/${level}/${subject}/p${paperNumber}/${chapter}/${questionName}`} alt='image' height={800} width={800} /> 
                </div>
            </div>
                {notalreadySolved && 
                <div className="flex ml-6 md:ml-0 flex-wrap justify-center gap-8">
                    <AnswerButton name={"A"} />
                    <AnswerButton name={"B"} />
                    <AnswerButton name={"C"} />
                    <AnswerButton name={"D"} />
                </div>
                }
                <div className="flex ml-8 md:ml-0 flex-flow justify-center gap-8 mt-8">
                {(correct && !notalreadySolved) && (
                      <div className="max-w-xl w-full mx-auto text-center">
                        <div className="dark:text-white text-lg sm:text-lg md:text-xl lg:text-2xl">
                          <span className="text-green-400">Correct</span>: the Answer is {answer}
                          <br /> Explanation: <Latex>{selectedExplanation}</Latex> <br />
                          Source: {source} <br />
                          <br /> Disclaimer: {"there's"} a 2% chance that the answer is incorrect <br />
                          Disclaimer 2: {"there's"} a 5% chance that the question is not in the syllabus
                        </div>
                      </div>
                    )}
                    {(!correct && !notalreadySolved) && (
                      <div className="max-w-xl w-full mx-auto text-center">
                        <div className="dark:text-white text-lg sm:text-lg md:text-xl lg:text-2xl">
                          <span className="text-red-600">Incorrect</span>: the Answer is {answer}
                          <br /> Explanation: <Latex>{selectedExplanation}</Latex> <br />
                          Source: {source} <br />
                          <br /> Disclaimer: {"there's"} a 2% chance that the answer is incorrect <br />
                          Disclaimer 2: {"there's"} a 5% chance that the question is not in the syllabus
                        </div>
                      </div>
                    )}
            </div>
            <div className="flex flex-flow justify-center mt-20 ml-60 md:ml-96">
            <button
                    id='Next'
                    onClick={updateRandInt}
                    className="inline-block rounded border border-blue-500 bg-blue-600 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-blue-500"
                    >
                    Next
            </button>
            </div>
            </>
          }
            {questionsFinished && 
            <>
            <div className="flex flex-flow justify-center mt-20">
              <h1 className='text-3xl ml-8 md:ml-0 sm:text-5xl font-bold text-white mb-8'>You{"'"}ve finished all of the Questions !</h1>
            </div>
            <div className="flex gap-8 flex-flow justify-center mt-20">
            <button
                    className="inline-block rounded border border-blue-500 bg-blue-600 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-blue-500"
                    >
                      <Link href={`/${level}/${subjectName}/topic-questions/solve`}>
                    Go Back
                    </Link>
            </button>
            <button onClick={resetQuestions}
                    className="inline-block rounded border border-blue-500 bg-blue-600 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-blue-500"
                    >
                    Reset
            </button>
            </div>
            <div className="flex flex-flow justify-center mt-20">
            </div>
            </>
            }
        </div>
        </>
    ) : (
      <>
        <div className="flex flex-flow justify-center mt-32">
          <h1 className='text-center text-3xl md:ml-0 sm:text-5xl font-bold text-white'>You{"'"}re not logged in / signed up</h1>
        </div>
        <div className="flex flex-flow justify-center mt-20">
          <h1 className='text-center text-3xl md:ml-0 sm:text-5xl font-bold text-white'>It{"'"}s free</h1>
        </div>

        <div className="flex flex-flow justify-center mt-16">
        <button
                className="inline-block rounded border border-blue-500 bg-blue-600 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-blue-500"
                >
                  <Link href={"/login-or-signup"}>
                Sign up / Login
                </Link>
        </button>
        </div>
        </>
    )
    }
      </>
    );
    
  }

  export async function getStaticProps({ params }) {
    let type = params.type;
    let paperNumber = 0;
  
    // Determine the paper number based on the type
    if (type === 'core') {
      paperNumber = 1;
    } else if (type === 'extended') {
      paperNumber = 2;
    }
  
    try {
      // Query the Supabase database
      let query = supabase
        .from('questions')
        .select('*')
        .eq('Subject', params.subjectName)
        .eq('Chapter', params.chapterNum);
  
      if (paperNumber === 0) {
        query = query.like('Level', '%A%');
      } else {
        query = query.eq('paperNumber', paperNumber).like('Level', '%I%');
      }
  
      const { data, error } = await query;
  
      // Handle Supabase errors
      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Failed to fetch questions from the database.');
      }
  
      // Handle no data found
      if (!data || data.length === 0) {
        throw new Error('Questions not found.');
      }
  
      const questionArray = data;
  
      return {
        props: {
          questionArray,
          subjectName: params.subjectName,
          chapterNum: params.chapterNum,
          type: params.type,
        },
      };
    } catch (err) {
      console.error('Error fetching data:', err.message);
      return {
        props: {
          questionArray: [],
          subjectName: params.subjectName,
          chapterNum: params.chapterNum,
          type: params.type,
        },
      };
    }
  }
  

  export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'public', 'chapters.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);
  
    // Filter data for IGCSE and A-level
    const IGData = data.filter(question => (question.level === 'IGCSE') && (question.hasSolve === true));
    const A_data = data.filter(question => (question.level === 'A-level') && (question.hasSolve === true));
  
    // Map paths for IGCSE Core with chapterNum
    const IGCorePaths = IGData.map(question => ({
      params: {
        subjectName: question.subject.toString(),
        level: question.level.toString(),
        type: 'core',
        chapterNum: question.id?.toString() || 'unknown'
      }
    }));
  
    // Map paths for IGCSE Extended, excluding Economics
    const IGExtendedPaths = IGData
      .filter(question => question.subject.toLowerCase() !== 'economics') // Exclude Economics
      .map(question => ({
        params: {
          subjectName: question.subject.toString(),
          level: question.level.toString(),
          type: 'extended',
          chapterNum: question.id?.toString() || 'unknown'
        }
      }));
  
    // Map paths for A-level with chapterNum
    const ALevelPaths = A_data.map(question => ({
      params: {
        subjectName: question.subject.toString(),
        level: question.level.toString(),
        type: 'a',
        chapterNum: question.id?.toString() || 'unknown'
      }
    }));
  
    // Combine all paths
    const paths = [...IGCorePaths, ...IGExtendedPaths, ...ALevelPaths];
  
    return { paths, fallback: false };
  }

export default SubjectPage