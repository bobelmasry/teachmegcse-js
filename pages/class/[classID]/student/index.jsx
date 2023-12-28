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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddStudents from 'components/modals/addStudents.jsx'

export default function ClassPage({ classData }) {

    const router = useRouter();
    const routerData = router.query
    const studentID = routerData.studentID
    const classID = routerData.classID
    const user = useUser()
    const session = useSession()

    const [studentData, setStudentData] = useState([])
    const [isTeacher, setIsTeacher] = useState(false)
    const [studentsAvailable, setStudentsAvailable] = useState([])

    async function removeAStudent(studentID) {
        const updatedStudents = classData[0].students.filter((student) => student !== studentID);
        const { error } = await supabase
        .from('classes')
        .update({ students: updatedStudents })
        .eq('classID', classData[0].classID)
        router.reload()
      }

    useEffect(() => {
    async function getInitial() {
      if (user && user.id) {
        if (user.id === classData[0]?.user_id) {
          setIsTeacher(true)
        }
      }
    }
    getInitial()
    async function addStudents() {
      
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('school', classData[0].school)
          .eq('isTeacher', false);
      
        const studentsNotInClass = data.filter((student) => {
          if (classData[0].students) {
            return !classData[0].students.includes(student.id);
          }
          return true;
        });
        const studentsInClass = data.filter((student) => {
          if (classData[0].students) {
            return classData[0].students.includes(student.id);
          }
          return true;
        });
      
        setStudentsAvailable(studentsNotInClass);
        setStudentData(studentsInClass);
      }
      addStudents()
    },[classData, classID, studentID, user]
    )
    const title = ` ${classData[0]?.name} - Students`
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
            {classData[0].students.length === 0 &&
            <div className="flex mt-20 justify-center"> 
            <h1 className='text-3xl text-white'>Hey, you need to have students to see their !</h1>
            </div>
            }
            {classData[0].students.length != 0 &&
            <>
            <div className="flex mt-20 justify-center">
            {isTeacher &&
            <h1 className='text-3xl text-white'>{classData[0]?.name} - Students</h1>
            }
            {!isTeacher &&
            <h1 className='text-3xl text-white'>{classData[0]?.name} - Leaderboards</h1>
            }
            </div>
            <div className="flex mt-20 justify-center">
            {(classData[0].students && classData[0].students.length != 0) &&
          <div className="flex justify-center">
                <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                      <th scope="col" className="sm:px-4 px-2 py-3">
                          username
                        </th>
                        <th scope="col" className="sm:px-4 px-2 py-3">
                          Questions Solved
                        </th>
                        <th scope="col" className="sm:px-4 px-2 py-3">
                          Questions Correct
                        </th>
                        <th scope="col" className="sm:px-4 px-2 py-3">
                          Percentage
                        </th>
                        {isTeacher &&
                        <th scope="col" className="sm:px-4 px-2 py-3">
                          Edit
                        </th>
                        }
                      </tr>
                    </thead>
          {studentData.map((student) => (
              <>
                    <tbody key={student.id}>
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <td className="px-10 py-4">
                      {isTeacher &&
                        <Link href={`/class/${classData[0].classID}/student/${student.id}`} className='text-blue-600 font-semibold text-xl underline hover:no-underline'>
                        {student.username}
                        </Link>
                      }
                      {!isTeacher &&
                      <p className='font-semibold text-xl'>
                        {student.username}
                      </p>
                      }
                      </td>
                        <td className="px-10 ml-8 py-4">
                        {student.questionsSolved?.filter((question) => question.Subject == classData[0].subject).length || 0}
                        </td>
                        <td className="px-10 ml-8 py-4">
                        {student.questionsSolved?.filter((question) => question.Subject == classData[0].subject && (question.Correct.toString() == 'true')).length || 0}
                        </td>
                        <td className="sm:px-4 px-2 py-4">
                        {`${Math.round(((student.questionsSolved?.filter((question) => (question.Subject == classData[0].subject) && (question.Correct.toString() == 'true')).length/student.questionsSolved?.filter((question) => question.Subject == classData[0].subject).length) * 10000)) / 100} %`}
                        </td>
                        {isTeacher &&
                        <td className="sm:px-4 px-2 py-4">
                          <DeleteOutlineOutlinedIcon onClick={() => removeAStudent(student.id)} fontSize="large" className='cursor-pointer ease-out transition-all hover:bg-gray-600 rounded rounded-xl'/>
                        </td>
                        }
                      </tr>
                    </tbody>
              </>
          ))}
          </table>            
          </div>
          }
            </div>
          <div className='flex flex-col ml-96'>
          {isTeacher &&
          <AddStudents studentsAvailable={studentsAvailable} classData={classData} user={user} />
        }
            <Link href={`/class/${classID}`} className='p-8'>
              <Button colorScheme='green' size='lg'>Go Back</Button>
            </Link>
            
            </div>
            </>
    }
    </>
    )
}

export async function getServerSideProps({ params }) {
    let { data } = await supabase
      .from('classes')
      .select(`*`)
      .eq('classID', params.classID);
  
    if (data.length === 0) {
      throw new Error('Class not found');
    }
    
    const classData = data;
  
    return {
      props: { classData },
    };
  }