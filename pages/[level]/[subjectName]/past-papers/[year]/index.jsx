import Head from 'next/head';
import Navbar from "@/components/navbar.jsx"
import Table from "@/components/table.jsx"
import "flowbite"
import papers2 from "@/public/papers.json"
import Headstuff from "@/components/headstuff.jsx"
import { useSession } from '@supabase/auth-helpers-react'
import data from "@/public/subjects.json"

    export async function getStaticPaths() {
      const paths = data.flatMap(subject => 
        subject.years.actualYears.map(year => ({
          params: {
            subjectName: subject.slug,
            level: subject.level,
            year: year.toString()
          },
        }))
      );
    
      return { paths, fallback: false };
    }

export async function getStaticProps({params}) {
  const papers = papers2.filter(paper => (paper.subjectName.toString() === params.subjectName) && (paper.year.toString() === params.year) && (paper.Level.toString() === params.level));
  return {
    props: {
      papers
    }
  };
}


export default function SubjectPage({papers}) {
  const session = useSession()
  let sName = papers[0].subjectName.charAt(0).toUpperCase() + papers[0].subjectName.slice(1);
  const title = `Past Papers | ${papers[0].Level} | ${papers[0].subjectName} | ${papers[0].year}`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`CAIE Past Papers for ${papers[0].Level} ${papers[0].subjectName} ${papers[0].year}`}></meta>
        <meta name="keywords" content={`exceed, teach me gcse, ${papers[0].Level} revision notes, ${papers[0].Level} past papers, ${papers[0].Level} topic questions, 
    ${papers[0].Level} ${papers[0].subjectName} ${papers[0].year} past papers`}></meta>
        <Headstuff />
      </Head>
      <Navbar session={session} />
      <div className="sm:ml-8 ml-6 mt-32">
        <h1 className='text-3xl sm:text-5xl font-bold dark:text-gray-100 tracking-tight'>{papers[0].Level} {sName} {papers[0].year} Past Papers</h1>
      </div>
      <div className="block ml-0 justify-center items-center sm:justify-start mt-16 mb-16 sm:ml-16">
        { (papers[0].year > 2015 ) && <><h1 className="text-2xl ml-2 sm:text-4xl font-bold dark:text-gray-100">February/March {papers[0].year}</h1>
        <Table papers={papers} letter={"m"} type={papers[0].Level} /> </>}
        <div className="mt-12">
          <h1 className="text-2xl sm:text-4xl ml-2 font-bold dark:text-gray-100">May/June {papers[0].year}</h1>
          <Table papers={papers} letter={"s"} type={papers[0].Level} />
        </div>
        <div className="mt-12">
          <h1 className="text-2xl sm:text-4xl ml-2 font-bold dark:text-gray-100">October/November {papers[0].year}</h1>
          <Table papers={papers} letter={"w"} type={papers[0].Level} />
        </div>
      </div>
    </>
  );
}