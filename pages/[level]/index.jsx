import "flowbite";
import SubjectCard from "components/subjectCard.jsx"
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import { useSession } from '@supabase/auth-helpers-react'

export default function Home({ level }) {
  const session = useSession()
  return (
  <div>
    <Head>
      <title>{level} Resources | exceed</title>
      <meta name="description" content={`CAIE Past Papers for Cambridge ${level}`}></meta>
      <meta name="keywords" content={`exceed, teach me gcse, ${level} revision notes, ${level} past papers, ${level} topic questions, 
      ${level} math past papers, ${level} physics past papers, ${level} chemistry past papers`}></meta>
      <Headstuff />
    </Head>
    <Navbar session={session} />
    <div className="mt-36 flex justify-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight dark:text-gray-100">{level} Content</h1>
      </div>
    <div className="flex justify-center items-center">
      {level === "IGCSE" ?
      <div className="grid grid-flow-row gap-16 mt-24 sm:mt-36 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-center mb-40 w-11/12 md:w-4/6 lg:w-4/6">
        <SubjectCard header={"Business (0450)"}  link1={"/IGCSE/business/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Biology (0610)"} topicQuestions={true} link1={"/IGCSE/biology/past-papers"} link2={"#"} link3={"/IGCSE/biology/topic-questions"} />
        <SubjectCard header={"Chemistry (0620)"} topicQuestions={true} link1={"/IGCSE/chemistry/past-papers"} link2={"#"} link3={"/IGCSE/chemistry/topic-questions"} />
        <SubjectCard header={"Computer Science (0478)"} link1={"/IGCSE/computer-science/past-papers"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Economics (0455)"} topicQuestions={true} link1={"/IGCSE/economics/past-papers"} link2={"#"} link3={"/IGCSE/economics/topic-questions/core"} />
        <SubjectCard header={"English as a First Language (0500)"} link1={"/IGCSE/english-language/past-papers"} link2={"#"} link3={"#"} />
        <SubjectCard header={"History (0470)"} link1={"/IGCSE/history/past-papers"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Maths (0580)"} link1={"/IGCSE/math/past-papers"} link2={"#"} link3={"#"}  />
        <SubjectCard header={"Physics (0625)"} topicQuestions={true} link1={"/IGCSE/physics/past-papers"} link2={"#"} link3={"/IGCSE/physics/topic-questions"} />
      </div>
      :
      <div className="grid grid-flow-row gap-16 mt-24 sm:mt-36 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-center mb-40 w-11/12 md:w-4/6 lg:w-4/6">
        <SubjectCard header={"Business (9609)"}  link1={"/A-level/business/past-papers"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Biology (9700)"} topicQuestions={true} link1={"/A-level/biology/past-papers"} link2={"#"} link3={"/A-level/biology/topic-questions/a"} />
        <SubjectCard header={"Chemistry (9701)"} revisionNotes={true} topicQuestions={true} link1={"/A-level/chemistry/"} link2={"/A-level/chemistry/revision-notes"} link3={"/A-level/chemistry/topic-questions/a"} />
        <SubjectCard header={"Computer Science (9618)"} link1={"/A-level/computer-science/past-papers"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Economics (9708)"} link1={"/A-level/economics/past-papers"} topicQuestions={true} link2={"#"} link3={"/A-level/economics/topic-questions/a"} />
        <SubjectCard header={"English Language (9093)"} link1={"/A-level/english-language/past-papers"} link2={"#"} link3={"#"} />
        <SubjectCard header={"History (9489)"} link1={"/A-level/history/past-papers"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Maths (9709)"} link1={"/A-level/math/past-papers"} link2={"#"} link3={"#"}  />
        <SubjectCard header={"Physics (9702)"} revisionNotes={true} topicQuestions={true} link1={"/A-level/physics/past-papers"} link2={"/A-level/physics/revision-notes"} link3={"/A-level/physics/topic-questions/a"} />
      </div>
      }
    </div>
  </div>
  )
}

export async function getStaticPaths() {
  const paths = [
    { params: { level: "A-level" } },
    { params: { level: "IGCSE" } },
  ];

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { level } = params;

  return {
    props: {
      level,
    },
  };
}
