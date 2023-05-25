import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import TopicCard from "components/topicCard.jsx"

const chemistry = [
  {
    "id" : 1,
    "name":'CH 1: Atomic structure',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 2,
    "name":'CH 2: Atoms, molecules and stoichiometry',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 3,
    "name":'CH 3: Chemical bonding',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 4,
    "name":'CH 4: States of matter',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 5,
    "name":'CH 5: Chemical energetics',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 6,
    "name":'CH 6: Electrochemistry',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 7,
    "name":'CH 7: Equilibria',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 8,
    "name":'CH 8: Reaction kinetics',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 9,
    "name":'CH 9: The Periodic Table: chemical periodicity',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 10,
    "name":'CH 10: Group 2',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 11,
    "name":'CH 11: Group 17',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 12,
    "name":'CH 12: Nitrogen and sulfur',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 13,
    "name":'CH 13: An introduction to AS Level organic chemistry',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 14,
    "name":'CH 14: Hydrocarbons',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 15,
    "name":'CH 15: Halogen compounds',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 16,
    "name":'CH 16: Hydroxy compounds',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 17,
    "name":'CH 17: Carbonyl compounds',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 18,
    "name":'CH 18: Carboxylic acids and derivatives',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 19,
    "name":'CH 19: Nitrogen compounds',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 20,
    "name":'CH 20: Polymerisation',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 21,
    "name":'CH 21: Organic synthesis',
    "subject": "chemistry",
    "level" : "A-level"
  },
  {
    "id" : 22,
    "name":'CH 22: Analytical techniques',
    "subject": "chemistry",
    "level" : "A-level"
  },
]

    function SubjectPage({questionData}) {
    return (
      <>
        <Head>
          <title></title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions,`}></meta>
          <Headstuff />
        </Head>
        <Navbar />
        <div className="flex justify-center mt-28">
        <Link href={'/'}>
        <TopicCard header={"Search For A Question"} linkSrc={`/A-level/chemistry/topic-questions/search`} />
        </Link>
        </div>
      <div className="flex justify-center mt-28">
        <h1 className="text-4xl sm:text-5xl font-bold dark:text-gray-100">A-level Chemistry Topic Questions</h1>
      </div>
      <div className="flex justify-center items-center ">
      <div className="grid grid-rows-4 gap-11 mt-16 mb-24 w-10/12 md:w-5/12 lg:w-3/12">
        {chemistry.map((topic) => (
          <TopicCard key={topic.id} header={topic.name} linkSrc={`/${topic.level}/${topic.subject}/topic-questions/${topic.id}`} />
        ))}
      </div>
      </div>
    </>
    );
    
  }


export async function getServerSideProps({ params }) {
  try {
    const filePath = path.join(process.cwd(), 'public', `${params.subjectName}_db.json`);
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    const filteredData = data.filter(item => item.Chapter === 1);

    return {
      props: {
        questionData: filteredData
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



export default SubjectPage