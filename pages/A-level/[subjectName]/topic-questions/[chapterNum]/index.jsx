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
import chapters from "public/chapters.json"
import TopicCard from "components/topicCard.jsx"

    function SubjectPage({questionArray}) {
        const router = useRouter();
        const data  = router.query;
        const chapterNum = data.chapterNum
        const subject = data.subjectName
        const session = useSession()
        const chapterString = chapters.filter(item => (item.id === questionArray[0].Chapter) && (item.subject === questionArray[0].Subject));
        const chapterString2 = chapterString[0].name
        const title = `A-level ${questionArray[0].Subject} Topic Questions ${chapterString2}`

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    `}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="flex flex-col items-center gap-32 mt-32 mb-20">
        <TopicCard header={"Solve Questions"} linkSrc={`/A-level/${subject}/topic-questions/${chapterNum}/solve`} />
        </div>
        <div className="flex flex-col items-center gap-32 mt-32 mb-20">
            <h1 className='text-3xl sm:text-5xl font-bold text-white mb-8'>{chapterString2} Topic Questions</h1>
        {questionArray.map((question) => (
        <>
            <div key={question.questionName} className='border border-8 border-green-600 p-2 rounded rounded-2xl'>
                <Link href={`/A-level/${question.Subject}/topic-questions/${question.Chapter}/${question.questionName}`}>
                  <Image className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/A-level/${question.Subject}/${chapterNum}/${question.questionName}`} alt='image' height={800} width={800} />
                </Link>
            </div>
        </>
        ))}
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