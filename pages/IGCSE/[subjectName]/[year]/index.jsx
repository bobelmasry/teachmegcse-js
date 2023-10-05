import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Table from "components/table2.jsx"
import "flowbite"
import papers2 from "public/papers.json"
import Headstuff from "components/headstuff.jsx"
import { useSession } from '@supabase/auth-helpers-react'

const data = [
  {"name": "math", "year": "2022"},
  {"name": "math", "year": "2021"},
  {"name": "math", "year": "2020"},
  {"name": "math", "year": "2019"},
  {"name": "math", "year": "2018"},
  {"name": "math", "year": "2017"},
  {"name": "math", "year": "2016"},
  {"name": "math", "year": "2015"},
  {"name": "math", "year": "2014"},
  {"name": "math", "year": "2013"},
  {"name": "math", "year": "2012"},
  {"name": "math", "year": "2011"},
  {"name": "biology", "year": "2022"},
  {"name": "biology", "year": "2021"},
  {"name": "biology", "year": "2020"},
  {"name": "biology", "year": "2019"},
  {"name": "biology", "year": "2018"},
  {"name": "biology", "year": "2017"},
  {"name": "biology", "year": "2016"},
  {"name": "biology", "year": "2015"},
  {"name": "biology", "year": "2014"},
  {"name": "biology", "year": "2013"},
  {"name": "biology", "year": "2012"},
  {"name": "biology", "year": "2011"},
  {"name": "business", "year": "2022"},
  {"name": "business", "year": "2021"},
  {"name": "business", "year": "2020"},
  {"name": "business", "year": "2019"},
  {"name": "business", "year": "2018"},
  {"name": "business", "year": "2017"},
  {"name": "business", "year": "2016"},
  {"name": "business", "year": "2015"},
  {"name": "business", "year": "2014"},
  {"name": "business", "year": "2012"},
  {"name": "business", "year": "2011"},
  {"name": "chemistry", "year": "2022"},
  {"name": "chemistry", "year": "2021"},
  {"name": "chemistry", "year": "2020"},
  {"name": "chemistry", "year": "2019"},
  {"name": "chemistry", "year": "2018"},
  {"name": "chemistry", "year": "2017"},
  {"name": "chemistry", "year": "2016"},
  {"name": "chemistry", "year": "2015"},
  {"name": "chemistry", "year": "2014"},
  {"name": "chemistry", "year": "2013"},
  {"name": "chemistry", "year": "2012"},
  {"name": "chemistry", "year": "2011"},
  {"name": "computer-science", "year": "2022"},
  {"name": "computer-science", "year": "2021"},
  {"name": "computer-science", "year": "2020"},
  {"name": "computer-science", "year": "2019"},
  {"name": "computer-science", "year": "2018"},
  {"name": "computer-science", "year": "2017"},
  {"name": "computer-science", "year": "2016"},
  {"name": "computer-science", "year": "2015"},
  {"name": "economics", "year": "2022"},
  {"name": "economics", "year": "2021"},
  {"name": "economics", "year": "2020"},
  {"name": "economics", "year": "2019"},
  {"name": "economics", "year": "2018"},
  {"name": "economics", "year": "2017"},
  {"name": "economics", "year": "2016"},
  {"name": "economics", "year": "2015"},
  {"name": "economics", "year": "2014"},
  {"name": "economics", "year": "2013"},
  {"name": "economics", "year": "2012"},
  {"name": "economics", "year": "2011"},
  {"name": "english-language", "year": "2022"},
  {"name": "english-language", "year": "2021"},
  {"name": "english-language", "year": "2020"},
  {"name": "english-language", "year": "2019"},
  {"name": "english-language", "year": "2018"},
  {"name": "english-language", "year": "2017"},
  {"name": "english-language", "year": "2016"},
  {"name": "english-language", "year": "2015"},
  {"name": "english-language", "year": "2014"},
  {"name": "history", "year": "2022"},
  {"name": "history", "year": "2021"},
  {"name": "history", "year": "2020"},
  {"name": "history", "year": "2019"},
  {"name": "history", "year": "2018"},
  {"name": "history", "year": "2017"},
  {"name": "history", "year": "2016"},
  {"name": "history", "year": "2015"},
  {"name": "history", "year": "2014"},
  {"name": "history", "year": "2013"},
  {"name": "history", "year": "2012"},
  {"name": "history", "year": "2011"},
  {"name": "physics", "year": "2022"},
  {"name": "physics", "year": "2021"},
  {"name": "physics", "year": "2020"},
  {"name": "physics", "year": "2019"},
  {"name": "physics", "year": "2018"},
  {"name": "physics", "year": "2017"},
  {"name": "physics", "year": "2016"},
  {"name": "physics", "year": "2015"},
  {"name": "physics", "year": "2014"},
  {"name": "physics", "year": "2013"},
  {"name": "physics", "year": "2012"},
  {"name": "physics", "year": "2011"}
  ]


    export async function getStaticPaths() {


      const paths = data.map(subject => ({
        params: { subjectName: subject.name.toString(),
                  year: subject.year.toString() }
      }));
      return { paths, fallback: false };
    }

export async function getStaticProps({params}) {
  const papers = papers2.filter(paper => (paper.subjectName.toString() === params.subjectName) && (paper.year.toString() === params.year) && (paper.Level.toString() === 'IGCSE'));
  return {
    props: {
      papers
    }
  };
}


export default function SubjectPage({papers}) {
  const session = useSession()
  let sName = papers[0].subjectName.charAt(0).toUpperCase() + papers[0].subjectName.slice(1);
  const title = `Past Papers | IGCSE | ${papers[0].subjectName} | ${papers[0].year}`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`CAIE Past Papers for IGCSE ${papers[0].subjectName} ${papers[0].year}`}></meta>
        <meta name="keywords" content={`teachmegcse, teach me gcse, IGCSE revision notes, IGCSE past papers, IGCSE topic questions, 
    IGCSE ${papers[0].subjectName} ${papers[0].year} past papers`}></meta>
        <Headstuff />
      </Head>
      <Navbar session={session} />
      <div className="sm:ml-8 ml-6 mt-32">
        <h1 className='text-3xl sm:text-5xl font-bold dark:text-gray-100 tracking-tight'>IGCSE {sName} {papers[0].year} Past Papers</h1>
      </div>
      <div className="block ml-0 justify-center items-center sm:justify-start mt-16 mb-16 sm:ml-16">
        { (papers[0].year > 2015 ) && <><h1 className="text-2xl ml-2 sm:text-4xl font-bold dark:text-gray-100">February/March {papers[0].year}</h1>
        <Table papers={papers} letter={"m"} /> </>}
        <div className="mt-12">
          <h1 className="text-2xl sm:text-4xl ml-2 font-bold dark:text-gray-100">May/June {papers[0].year}</h1>
          <Table papers={papers} letter={"s"} />
        </div>
        <div className="mt-12">
          <h1 className="text-2xl sm:text-4xl ml-2 font-bold dark:text-gray-100">October/November {papers[0].year}</h1>
          <Table papers={papers} letter={"w"} />
        </div>
      </div>
    </>
  );
}