import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import "flowbite"
import Headstuff from "components/headstuff.jsx"
import TopicCard from "components/topicCard.jsx"
import TopicCard2 from "components/topicCard2.jsx"
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';
import fs from 'fs/promises';
import path from 'path';
import data2 from "public/all.json"
import { useState, useEffect } from 'react';
import { supabase } from 'utils/supabase';
import { useUser } from '@supabase/auth-helpers-react'

    function SubjectPage({chapters}) {
      const session = useSession()
      const router = useRouter();
      const data = router.query;
      const str = data.subjectName;
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      const title = `IGCSE ${str2} Topic Questions`
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
        }}}
        getQuestionsSolved()
      }, [initialGotten, user]);

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`teachmegcse, teach me gcse, IGCSE revision notes, IGCSE past papers, IGCSE topic questions,`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
      <div className="flex justify-center mt-28">
        <h1 className="text-4xl sm:text-5xl font-bold dark:text-gray-100">List IGCSE {data.subjectName} Topic Questions</h1>
      </div>
      <div className="flex justify-center items-center ">
      <div className="grid grid-rows-4 gap-8 mt-16 mb-24 w-auto">
      {chapters.map((topic) => { 
          const solvedPaper = questionsSolved?.filter(question => ((question.Chapter.toString() === topic.id.toString()) && (question.Subject.toString() === str) && (question.Level?.toString() === 'IGCSE')));
          const chapterQuestions = data2.filter(question => ((question.Chapter.toString() === topic.id.toString()) && (question.Subject.toString() === str)));
          let amountSolved = Array.isArray(solvedPaper) ? solvedPaper.length : 0
          let totalAmount = chapterQuestions.length

          if (session) {
            return(
              <TopicCard key={topic.id} amountSolved={amountSolved} totalAmount={totalAmount} header={topic.name} linkSrc={`/${topic.level}/${topic.subject}/topic-questions/core/list/${topic.id}`} />
        )
          }
          else {
            return(
              <TopicCard2 key={topic.id} hasSignIn={true} header={topic.name} linkSrc={`/${topic.level}/${topic.subject}/topic-questions/core/list/${topic.id}`} />
        )
          }
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
  
      const filteredData = data.filter(item => (item.subject == params.subjectName) && (item.level === 'IGCSE'));
  
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