import Head from 'next/head';
import Navbar from "@/components/navbar.jsx"
import "flowbite"
import Headstuff from "@/components/headstuff.jsx"
import TopicCard2 from "@/components/topicCard2.jsx"
import { useSession } from '@supabase/auth-helpers-react'
import fs from 'fs/promises';
import path from 'path';

    function SubjectPage({ params }) {
      const session = useSession()
      let title = ""
      if (params.type == "core" || params.type == "extended") {
       title = `${params.level} ${params.subjectName} ${params.type} Topic Questions` 
      } else {
        title = `${params.level} ${params.subjectName} Topic Questions`
      }

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, ${params.level} revision notes, ${params.level} past papers, ${params.level} topic questions,`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="flex justify-center mt-40">
          <h1 className='text-center text-3xl md:text-5xl font-bold dark:text-white'>{title}</h1>
        </div>
        <div className="flex flex-col gap-8 items-center mt-24">
        <TopicCard2 header={"Search For A Question"} linkSrc={`/${params.level}/${params.subjectName}/topic-questions/${params.type}/search`} />
        <TopicCard2 header={"Practice solving questions"} linkSrc={`/${params.level}/${params.subjectName}/topic-questions/${params.type}/solve`} />
        </div>
    </>
    );
  }

  export async function getStaticProps({ params }) {
      return {
        props: {
          params
        }
      };
    }

  export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'public', 'chapters.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    let data = JSON.parse(fileData);
    let IGData = data.filter(question => question.level == 'IGCSE')
    let A_data = data.filter(question => question.level == 'A-level')


    let finaljsonData = IGData.map(question => ({
      params: { subjectName: question.subject.toString(), level : question.level.toString(), type : "core" }
    }))
    let finaljsonData2 = IGData.map(question => ({
      params: { subjectName: question.subject.toString(), level : question.level.toString(), type : "extended" }
    }))
    let finaljsonData3 = A_data.map(question => ({
      params: { subjectName: question.subject.toString(), level : question.level.toString(), type : "a" }
    }))
    const finaljsonData4 = finaljsonData.concat(finaljsonData2)
    .concat(finaljsonData3)

    const paths = finaljsonData4;
    return { paths, fallback: false };
  }

export default SubjectPage