import Head from 'next/head';
import Navbar from "@/components/navbar.jsx"
import YearCard from "@/components/yearCard.jsx"
import Headstuff from "@/components/headstuff.jsx"
import { useSession } from '@supabase/auth-helpers-react'
import data from "@/public/subjects.json"

export async function getStaticPaths() {
  const paths = data.flatMap(subject => 
    subject.years.actualYears.map(year => ({
      params: {
        subjectName: subject.slug,
        level: subject.level,
      },
    }))
  );

  return { paths, fallback: false };
}


  export async function getStaticProps({ params }) {
    const subjectData = data.find(subject => (subject.slug.toString() === params.subjectName) && (subject.level === params.level));
    return {
      props: {
        subjectData
      }
    };
  }


  export default function SubjectPage({ subjectData }) {
    const session = useSession()
    const str = subjectData.name;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return (
      <>
        <Head>
          <title>{`Past Papers | IGCSE | ${str2}`}</title>
          <meta name="description" content={`CAIE Past Papers for ${subjectData.level} ${subjectData.name}`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, ${subjectData.level} revision notes, ${subjectData.level} past papers, ${subjectData.level} topic questions, 
    ${subjectData.level} ${subjectData.name} past papers`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="flex justify-center items-center mt-32 ">
          <h1 className="text-3xl sm:text-5xl font-bold dark:text-gray-100 tracking-tight">{subjectData.level} {subjectData.name} Past Papers</h1>
        </div>
        <div className="flex justify-around items-center ">
            <div className="grid grid-flow-row gap-12 mt-36 mb-40 grid-cols-1 sm:grid-cols-2">
            {subjectData.years.actualYears.map(function(object, i){
              return <YearCard header={subjectData.years.actualYears[i]} key={i} linkSrc={`/${subjectData.level}/${subjectData.slug}/past-papers/${subjectData.years.actualYears[i]}`} />;
          })}
            </div>
        </div>
      </>
    );
  }
  
  
  