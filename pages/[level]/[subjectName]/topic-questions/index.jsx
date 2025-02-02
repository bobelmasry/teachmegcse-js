import Head from 'next/head';
import Navbar from "@/components/navbar.jsx"
import "flowbite"
import Headstuff from "@/components/headstuff.jsx"
import TopicCard2 from "@/components/topicCard2.jsx"
import { useSession } from '@supabase/auth-helpers-react'
import fs from 'fs/promises';
import path from 'path';

    function SubjectPage({ level, subjectName }) {
      const session = useSession()
      const title = `${level} ${subjectName} Topic Questions`

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, ${level} revision notes, ${level} past papers, ${level} topic questions,`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="flex justify-center mt-40">
          <h1 className='text-center text-3xl md:text-5xl font-bold dark:text-white'>{title}</h1>
        </div>
        {level === "IGCSE" ?
        <div className="flex flex-col gap-8 items-center mt-24">
        <TopicCard2 header={"Core"} linkSrc={`/IGCSE/${subjectName}/topic-questions/core`} />
        <TopicCard2 header={"Extended"} linkSrc={`/IGCSE/${subjectName}/topic-questions/extended`} />
        </div>
        :
        <div className="flex flex-col gap-8 items-center mt-24">
        <TopicCard2 header={"Go to topic questions"} linkSrc={`/${level}/${subjectName}/topic-questions/a`} />
        </div>
    }
    </>
    );
  }

  export async function getStaticProps({ params }) {
      return {
        props: {
          level: params.level,
          subjectName: params.subjectName
        }
      };
    }

  export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'public', 'chapters.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    const paths = data.map(question => ({
      params: { subjectName: question.subject.toString(), level : question.level.toString() }
    }));
    return { paths, fallback: false };
  }

export default SubjectPage