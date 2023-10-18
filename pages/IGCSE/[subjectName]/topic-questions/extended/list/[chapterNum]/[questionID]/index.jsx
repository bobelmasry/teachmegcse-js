import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import { useUser, useSession } from '@supabase/auth-helpers-react'
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import chapters from "public/chapters.json"

    function QuestionPage({questionData}) {
      const session = useSession()
      const chapterString = chapters.filter(item => (item.id === questionData.Chapter) && (item.subject === questionData.Subject));
      const chapterString2 = chapterString.name

    return (
      <>
        <Head>
          <title>{questionData.questionText}</title>
          <meta name='title' content={`${questionData.questionText}`}></meta>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, IGCSE revision notes, IGCSE past papers, IGCSE topic questions, 
    ${questionData.questionText}`}></meta>
          <Headstuff />
        </Head>
        <h1 className='hidden'>{questionData.questionText}</h1>
        <Navbar session={session} />
        <div className="flex flex-col items-center gap-32 ml-8 mt-32 mb-20">
            <div className='border border-4 md:border-8 border-green-600 p-2 rounded rounded-xl'>
              <Image className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/IGCSE/${questionData.Subject}/p${questionData.paperNumber}/${questionData.Chapter}/${questionData.questionName}`} alt='image' height={800} width={800} />
                <div className="flex gap-8">
                    <h1 className='dark:text-white text-xl sm:text-2xl mt-4'>Answer: {questionData.Answer}</h1>
                    <h1 className='dark:text-white text-xl sm:text-2xl mt-4'>Source: <span>{questionData.pdfName}</span></h1>
                    <h1 className='dark:text-white text-xl sm:text-2xl mt-4'>{chapterString2}</h1>
                </div>
                <h1 className='dark:text-white text-xl sm:text-2xl mt-4'>Disclaimer: {"there's"} a 2% chance that the answer is incorrect <br />Disclaimer 2: {"there's"} a 5% chance that the question is not in the syllabus</h1>
                <div>
                </div>
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
  
      const filteredData = data.filter(item => (item.questionName === params.questionID));
  
      if (filteredData.length === 0) {
        throw new Error('Question not found');
      }
  
      const questionData = filteredData[0];
  
      return {
        props: {
          questionData
        }
      };
    } catch (error) {
      console.error(`Error reading JSON file: ${error}`);
      return {
        props: {
          questionData: null
        }
      };
    }
  }

  export async function getStaticPaths (){
    const filePath = path.join(process.cwd(), 'public', `all.json`);
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);
    const data2 = data.filter(question => question.Level === 'IGCSE' && question.paperNumber === 2)

    const paths = data2.map(question => ({
      params: { subjectName: question.Subject.toString(),
                chapterNum: question.Chapter.toString(),
               questionID : question.questionName.toString()}
    }));
    return { paths, fallback: false };
  }


export default QuestionPage