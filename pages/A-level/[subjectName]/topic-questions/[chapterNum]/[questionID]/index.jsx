import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import { createClient } from '@supabase/supabase-js'
import { useUser, useSession } from '@supabase/auth-helpers-react'
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { useState, useEffect } from 'react'


export const supabase = createClient('https://dgunybghtjqbawjpkcvg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRndW55YmdodGpxYmF3anBrY3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMzA3NDcsImV4cCI6MTk5ODYwNjc0N30.YhH31WDmaWw9QZgx4cvu09g4aQojJ6fKer1B8gRnXGM')

    function QuestionPage({questionData}) {
      const session = useSession()

    return (
      <>
        <Head>
          <title>{questionData.questionText}</title>
          <meta name='title' content={`${questionData.questionText}`}></meta>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    ${questionData.questionText}`}></meta>
          <Headstuff />
        </Head>
        <h1 className='hidden'>{questionData.questionText}</h1>
        <Navbar session={session} />
        <div className="flex flex-col items-center gap-32 mt-32 mb-20">
            <div className='border border-4 border-green-600 p-2 rounded rounded-xl'>
                <Image className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/sortedp1/${questionData.Chapter}/${questionData.questionName}`} alt='image' height={800} width={800} />
                <div className="flex gap-8">
                  <h1 className='dark:text-white text-xl sm:text-2xl mt-4'>Answer: {questionData.Answer}</h1>
                    <h1 className='dark:text-white text-xl sm:text-2xl mt-4'>Source: <span>{questionData.pdfName}</span></h1>
                  <h1 className='dark:text-white text-xl sm:text-2xl mt-4'>Chapter: {questionData.Chapter}</h1>
                </div>
                <div>
                </div>
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
  
      const filteredData = data.filter(item => item.questionName === params.questionID);
  
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
    const filePath = path.join(process.cwd(), 'public', `chemistry_db.json`);
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    const paths = data.map(question => ({
      params: { subjectName: question.Subject.toString(),
                chapterNum: question.Chapter.toString(),
               questionID : question.questionName.toString()}
    }));
    return { paths, fallback: false };
  }


export default QuestionPage