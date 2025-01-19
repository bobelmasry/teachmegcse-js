import Head from 'next/head';
import Navbar from "../../../../../../components/navbar.jsx"
import "flowbite"
import Headstuff from "../../../../../../components/headstuff.jsx"
import TopicCard from "../../../../../../components/topicCard.jsx"
import { useSession } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react';
import { supabase } from '../../../../../../components/utils/supabase';
import { useUser } from '@supabase/auth-helpers-react'
import fs from 'fs/promises';
import path from 'path';
import data2 from "../../../../../../public/all.json"

    function SubjectPage({chapters, type}) {
      const session = useSession()
      const title = `${chapters[0].level} ${chapters[0].subject} Topic Questions`
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
          <meta name="keywords" content={`exceed, teach me gcse, IGCSE revision notes, IGCSE past papers, IGCSE topic questions,`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
      <div className="flex justify-center mt-28">
      <h1 className="text-center text-3xl sm:text-5xl font-bold dark:text-gray-100">Solve {chapters[0].level} {chapters[0].subject} {type != 'a' ? type : ''} Topic Questions</h1>
      </div>
      <div className="flex justify-center items-center ">
      <div className="grid grid-rows-4 gap-8 mt-16 mb-24 w-auto">
        {chapters.map((topic) => { 
              let chapterQuestions = []
              let solvedPaper = []
              let amountSolved = 0
          if (type === 'a'){
           solvedPaper = questionsSolved?.filter(question => ((question.Chapter.toString() === topic.id.toString()) && (question.Subject.toString() === chapters[0].subject) && (question.Level?.toString() === (chapters[0].level2))));
           chapterQuestions = data2.filter(question => ((question.Chapter.toString() === topic.id.toString()) && (question.Subject.toString() === chapters[0].subject) && (question.Level?.toString() === (chapters[0].level2))));
           amountSolved = Array.isArray(solvedPaper) ? solvedPaper.length : 0
          } else if (type === 'core') {
             solvedPaper = questionsSolved?.filter(question => ((question.Chapter.toString() === topic.id.toString()) && (question.Subject.toString() === chapters[0].subject) && (question.Level?.toString() === (chapters[0].level2) && (question.paperNumber?.toString() === '1'))));
             chapterQuestions = data2.filter(question => ((question.Chapter.toString() === topic.id.toString()) && (question.Subject.toString() === chapters[0].subject) && (question.Level?.toString() === (chapters[0].level2)&& (question.paperNumber?.toString() === '1'))));
             amountSolved = Array.isArray(solvedPaper) ? solvedPaper.length : 0
          }
          else {
             solvedPaper = questionsSolved?.filter(question => ((question.Chapter.toString() === topic.id.toString()) && (question.Subject.toString() === chapters[0].subject) && (question.Level?.toString() === (chapters[0].level2) && (question.paperNumber?.toString() === '2'))));
             chapterQuestions = data2.filter(question => ((question.Chapter.toString() === topic.id.toString()) && (question.Subject.toString() === chapters[0].subject) && (question.Level?.toString() === (chapters[0].level2)&& (question.paperNumber?.toString() === '2'))));
             amountSolved = Array.isArray(solvedPaper) ? solvedPaper.length : 0
          }
          let totalAmount = chapterQuestions.length
            return(
              <TopicCard key={topic.id} amountSolved={amountSolved} totalAmount={totalAmount} header={topic.name} linkSrc={`/${topic.level}/${topic.subject}/topic-questions/${type}/solve/${topic.id}`} />
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
  
      const filteredData = data.filter(item => (item.subject == params.subjectName) && (item.level === params.level) && (item.hasSolve === true));
  
      if (filteredData.length === 0) {
        throw new Error('chapters not found');
      }
  
      const chapters = filteredData;
  
      return {
        props: {
          chapters,
          type : params.type
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
    let data = JSON.parse(fileData);
  
    // Filter data for IGCSE and A-level
    const IGData = data.filter(question => question.level === 'IGCSE');
    const A_data = data.filter(question => question.level === 'A-level');
  
    // Generate paths for IGCSE Core
    const finaljsonData = IGData.map(question => ({
      params: {
        subjectName: question.subject.toString(),
        level: question.level.toString(),
        type: 'core',
      }
    }));
  
    // Generate paths for IGCSE Extended, excluding Economics
    const finaljsonData2 = IGData
      .filter(question => question.subject.toLowerCase() !== 'economics') // Exclude Economics
      .map(question => ({
        params: {
          subjectName: question.subject.toString(),
          level: question.level.toString(),
          type: 'extended',
        }
      }));
  
    // Generate paths for A-level
    const finaljsonData3 = A_data.map(question => ({
      params: {
        subjectName: question.subject.toString(),
        level: question.level.toString(),
        type: 'a',
      }
    }));
  
    // Combine all paths
    const finaljsonData4 = [...finaljsonData, ...finaljsonData2, ...finaljsonData3];
  
    return { paths: finaljsonData4, fallback: false };
  }

export default SubjectPage