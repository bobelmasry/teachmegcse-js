import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import { useSession, useUser } from '@supabase/auth-helpers-react'
import chapters from "public/chapters.json"
import { useState, useEffect} from 'react';
import TopicCard from "components/topicCard.jsx"
import { supabase } from '../../../../../utils/supabase';

    function SubjectPage({questionArray}) {

        const user = useUser()
        const arrayLength = questionArray.length;
        const [randInt, setrandInt] = useState(0);

        //now for interactive element
        const [initialGotten, setinitialGotten] = useState(false)
        const [questionsSolved, setQuestionsSolved] = useState(0)
        const [questionsCorrect, setQuestionsCorrect] = useState(0)

        async function updateRandInt(){
            const newVal = Math.floor(Math.random() * arrayLength);
            setrandInt(newVal);
            setincorrect(false)
            setcorrect(false)
            setnotalreadySolved(true)

            if (initialGotten === false)
          {
                let { data, error, status } = await supabase
                .from('profile')
                .select(`questions_solved, questions_correct, notes_read`)
                .eq('user_id', user.id)
                .single()

              if (error && status !== 406) {
                throw error
              }

              if (data) {
                setQuestionsSolved(data.questions_solved + questionsSolved)
                setQuestionsCorrect(data.questions_correct + questionsCorrect)
              }

                setinitialGotten(true)
          }
        }

        useEffect(() => {
            const startVal = Math.floor(Math.random() * arrayLength);
            setrandInt(startVal);
            setcorrect(false)
            
          }, [arrayLength]);

        const currentQuestion = questionArray[randInt];
        const [correct, setcorrect] = useState(false)
        const [notalreadySolved, setnotalreadySolved] = useState(true)
        const [incorrect, setincorrect] = useState(false)

        const currentQuestionArray = Object.values(currentQuestion);

        const questionName = currentQuestionArray[0]
        const answer = currentQuestionArray[1]
        const chapter = currentQuestionArray[2]
        const subject = currentQuestionArray[3]
        const paperNumber = currentQuestionArray[5]
        const source = currentQuestionArray[7]

        const session = useSession()
        const chapterString = chapters.filter(item => (item.id === questionArray[0].Chapter) && (item.subject === questionArray[0].Subject));
        const chapterString2 = chapterString[0].name

        async function handleAnswer(event) {
            event.preventDefault();
            if (initialGotten === false)
          {
                let { data, error, status } = await supabase
                .from('profile')
                .select(`questions_solved, questions_correct, notes_read`)
                .eq('user_id', user.id)
                .single()

              if (error && status !== 406) {
                throw error
              }

              if (data) {
                setQuestionsSolved(data.questions_solved + questionsSolved)
                setQuestionsCorrect(data.questions_correct + questionsCorrect)
                setinitialGotten(true)
              }

          }
            setnotalreadySolved(false)
            if (event.target.id === answer){
              if (initialGotten === true){
                setcorrect(true)
                setQuestionsCorrect(questionsCorrect + 1)
                setQuestionsSolved(questionsSolved + 1)
                updateSupabase(questionsSolved, questionsCorrect)
                }
            } else{
                setincorrect(true)
                if (initialGotten === true) {
                setQuestionsSolved(questionsSolved + 1)
                updateSupabase(questionsSolved, questionsCorrect)
                }
            }
            }

        
          async function updateSupabase (questionsSolved2, questionsCorrect2) {
            if (initialGotten === true) {
            const updates = {
              user_id: user.id,
              questions_solved : questionsSolved2,
              questions_correct : questionsCorrect2,
            }
            console.log(questionsSolved2);
            
            let { error } = await supabase
            .from('profile')
            .upsert(updates)

          if (error) {
            throw error
          }
          }}

          
            const title = `A-level Topic Questions ${chapterString2}`
            const str = title;
            const str2 = str.charAt(0).toUpperCase() + str.slice(1);

    return (
      <>
        <Head>
          <title>{str2}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="mb-12">
        <div className="flex flex-col items-center gap-32 mt-20 mb-20">
        <TopicCard header={"List Questions"} linkSrc={`/A-level/${subject}/topic-questions/${chapter}/list`} />
        </div>
        <div className="flex flex-col items-center gap-24 mt-32 mb-24">
            <h1 className='text-3xl ml-8 md:ml-0 sm:text-5xl font-bold text-white mb-8'>{chapterString2} Topic Questions</h1>
            <div className='border ml-2 md:ml-0 border-4  md:border-8 border-green-600 p-2 rounded rounded-2xl'>
            <Image className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/A-level/${subject}/p${paperNumber}/${chapter}/${questionName}`} alt='image' height={800} width={800} /> 
            </div>
        </div>
        {notalreadySolved && 
        <div className="flex ml-6 md:ml-0 flex-wrap justify-center gap-8">
                <button
                id='A'
                onClick={handleAnswer}
                className="inline-block rounded border border-green-500 bg-green-500 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-green-400 focus:outline-none focus:ring active:text-green-500"
                >
                A
                </button>
                <button
                id='B'
                onClick={handleAnswer}
                className="inline-block rounded border border-green-500 bg-green-500 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-green-400 focus:outline-none focus:ring active:text-green-500"
                >
                B
                </button>
                <button
                id='C'
                onClick={handleAnswer}
                className="inline-block rounded border border-green-500 bg-green-500 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-green-400 focus:outline-none focus:ring active:text-green-500"
                >
                C
                </button>
                <button
                id='D'
                onClick={handleAnswer}
                className="inline-block rounded border border-green-500 bg-green-500 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-green-400 focus:outline-none focus:ring active:text-green-500"
                >
                D
                </button>
                
        </div>
        }
        <div className="flex ml-8 md:ml-0 flex-flow justify-center gap-8 mt-8">
        {correct && 
        <>
        <p className='dark:text-white text-lg sm:text-lg md:text-xl lg:text-2xl'><span className='text-green-400'>Correct</span>: the Answer is {answer} <br /> Explanation is coming soon! <br /> Source: {source}<br /><br /> Disclaimer: {"there's"} a 2% chance that the answer is incorrect <br />Disclaimer 2: {"there's"} a 5% chance that the question is not in the syllabus </p>
        </>
        }
        {incorrect && 
        <>
        <p className='dark:text-white text-lg sm:text-lg md:text-xl lg:text-2xl'><span className='text-red-600'>Incorrect</span>: the Answer is {answer} <br /> Explanation is coming soon! <br /> Source: {source} <br /><br /> Disclaimer: {"there's"} a 2% chance that the answer is incorrect <br />Disclaimer 2: {"there's"} a 5% chance that the question is not in the syllabus </p>
        </>
        }
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
        </div>
      </>
    );
    
  }


  export async function getStaticProps({ params }) {
    try {
      const filePath = path.join(process.cwd(), 'public', `${params.subjectName}_db.json`);
      const fileData = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileData);
  
      const filteredData = data.filter(item => item.Chapter == params.chapterNum);
  
      if (filteredData.length === 0) {
        throw new Error('Question not found');
      }
  
      const questionArray = filteredData;
  
      return {
        props: {
          questionArray
        }
      };
    } catch (error) {
      console.error(`Error reading JSON file: ${error}`);
      return {
        props: {
          questionArray: null
        }
      };
    }
  }

  export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'public', 'all.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    const paths = data.map(question => ({
      params: { subjectName: question.Subject.toString(),
                chapterNum: question.Chapter.toString()}
    }));
    return { paths, fallback: false };
  }



export default SubjectPage