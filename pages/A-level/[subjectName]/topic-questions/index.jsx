import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import TopicCard2 from "components/topicCard2.jsx"
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';
import fs from 'fs/promises';
import path from 'path';

    function SubjectPage() {
      const session = useSession()
      const router = useRouter();
      const data = router.query;
      const str = data.subjectName;
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      const title = `A-level ${str2} Topic Questions`

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions,`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="flex justify-center mt-40">
          <h1 className='text-4xl md:text-5xl font-bold dark:text-white text-center'>{title}</h1>
        </div>
        <div className="flex flex-col gap-8 items-center mt-24">
        <TopicCard2 header={"Search For A Question"} linkSrc={`/A-level/${data.subjectName}/topic-questions/search`} />
        <TopicCard2 header={"Practice solving questions"} linkSrc={`/A-level/${data.subjectName}/topic-questions/solve`} />
        </div>
    </>
    );
  }

  export async function getStaticProps({ params }) {
    try {
      const filePath = path.join(process.cwd(), 'public', 'chapters.json');
      const fileData = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileData);
  
      const filteredData = data.filter(item => item.subject == params.subjectName);
  
      if (filteredData.length === 0) {
        throw new Error('chapters not found');
      }
  
      const chapters = filteredData;
  
      return {
        props: {
          chapters
        }
      };
    } catch (error) {
      console.error(`Error reading JSON file: ${error}`);
      return {
        props: {
          chapters: null
        }
      };
    }
  }

  export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'public', 'chapters.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    const paths = data.map(question => ({
      params: { subjectName: question.subject.toString()}
    }));
    return { paths, fallback: false };
  }

export default SubjectPage