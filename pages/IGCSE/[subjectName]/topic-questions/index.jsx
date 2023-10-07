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
      const title = `IGCSE ${str2} Topic Questions`

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, IGCSE revision notes, IGCSE past papers, IGCSE topic questions,`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="flex justify-center mt-40">
          <h1 className='text-3xl md:text-5xl font-bold dark:text-white'>{title}</h1>
        </div>
        <div className="flex flex-col gap-8 items-center mt-24">
        <TopicCard2 header={"Core"} linkSrc={`/IGCSE/${data.subjectName}/topic-questions/core`} />
        <TopicCard2 header={"Extended"} linkSrc={`/IGCSE/${data.subjectName}/topic-questions/extended`} />
        </div>
    </>
    );
  }

  export async function getStaticProps() {
      return {
        props: {
          'chapters' : ''
        }
      };
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