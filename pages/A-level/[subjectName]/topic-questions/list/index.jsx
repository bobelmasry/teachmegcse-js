import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import TopicCard from "components/topicCard.jsx"
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';
import fs from 'fs/promises';
import path from 'path';

    function SubjectPage({chapters}) {
      const session = useSession()
      const router = useRouter();
      const data = router.query;
      const str = data.subjectName;
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      const title = `A-level ${str2} Topic Questions`
      let isEco = false
      if (str == 'economics') {
        isEco = true
      }

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions,`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        {isEco && 
        <div className="flex justify-center mt-28">
        <h1 className='text-4xl sm:text-5xl text-white'>A2 starts from CH: 12</h1>
        </div>
        }
      <div className="flex justify-center mt-28">
        <h1 className="text-4xl sm:text-5xl font-bold dark:text-gray-100">A-level {data.subjectName} Topic Questions</h1>
      </div>
      <div className="flex justify-center items-center ">
      <div className="grid grid-rows-4 gap-11 mt-16 mb-24 w-10/12 md:w-5/12 lg:w-3/12">
        {chapters.map((topic) => (
          <TopicCard key={topic.id} header={topic.name} linkSrc={`/${topic.level}/${topic.subject}/topic-questions/list/${topic.id}`} />
        ))}
      </div>
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