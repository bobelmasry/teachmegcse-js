import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Table from "components/table.jsx"
import "flowbite"
import papers2 from "public/papers.json"
import data from "public/years.json"


    export async function getStaticPaths() {

      const paths = data.map(subject => ({
        params: { subjectName: subject.name.toString(),
                  year: subject.year.toString() }
      }));
      return { paths, fallback: false };
    }

export async function getStaticProps({params}) {
  const papers = papers2.filter(paper => (paper.subjectName.toString() === params.subjectName) && (paper.year.toString() === params.year));
  return {
    props: {
      papers
    }
  };
}


export default function SubjectPage({papers}) {
  let sName = papers[0].subjectName.charAt(0).toUpperCase() + papers[0].subjectName.slice(1);
  return (
    <>
      <Head>
        <title>A-level - teachmegcse</title>
      </Head>
      <Navbar />
      <div className="sm:ml-8 ml-6 mt-32">
        <h1 className='text-2xl sm:text-5xl font-bold dark:text-gray-100'>A-level {sName} {papers[0].year} Past Papers</h1>
      </div>
      <div className="block ml-8 justify-center items-center sm:justify-start mt-16 mb-16 sm:ml-16">
        { (papers[0].year > 2015 ) && <><h1 className="text-xl sm:text-4xl font-bold dark:text-gray-100">February/March {papers[0].year}</h1>
        <Table papers={papers} letter={"m"} /> </>}
        <div className="mt-12">
          <h1 className="text-xl sm:text-4xl font-bold dark:text-gray-100">May/June {papers[0].year}</h1>
          <Table papers={papers} letter={"s"} />
        </div>
        <div className="mt-12">
          <h1 className="text-xl sm:text-4xl font-bold dark:text-gray-100">October/November {papers[0].year}</h1>
          <Table papers={papers} letter={"w"} />
        </div>
      </div>
    </>
  );
}