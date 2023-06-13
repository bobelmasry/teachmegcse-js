import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import Image from 'next/image';
import { useSession, useUser } from '@supabase/auth-helpers-react'
import chapters from "public/chapters.json"
import fs from 'fs/promises';
import path from 'path';
import { useState, useEffect} from 'react';
import { supabase } from 'utils/supabase';
import { useRouter } from 'next/router';

    function SubjectPage({questionArray}) {
      const router = useRouter()
      const params = router.query
      let subjectName = params.subjectName

        const user = useUser()
        const arrayLength = questionArray.length;
        const [randInt, setrandInt] = useState(Math.floor(Math.random() * arrayLength));

        function AnswerButton({name}){
          return (
            <button
                id={name}
                onClick={handleAnswer}
                className="inline-block rounded border border-green-500 bg-green-500 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-green-400 focus:outline-none focus:ring active:text-green-500"
                >
                {name}
                </button>
          )
        }

        //now for interactive element
        const [initialGotten, setinitialGotten] = useState(false)
        const [questionsSolved, setQuestionsSolved] = useState(0)
        const [questionsCorrect, setQuestionsCorrect] = useState(0)

        async function updateRandInt(){
            const newVal = Math.floor(Math.random() * arrayLength);
            setrandInt(newVal);
            setcorrect(false)
            setnotalreadySolved(true)
        }

        useEffect(() => {
          async function getInitial() {
            if (!initialGotten){
            if (user && user.id) { // Check if user and user.id are defined
              let { data, error, status } = await supabase
                .from('profiles')
                .select(`${subjectName}_questionsSolved, ${subjectName}_questionsCorrect`)
                .eq('id', user.id)
                .single();
        
              if (error && status !== 406) {
                throw error;
              }
        
              if (data) {
                const solvedKey = `${subjectName}_questionsSolved`;
                const correctKey = `${subjectName}_questionsCorrect`
                const questionsSolvedValue = data[solvedKey];
                const questionsCorrectValue = data[correctKey];

                setQuestionsSolved(questionsSolvedValue + questionsSolved);
                setQuestionsCorrect(questionsCorrectValue + questionsCorrect);
                //console.log(`1 : ${data.questions_correct} : ${data.questions_solved}`);
                setinitialGotten(true);
              }
            }}
          }
        
          getInitial(); // Call the function
        }, [arrayLength, initialGotten, questionsCorrect, questionsSolved, subjectName, user]);

        const currentQuestion = questionArray[randInt];
        const [correct, setcorrect] = useState(false)
        const [notalreadySolved, setnotalreadySolved] = useState(true)

        const questionName = currentQuestion['questionName']
        const answer = currentQuestion['Answer']
        const chapter = currentQuestion['Chapter']
        const subject = currentQuestion['Subject']
        const paperNumber = currentQuestion['paperNumber']
        const source = currentQuestion['pdfName']

        const session = useSession()
        const chapterString = chapters.filter(item => (item.id === questionArray[0].Chapter) && (item.subject === questionArray[0].Subject));
        const chapterString2 = chapterString[0].name

        async function handleAnswer(event) {
            event.preventDefault();
            setnotalreadySolved(false)
            if (event.target.id === answer){
              setcorrect(true)
                setQuestionsCorrect(questionsCorrect + 1)
                setQuestionsSolved(questionsSolved + 1)
                //console.log(`2 : ${questionsCorrect + 1} : ${questionsSolved + 1}`);
                updateSupabase(questionsSolved + 1, questionsCorrect + 1)
                updateQuestionsSolved(currentQuestion)
            } else{
                setQuestionsSolved(questionsSolved + 1)
                //console.log(`3 : ${questionsCorrect} : ${questionsSolved + 1}`);
                updateSupabase(questionsSolved + 1, questionsCorrect)
                updateQuestionsSolved(currentQuestion)
                }
            }

            async function updateQuestionsSolved(currentQuestion) {
        
              // Retrieve the current questionsSolved value
              const { data: existingData, error: existingError } = await supabase
                .from('profiles')
                .select('questionsSolved')
                .eq('id', user.id)
                .single();
            
              if (existingError) {
                console.error('Error retrieving existing questionsSolved:', existingError);
                return;
              }
              console.log(existingData);
            
              // Check if existingData is null
              if (existingData.questionsSolved === null) {
                // If there is no existing questionsSolved data, create a new array with the new entry
                const newData = [{
                  PaperNumber: currentQuestion.paperNumber,
                  Chapter: currentQuestion.Chapter,
                  QuestionName: currentQuestion.questionName,
                  Subject : currentQuestion.Subject
                }];
            
                // Update the questionsSolved field with the new data
                const { data, error } = await supabase
                  .from('profiles')
                  .update({
                    questionsSolved: newData
                  })
                  .eq('id', user.id);
            
                if (error) {
                  console.error('Error updating questionsSolved:', error);
                  return;
                }
            
                console.log('questionsSolved updated successfully!');
                return;
              }
              else {
                // Filter out existing entries with the same questionName
              const data2 = existingData.questionsSolved
              const filteredData = data2?.filter(entry => ((entry.QuestionName !== currentQuestion.questionName) || (entry.Chapter !== currentQuestion.Chapter) || (entry.PaperNumber !== currentQuestion.paperNumber)));
            
              // Add the new entry to the filtered data
              filteredData.push({
                PaperNumber: currentQuestion.paperNumber,
                  Chapter: currentQuestion.Chapter,
                  QuestionName: currentQuestion.questionName,
                  Subject : currentQuestion.Subject
              });
    
               // Update the questionsSolved field with the modified data
               const { data, error } = await supabase
               .from('profiles')
               .update({
                 questionsSolved: filteredData
               })
               .eq('id', user.id);
           
             if (error) {
               console.error('Error updating questionsSolved:', error);
               return;
             }
           
             console.log('questionsSolved updated successfully!');
              }
            }

        
          async function updateSupabase (questionsSolved2, questionsCorrect2) {
            const solvedKey = `${subjectName}_questionsSolved`;
            const correctKey = `${subjectName}_questionsCorrect`

            const updates = {
              id: user.id,
              [solvedKey] : questionsSolved2,
              [correctKey] : questionsCorrect2,
            }
            
            let { error } = await supabase
            .from('profiles')
            .upsert(updates)

          if (error) {
            throw error
          }
          }
          
            const title = `A-level ${questionArray[0].Subject} Topic Questions ${chapterString2}`
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
        <div className="flex flex-col items-center gap-24 mt-32 mb-24">
            <h1 className='text-3xl ml-8 md:ml-0 sm:text-5xl font-bold text-white mb-8'>{chapterString2} Topic Questions</h1>
            <div className='border ml-2 md:ml-0 border-4  md:border-8 border-green-600 p-2 rounded rounded-2xl'>
            <Image className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/A-level/${subject}/p${paperNumber}/${chapter}/${questionName}`} alt='image' height={800} width={800} /> 
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
        {(correct && !notalreadySolved) && 
        <>
        <p className='dark:text-white text-lg sm:text-lg md:text-xl lg:text-2xl'><span className='text-green-400'>Correct</span>: the Answer is {answer} <br /> Explanation is coming soon! <br /> Source: {source}<br /><br /> Disclaimer: {"there's"} a 2% chance that the answer is incorrect <br />Disclaimer 2: {"there's"} a 5% chance that the question is not in the syllabus </p>
        </>
        }
        {(!correct && !notalreadySolved) && 
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
    let { data } = await supabase
    .from('questions')
    .select(`*`)
    .eq('Subject', params.subjectName)
    .eq('Chapter', params.chapterNum)

      if (data.length === 0) {
        throw new Error('Question not found');
      }
      const questionArray = data;

      return {
        props: {questionArray}
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