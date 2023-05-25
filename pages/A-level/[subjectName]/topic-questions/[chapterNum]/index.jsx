import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import { useSession } from '@supabase/auth-helpers-react'

    function SubjectPage({questionData}) {
        const router = useRouter();
        const { chapterNum } = router.query;
        const session = useSession()
        console.log(questionData);

    return (
      <>
        <Head>
          <title>A-level {questionData[0].Subject} Topic Questions Chapter: {questionData[0].Chapter} </title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    `}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="flex flex-col items-center gap-32 mt-32 mb-20">
            <h1 className='text-3xl sm:text-5xl font-bold text-white mb-8'>CH : {chapterNum} Topic Questions</h1>
        {questionData.map((question) => (
        <>
            <div className='border border-8 border-green-600 p-2 rounded rounded-2xl'>
                <Link href={`/A-level/${question.Subject}/topic-questions/${question.Chapter}/${question.questionName}`}>
                  <Image className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/sortedp1/${chapterNum}/${question.questionName}`} alt='image' height={800} width={800} />
                </Link>
            </div>
        </>
        ))}
        </div>
      </>
    );
    
  }


  export async function getStaticProps({ params }) {
    console.log(params);
    try {
      const filePath = path.join(process.cwd(), 'public', `${params.subjectName}_db.json`);
      const fileData = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileData);
  
      const filteredData = data.filter(item => item.Chapter == params.chapterNum);
  
      if (filteredData.length === 0) {
        throw new Error('Question not found');
      }
  
      const questionData = filteredData;
  
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

  export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'public', 'chemistry_db.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    const paths = data.map(question => ({
      params: { subjectName: question.Subject.toString(),
                chapterNum: question.Chapter.toString()}
    }));
    return { paths, fallback: false };
  }



export default SubjectPage