import { useState, useEffect } from 'react'
import { useUser, useSession } from '@supabase/auth-helpers-react'
import Head from 'next/head';
import Navbar from "../../../components/navbar.jsx"
import Headstuff from "../../../components/headstuff.jsx"
import "flowbite"
import { supabase } from '../../../components/utils/supabase';
import { Button } from '@chakra-ui/react'
import Link from 'next/link';
import Image from 'next/image';
import { postData } from '../../../components/helpers/makePdf.js';
 export default function ClassPage({ worksheetData }) {

  const user = useUser()
  const session = useSession()
  const [isTeacher, setIsTeacher] = useState(false)
  const [questionsShown, setQuestionsShown] = useState(false)

  useEffect(() => {
    if (worksheetData[0].user_id === user?.id){
      setIsTeacher(true)
    }
    else {
      setIsTeacher(false)
    }
  }, [user, worksheetData]
  )

    const title = `${worksheetData[0].name} | exceed`
    const header = `${worksheetData[0].name} - worksheet`
        console.log(worksheetData[0].level);
        let level2 = "IGCSE"
        if (worksheetData[0].level == "AS" || worksheetData[0].level == "A2" ){
           level2 = "A-level"
        }
        
    return (
        <>
        <Head>
            <title>{title}</title>
            <meta name="description" content="Class"></meta>
            <meta name="keywords" content="exceed, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
            A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
            <Headstuff />
        </Head>
        <Navbar session={session} />
        <div className="mt-32">
        {isTeacher ? (
          <>
        <div className="flex justify-center mt-32">
          <h1 className='text-4xl font-bold text-white text-center'>{header}</h1>
        </div>
            <div className="w-full flex flex-col items-center">
      <div className='flex flex-col sm:flex-row justify-center items-center'>
        <h1 className='text-3xl font-bold mt-20 text-white text-center'>Questions({worksheetData[0].questions?.length ? worksheetData[0].questions.length : 0})</h1>
        <Button colorScheme='blue' margin={20} size='md'>
          <Link href={`/worksheet/${worksheetData[0].id}/${worksheetData[0].subject}/${worksheetData[0].level}/add`}>Add Questions</Link>
        </Button>
      </div>
      <div className='flex gap-4 justify-center w-11/12 md:w-full'>
        {!questionsShown && worksheetData[0].questions && (
          <>
            <Button colorScheme='blue' onClick={() => setQuestionsShown(!questionsShown)} size='lg'>Show Questions</Button>
            {worksheetData[0].questions.length > 0 ? (
              <Button colorScheme='green' onClick={() => postData(worksheetData[0].questions, title)} size='lg'>Download Worksheet</Button>
            ) : (
              <Button colorScheme='green' onClick={() => postData(worksheetData[0].questions, title)} size='lg' disabled>Download Worksheet</Button>
            )}
          </>
        )}
        {questionsShown && worksheetData[0].questions && (
          <>
            <Button colorScheme='blue' onClick={() => setQuestionsShown(!questionsShown)} size='lg'>Hide Questions</Button>
            <Button colorScheme='green' onClick={() => postData(worksheetData[0].questions, title)} size='lg'>Download Worksheet</Button>
          </>
        )}
      </div>
      {questionsShown && (
        <div className='w-full flex flex-col items-center gap-20 mt-20 mb-20'>
          {worksheetData[0].questions.map((question) => {
            const paperNumber = question.questionNumber ? "long" : `p${question.paperNumber}`;
            const imageUrl = `https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/${level2}/${question.Subject}/${paperNumber}/${question.Chapter}/${question.questionName}`;

            return (
              <div key={question.questionName} className='flex justify-center w-full'>
                <div className='border border-8 border-green-600 p-2 rounded rounded-2xl'>
                  <Image
                    className='rounded rounded-md'
                    src={imageUrl}
                    alt='image'
                    height={800}
                    width={800}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
        </>
         ):(
          <h1 className='mt-20 flex justify-center text-4xl text-white'>Hey, you {"don't"} seem to be a teacher</h1>
        )
      }
        </div>
        </>
    )
}


export async function getServerSideProps({ params }) {
  let { data } = await supabase
    .from('worksheets')
    .select(`*`)
    .eq('id', params.id);

  if (data.length === 0) {
    throw new Error('Class not found');
  }
  
  const worksheetData = data;

  return {
    props: { worksheetData },
  };
}