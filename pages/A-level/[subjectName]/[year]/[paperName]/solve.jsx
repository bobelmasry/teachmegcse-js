import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import Image from 'next/image';
import { useSession, useUser } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react';
import data from "public/all.json"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from 'utils/supabase';

    function SubjectPage({questionArray}) {

      questionArray.sort((a, b) => {
        const questionNumberA = parseInt(a.questionName.match(/\d+/)[0]);
        const questionNumberB = parseInt(b.questionName.match(/\d+/)[0]);
        return questionNumberA - questionNumberB;
      });

        const user = useUser()

        const [initialGotten, setinitialGotten] = useState(false)
        const [questionsSolved, setQuestionsSolved] = useState(0)

        const router = useRouter();
        const data2 = router.query;
        const subjectName = data2.subjectName
        const paperName = data2.paperName
        let msName = paperName.replace("qp", "ms");
        const firstNum = paperName.charAt(6)
        const secondNum = paperName.charAt(7)
        const year = '20' + firstNum + secondNum

        //const user = useUser()
        const arrayLength = questionArray.length;
        const [questionsCorrect, setQuestionsCorrect] = useState(0)
        const [solved, setSolved] = useState(false)
        const [activeOptions, setActiveOptions] = useState({});

        const session = useSession()

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
            }}}
        
          getInitial(); // Call the function
        }, [arrayLength, initialGotten, questionsCorrect, questionsSolved, subjectName, user]);

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

        async function handleAnswer(questionName, option) {
            setActiveOptions((prevState) => ({
              ...prevState,
              [questionName]: option,
            }));          
        }

        async function updatePapersSolved(score, numOfQuestions) {
        
          // Retrieve the current papersSolved value
          const { data: existingData, error: existingError } = await supabase
            .from('profiles')
            .select('papersSolved')
            .eq('id', user.id)
            .single();
        
          if (existingError) {
            console.error('Error retrieving existing papersSolved:', existingError);
            return;
          }
        
          // Check if existingData is null
          if (existingData.papersSolved === null) {
            // If there is no existing papersSolved data, create a new array with the new entry
            const newData = [{
              PaperName: paperName,
              Score: score,
              NumOfQuestions: numOfQuestions,
              Subject : subjectName,
              Year : year
            }];
        
            // Update the papersSolved field with the new data
            const { data, error } = await supabase
              .from('profiles')
              .update({
                papersSolved: newData
              })
              .eq('id', user.id);
        
            if (error) {
              console.error('Error updating papersSolved:', error);
              return;
            }
        
            console.log('papersSolved updated successfully!');
            return;
          }
          else {
            // Filter out existing entries with the same PaperName
          const data2 = existingData.papersSolved
          const filteredData = data2.filter(entry => entry.PaperName !== paperName);
        
          // Add the new entry to the filtered data
          filteredData.push({
            PaperName: paperName,
            Score: score,
            NumOfQuestions: numOfQuestions,
            Subject : subjectName,
            Year : year
          });

           // Update the papersSolved field with the modified data
           const { data, error } = await supabase
           .from('profiles')
           .update({
             papersSolved: filteredData
           })
           .eq('id', user.id);
       
         if (error) {
           console.error('Error updating papersSolved:', error);
           return;
         }
       
         console.log('papersSolved updated successfully!');
          }
        }

        async function handleSubmit() {
            let correctAnswers = 0
            for (let i = 0; i < arrayLength; i++) {  // Fix loop condition: i < arrayLength
              if (activeOptions[questionArray[i].questionName] === questionArray[i].Answer) {  // Use strict equality (===) for comparison
                correctAnswers ++;
              }
            }
            setQuestionsCorrect(correctAnswers)
            setQuestionsSolved(arrayLength)
            updateSupabase(arrayLength + questionsSolved, correctAnswers + questionsCorrect)
            updatePapersSolved(correctAnswers, arrayLength)
            setSolved(true);
          }
          
          const title = `Solve ${paperName} Interactively`
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="ml-2 mr-2">
        <div className="flex mt-32 ml-2 mb-4 justify-center">
            <h1 className='lg:text-5xl md:text-4xl text-3xl font-bold text-white'>Solve {paperName}</h1>
        </div>
        <div className="flex flex-col items-center gap-32 mt-32 mb-20">
        {questionArray.map((question, index) => (
        <div key={question.questionName}>
            <div key={question.questionName} className='border border-4 md:border-8 border-green-600 p-2 rounded rounded-2xl'>
                <Image key={question.questionName} className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/A-level/${question.Subject}/p${question.paperNumber}/${question.Chapter}/${question.questionName}`} alt='image' height={800} width={800} />
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
                    {activeOptions[questionArray[index].questionName] === questionArray[index].Answer ? (
                    <p className='dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl'><span className='text-green-400'>Correct</span>: the Answer is {questionArray[index].Answer}</p>
                    ) : (
                    <p className='dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl'><span className='text-red-600'>Incorrect</span>: the Answer is {questionArray[index].Answer} <br /> Source: {questionArray[index].pdfName}</p>
                    )}
                </>
                )}
                {(solved && index === 0) && 
                <p className='dark:text-white text-lg sm:text-lg md:text-xl lg:text-2xl'>Explanations coming soon ! <br /> Source: {questionArray[index].pdfName}<br /><br /> Disclaimer: {"there's"} a 2% chance that the answer is incorrect <br />Disclaimer 2: {"there's"} a 5% chance that the question is not in the syllabus </p>
                }
                </div>
        </div>
        </div>
        
        ))}
        <div className="flex flex-flow justify-center mt-20 ml-60 md:ml-96">
        {!solved &&
        <button
                id='Submit'
                onClick={handleSubmit}
                className="inline-block rounded border border-blue-500 bg-blue-600 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-blue-500"
                >
                Submit
        </button>
        }
        {solved &&
        <h1 className='text-4xl text-white'>You got : {questionsCorrect} / {arrayLength} <br /> <Link className='text-blue-600 mt-8 underline hover:no-underline' href={`/A-level/${questionArray[0].Subject}/${year}/${msName}`}>MS (Just in case)</Link></h1>
        }
        </div>
        </div>
        </div>
      </>
    );
    
  }

  export async function getStaticPaths() {
    const years = ['2022', '2021', '2020', '2019', '2018', '2017'];
  
    const paths = [];
  
    data.forEach((subject) => {
      years.forEach((year) => {
        paths.push({
          params: {
            subjectName: subject.Subject.toString(),
            year: year,
            paperName: subject.pdfName.toString(),
          },
        });
      });
    });
  
    return { paths, fallback: false };
  }

  export async function getStaticProps({params}) {
    const questionArray = data.filter(subject => (subject.Subject.toString() === params.subjectName) && (subject.pdfName.toString() === params.paperName));
    return {
      props: {
        questionArray
      }
    };
  }

export default SubjectPage