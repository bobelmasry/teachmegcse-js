import { useState, useEffect } from 'react'
import { useUser, useSession } from '@supabase/auth-helpers-react'
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import "flowbite"
import { supabase } from 'utils/supabase';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react'
import Link from 'next/link';

export default function ClassPage({ assignmentData }) {

    const router = useRouter();
    const routerData = router.query
    const studentID = routerData.studentID
    const classID = routerData.classID
    const user = useUser()
    const session = useSession()

    const [studentData, setStudentData] = useState([])
    const [classData, setClassData] = useState([])
    const [assignments, setAssignments] = useState([])
    const [isTeacher, setIsTeacher] = useState(false)

    const calculateStats = () => {
      let solved = 0;
      let correct = 0;
    
      assignments.forEach((assignment) => {
        if (assignment.completedBy != null) {
          const completedBy = assignment.completedBy.find((item) => item.id === studentID);
          if (completedBy) {
            solved += completedBy.numOfQuestions;
            correct += completedBy.Score;
          }
        }
      });
    
      return { solved, correct };
    };
    
    const { solved: questionsSolved, correct: questionsCorrect } = calculateStats();
    

    useEffect(() => {
    async function getStudentData(){
        let { data } = await supabase
      .from('profiles')
      .select(`*`)
      .eq('id', studentID);
  
    if (data.length === 0) {
      throw new Error('Class not found');
    }
    setStudentData(data)
    }
    getStudentData()
    async function getClassData(){
        let { data } = await supabase
      .from('classes')
      .select(`*`)
      .eq('classID', classID);
  
    if (data.length === 0) {
      throw new Error('Class not found');
    }
    setClassData(data)
    setAssignments(assignmentData.filter((classObj) => classObj.classID === classID))
    }
    getClassData()
    async function getInitial() {
      if (user && user.id) {
        if (user.id === classData[0]?.user_id) {
          setIsTeacher(true)
        }
      }
    }
    getInitial()
    },[assignmentData, classData, classID, studentID, user]
    )
    const title = `${studentData[0]?.username}'s Data for ${classData[0]?.name}`
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
            {assignments.length === 0 && isTeacher &&
            <div className="flex mt-20 justify-center"> 
            <h1 className='text-3xl text-white'>Hey, you need to have assignments to see the stats of this student !</h1>
            </div>
            }
            {assignments.length != 0 && isTeacher &&
            <>
            <div className="flex mt-20 justify-center">
            <h1 className='text-3xl text-white'>{studentData[0]?.username}{"'s"} stats - {classData[0]?.name},<span className='text-blue-600 font-semibold'> Average Score : {questionsCorrect} / {questionsSolved}</span></h1>
            </div>
            <div className="flex mt-20 justify-center">
            <div className="flex justify-center">
                <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                      <th scope="col" className="sm:px-4 px-2 py-3">
                          Assignment Name
                        </th>
                        <th scope="col" className="sm:px-4 px-2 py-3">
                          Due Date
                        </th>
                        <th scope="col" className="sm:px-4 px-2 py-3">
                          Status
                        </th>
                      </tr>
                    </thead>
                    {assignments.map((assignment) => {
                        const date = new Date(assignment.dueDate);
                        const options = { month: 'long', day: 'numeric', year : 'numeric', hour: 'numeric', minute: 'numeric' };
                        const formattedDate = date.toLocaleString('en-US', options);
                        let status = "not complete"
                        if (assignment.completedBy != null){
                          const completedBy = assignment.completedBy.filter((assignment) => assignment.id === studentID)
                          if (completedBy.length != 0){
                            status = `${completedBy[0].Score} / ${completedBy[0].numOfQuestions}`
                          }

                        }
                      

                        return (
                            <tbody key={assignment.name}>
                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className="px-10 py-4">
                                    {assignment.name}
                                </td>
                                <td className="px-4 py-4">
                                    {formattedDate}
                                </td>
                                <td className="sm:px-4 px-2 py-4">
                                  {status}
                                </td>
                                </tr>
                            </tbody>
                        );
                        })}
          </table>            
          </div>
          </div>
          <div className='flex justify-center ml-96'>
            <Link href={`/class/${classID}`} className='p-8'>
              <Button colorScheme='blue' size='lg'>Go Back</Button>
            </Link>
          </div>
            </> 
            }
            {!isTeacher &&
            <>
            <div className="flex mt-20 justify-center"> 
            <h1 className='text-3xl text-white'>Hey, you don{"'t"} seem to be a teacher / are not signed in</h1>
            </div>
            <div className="flex mt-10 justify-center"> 
            <Link href={"/login-or-signup"} className='p-8'>
              <Button colorScheme='blue' size='lg'>Login / Sign Up</Button>
            </Link>
            </div>
            </>
            }
        </>
    )
}

export async function getServerSideProps() {
    let { data } = await supabase
      .from('assignments')
      .select(`*`)
  
    if (data.length === 0) {
      throw new Error('Class not found');
    }
    
    const assignmentData = data;
  
    return {
      props: { assignmentData },
    };
  }