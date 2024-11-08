import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import TopicCard from "components/topicCard.jsx"
import TopicCard2 from "components/topicCard2.jsx"
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from 'utils/supabase';
import { useUser } from '@supabase/auth-helpers-react'
import fs from 'fs/promises';
import path from 'path';
import data2 from "public/all.json"

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
      const user = useUser()
      const [initialGotten, setinitialGotten] = useState(false)
      const [questionsSolved, setQuestionsSolved] = useState([]);

      useEffect(() => {
        async function getQuestionsSolved () {
          if (!initialGotten){
          if (user && user.id) {
          const { data: existingData, error: existingError } = await supabase
                .from('profiles')
                .select('questionsSolved')
                .eq('id', user.id)
                .single();
            
              if (existingError) {
                console.error('Error retrieving existing papersSolved:', existingError);
                return;
              }
    
              if (existingData) {
                setQuestionsSolved(existingData.questionsSolved)
                setinitialGotten(true)
              }
        }
      }}
        getQuestionsSolved()
      }, [initialGotten, user]);

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions,`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
        {isEco && 
        <div className="flex justify-center mt-28">
        <h1 className='text-4xl sm:text-5xl text-white'>A2 starts from CH: 12</h1>
        </div>
        }
      <div className="flex justify-center mt-28">
        <h1 className="text-4xl text-center sm:text-5xl font-bold">Solve A-level {data.subjectName} Topic Questions</h1>
      </div>
      <div className="flex justify-center mt-16 mb-24">
        <div className="grid grid-cols-1 items-center gap-8 w-10/12 md:w-3/12">
          {chapters.map((topic) => { 
            const solvedPaper = questionsSolved?.filter(question => (
              question.Chapter.toString() === topic.id.toString() && 
              question.Subject.toString() === str && 
              (question.Level?.toString() === "AS" || question.Level?.toString() === "A2")
            ));
            const chapterQuestions = data2.filter(question => (
              question.Chapter.toString() === topic.id.toString() && 
              question.Subject.toString() === str && 
              (question.Level.toString() === "AS" || question.Level.toString() === "A2")
            ));
            
            let amountSolved = Array.isArray(solvedPaper) ? solvedPaper.length : 0;
            let totalAmount = chapterQuestions.length;

              return (
                <TopicCard 
                  key={topic.id} 
                  amountSolved={amountSolved} 
                  totalAmount={totalAmount} 
                  header={topic.name} 
                  linkSrc={`/${topic.level}/${topic.subject}/topic-questions/solve/${topic.id}`} 
                />
              );
          })}
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
  
      const filteredData = data.filter(item => (item.subject == params.subjectName) && (item.level === 'A-level'));
  
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