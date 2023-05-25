import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import data from "public/papers.json"
import { useSession } from '@supabase/auth-helpers-react'

    export async function getStaticPaths() {

      const paths = data.map(subject => ({
        params: { subjectName: subject.subjectName.toString(),
                  year: subject.year.toString(),
                 paperName : subject.slug.toString()}
      }));
      return { paths, fallback: false };
    }

export async function getStaticProps({params}) {
  const paper = data.filter(subject => (subject.subjectName.toString() === params.subjectName) && (subject.year.toString() === params.year) && (subject.slug.toString() === params.paperName));
  return {
    props: {
      paper
    }
  };
}


export default function SubjectPage({paper}) {
  const session = useSession()
  return (
    <>
      <Head>
        <title>{paper[0].slug}</title>
        <meta name="description" content={`${paper[0].slug} ${paper[0].subjectName} ${paper[0].year} Past Paper`}></meta>
        <meta name="keywords" content={`teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    A-level ${paper[0].subjectName} ${paper[0].year} past papers,${paper[0].slug},${paper[0].synonym}`}></meta>
        <Headstuff />
      </Head>
      <Navbar session={session} />
      {paper.map(function(object, i){
              return(<div key={1}>
              <div className="mt-24 mb-16">
                <h1 className="sm:text-5xl text-3xl tracking-tight font-bold ml-12 sm:ml-48 mb-8 dark:text-gray-100">{paper[i].slug}</h1>
              <div className="flex justify-center items-center mt-4">
                <object key={1} data={paper[i].src} type="application/pdf" width="90%" height="720px"></object>
              </div>
              </div>
              </div>
              );
          })}
    </>
  );
}