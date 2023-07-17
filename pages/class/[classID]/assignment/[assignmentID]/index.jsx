import { useSession } from '@supabase/auth-helpers-react'
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import "flowbite"
import { supabase } from 'utils/supabase';
import { Button } from '@chakra-ui/react'
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

 export default function ClassPage({ assignmentData }) {
    const session = useSession()
    const [questionsShown, setQuestionsShown] = useState(false)

    const title = `${assignmentData[0].name} | teachmegcse`
     
    return (
        <>
        <Head>
            <title>{title}</title>
            <meta name="description" content="Class"></meta>
            <meta name="keywords" content="teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
            A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
            <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="flex flex-col items-center">
          <h1 className='text-5xl font-bold mt-20 text-white'>{assignmentData[0].name}</h1>
          <h1 className='text-4xl font-bold mt-20 text-white'>Completed by : {assignmentData[0].completedBy?.length ? assignmentData[0].completedBy.length : 0} Students</h1>
          <div className='flex'>
            <h1 className='text-3xl font-bold mt-20 text-white'>Questions({assignmentData[0].questions?.length ? assignmentData[0].questions.length : 0})</h1>
            <Button colorScheme='blue' margin={20} size='md'><Link href={`/class/${assignmentData[0].classID}/assignment/${assignmentData[0].assignmentID}/${assignmentData[0].subject}/${assignmentData[0].level}/add`}>Add Questions </Link> </Button>
          </div>
        </div>
        <div className='flex justify-start'>
        {!questionsShown && assignmentData[0].questions &&
        <Button colorScheme='blue' onClick={() => setQuestionsShown(!questionsShown)} className='ml-96' size='lg'>Show Questions</Button>
        }
        {questionsShown && assignmentData[0].questions &&
        <Button colorScheme='blue' onClick={() => setQuestionsShown(!questionsShown)} className='ml-96' size='lg'>Hide Questions</Button>
        }
        </div>
              {questionsShown && (
        <div className='flex flex-col items-center gap-20 mt-32 mb-20'>
          {assignmentData[0].questions.map((question) => (
            <div key={question.questionName} className='flex'>
              <div className='border border-8 border-green-600 p-2 rounded rounded-2xl'>
                <Image
                  className='rounded rounded-md'
                  src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/A-level/${question.Subject}/p${question.paperNumber}/${question.Chapter}/${question.questionName}`}
                  alt='image'
                  height={800}
                  width={800}
                />
              </div>
            </div>
          ))}
        </div>
      )}
        </>
    )
}


export async function getServerSideProps({ params }) {
  let { data } = await supabase
    .from('assignments')
    .select(`*`)
    .eq('assignmentID', params.assignmentID);

  if (data.length === 0) {
    throw new Error('Assignment not found');
  }
  
  const assignmentData = data;

  return {
    props: { assignmentData },
  };
}