import { useSession, useUser } from '@supabase/auth-helpers-react'
import Head from 'next/head';
import Navbar from "@/components/navbar.jsx"
import Headstuff from "@/components/headstuff.jsx"
import "flowbite"
import { supabase } from '@/components/utils/supabase';
import { Button } from '@chakra-ui/react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

 export default function ClassPage({ assignmentData }) {
    const session = useSession()
    const [questionsShown, setQuestionsShown] = useState(false)
    const user = useUser()
    const [isTeacher, setIsTeacher] = useState(false)
    const [assignmentLocked, setIsAssignmentLocked] = useState(true)
    const [studentUsernames, setStudentUsernames] = useState([])
    
    useEffect(() => {
      async function getInitial() {
        if (user && user.id) {
          if (user.id === assignmentData[0].user_id) {
            setIsTeacher(true)
            setIsAssignmentLocked(assignmentData[0].isLocked)
          }
        }
      }
      getInitial()
      async function getCompletedBy() {
        const completedUsers = assignmentData[0].completedBy; // The array of completed users
      
        if (completedUsers && completedUsers.length > 0) {
          const userIds = completedUsers.map((user) => user.id); // Extract the user ids from the array
          const { data: usersData, error } = await supabase
            .from('profiles')
            .select('id, username')
            .in('id', userIds);
      
          if (error) {
            console.error('Error fetching usernames:', error);
          } else {
            const userMap = new Map();
            
            // Store the username and score together in the userMap
            completedUsers.forEach((user) => {
              const userData = usersData.find((userData) => userData.id === user.id);
              if (userData) {
                userMap.set(user.id, {
                  username: userData.username,
                  score: user.Score
                });
              }
            });
      
            // Create an array of users with both username and score information
            const usersWithUsernameAndScore = completedUsers.map((user) => userMap.get(user.id));

            setStudentUsernames(usersWithUsernameAndScore)
          }
        } else {
          console.log('No completed users or data not available.');
        }
      }
      
      getCompletedBy();
    }, [assignmentData, session, user]);

    async function unlockAssignment(event) {
      event.preventDefault();
    
      // Get the assignmentID from the assignmentData
      const assignmentID = assignmentData[0]?.assignmentID;
    
      if (!assignmentID) {
        console.error("Assignment ID not found.");
        return;
      }
    
      try {
        // Use Supabase's `update` method to set `isLocked` to false
        const { data, error } = await supabase
          .from('assignments')
          .update({ isLocked: false })
          .eq('assignmentID', assignmentID);
    
        if (error) {
          console.error("Error unlocking assignment:", error.message);
          return;
        }
    
        console.log("Assignment unlocked successfully:", data);

        window.location.reload()
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
    

    const title = `${assignmentData[0].name} | exceed`
    const date = new Date(assignmentData[0].dueDate);
    const options = { month: 'long', day: 'numeric', year : 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = date.toLocaleString('en-US', options);
     
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
        {isTeacher ? (
          <>
        <div className="flex flex-col items-center mb-20">
          <h1 className='text-5xl font-bold mt-20 text-white'>{assignmentData[0].name}</h1>
          <h1 className='text-3xl font-bold mt-20 text-white'>Due : {formattedDate}</h1>
          <h1 className='text-4xl font-bold mt-20 text-white'>Completed by : {assignmentData[0].completedBy?.length ? assignmentData[0].completedBy.length : 0} Student(s)</h1>
          {studentUsernames && assignmentData[0].completedBy &&
          <div className="flex mt-10 justify-center">
                <table className="w-full text-lg text-left text-gray-400 rounded rounded-lg overflow-hidden">
                    <thead className="text-xl uppercase bg-gray-700 text-gray-400">
                      <tr>
                      <th scope="col" className="sm:px-4 px-2 py-3">
                          username
                        </th>
                        <th scope="col" className="sm:px-4 px-2 py-3">
                          Score
                        </th>
                      </tr>
                    </thead>
          {studentUsernames.map((student) => (
              <>
                    <tbody key={student.id}>
                      <tr className="bg-gray-800 border-gray-700">
                      <td className="px-10 py-4">
                        {student.username}
                      </td>
                        <td className="px-10 ml-8 py-4">
                        {student.score} / {assignmentData[0].questions.length}
                        </td>
                      </tr>
                    </tbody>
              </>
          ))}
          </table>            
          </div>
          }
          <div className='block'>
            <div className="flex">
            <h1 className='text-3xl font-bold mt-20 text-white'>Questions({assignmentData[0].questions?.length ? assignmentData[0].questions.length : 0})</h1>
            <Button colorScheme='blue' margin={20} size='md'><Link href={`/class/${assignmentData[0].classID}/assignment/${assignmentData[0].assignmentID}/${assignmentData[0].subject}/${assignmentData[0].level}/add`}>Add Questions </Link> </Button>
            </div>
          </div>
          <div className="flex">
            {assignmentLocked &&
            <>
              <h1 className='text-3xl mr-20 font-bold text-white'>This assignment is Locked (students can{"'"}t see it)</h1>
              <Button colorScheme='green' onClick={(event) => unlockAssignment(event)} size='md'>Unlock</Button>
            </>
            }
            </div>
          <div className='flex justify-start'>
            {!questionsShown && assignmentData[0].questions &&
            <>
            <Button colorScheme='blue' onClick={() => setQuestionsShown(!questionsShown)} size='lg'>Show Questions</Button>
            </>
            }
            {questionsShown && assignmentData[0].questions &&
            <Button colorScheme='blue' onClick={() => setQuestionsShown(!questionsShown)} size='lg'>Hide Questions</Button>
            }
          </div>
        </div>
        
              {questionsShown && (
        <div className='flex flex-col items-center gap-20 mt-12 mb-20'>
          {assignmentData[0].questions.map((question) => (
            <div key={question.questionName} className='flex'>
              <div className='border border-8 border-green-600 p-2 rounded rounded-2xl'>
                <Image
                  className='rounded rounded-md'
                  src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/${question.Level}/${question.Subject}/p${question.paperNumber}/${question.Chapter}/${question.questionName}`}
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
      ) : (
        <h1 className='mt-20 flex justify-center text-4xl text-white'>Hey, you {"don't"} seem to be a teacher</h1>
      )
      }
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