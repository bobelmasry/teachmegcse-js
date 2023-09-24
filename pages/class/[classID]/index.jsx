import { useState, useEffect } from 'react'
import { useUser, useSession } from '@supabase/auth-helpers-react'
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import "flowbite"
import { supabase } from 'utils/supabase';
import { useRouter } from 'next/router';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Link from 'next/link';
import AssignmentModal from 'components/modals/createAssignment.jsx'
import AddStudents from 'components/modals/addStudents.jsx'
import { Button, Drawer } from 'antd';

function SideBarHome() {
  return (
    <div className="flex h-screen w-1/6 flex-col mt-12 justify-between border-e bg-white">
    <div className="px-4 py-6">
      <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-md font-semibold text-gray-600">
        My Classes:
      </span>
      <ul className="mt-6 space-y-1">
        <li>
          <a
            href=""
            className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
          >
            General
          </a>
        </li>
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="text-sm font-medium"> Teams </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <ul className="mt-2 space-y-1 px-4">
              <li>
                <a
                  href=""
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Banned Users
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Calendar
                </a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a
            href=""
            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Billing
          </a>
        </li>
        <li>
          <a
            href=""
            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Invoices
          </a>
        </li>
      </ul>
    </div>
  </div>
)
};

function TopicCard3({header, score}) {
    return (
    <div className='mt-8'>
    <div className="btn flex justify-center shadow-[0_7px_0_0px_rgb(3,105,161)] md:hover:scale-[1.02] ease-out transition-all rounded p-6 bg-gray-50 border border-gray-200 rounded-lg shadow md:hover:bg-gray-100 dark:bg-slate-600 dark:border-gray-600 md:dark:hover:bg-gray-500">
  <h5 className="text-3xl font-semibold text-gray-900 dark:text-white">{header}</h5>
    <h5 className="text-lg mt-1 ml-6 text-gray-900 dark:text-white">Score : {score}</h5>
  </div>
    </div>
  )
};

function TopicCard4({linkSrc, header, dueDate}) {
  const date = new Date(dueDate);
  const options = { month: 'long', day: 'numeric', year : 'numeric' };
  const formattedDate = date.toLocaleString('en-US', options);
    return (
    <div className='mt-4 w-full'>
    <Link href={`${linkSrc}`}>
    <div className="btn md:hover:scale-[1.02] ease-out transition-all rounded p-6 border rounded-lg shadow bg-slate-600 border-gray-600 md:hover:bg-gray-400">
  <h5 className="text-md font-semibold text-gray-900 dark:text-white">{header}</h5>
    <span className="text-sm text-gray-900 dark:text-white">Due : {formattedDate}</span>
  </div>
  </Link>
    </div>
  )
};

function TopicCard5({linkSrc, header, dueDate, studentNum}) {
  const date = new Date(dueDate);
  const options = { month: 'long', day: 'numeric', year : 'numeric' };
  const formattedDate = date.toLocaleString('en-US', options);
    return (
      <div className='mt-4 w-full'>
      <Link href={`${linkSrc}`}>
      <div className="btn md:hover:scale-[1.02] ease-out transition-all rounded p-6 border rounded-lg shadow bg-slate-600 border-gray-600 md:hover:bg-gray-400">
  <h5 className="text-md font-semibold text-gray-900 dark:text-white">{header}</h5>
    <span className="text-sm text-gray-900 dark:text-white">Due : {formattedDate}</span>
    <h5 className="text-sm text-gray-900 dark:text-white">Completed by : {studentNum}</h5>
  </div>
  </Link>
    </div>
  )
};

 export default function ClassPage({ classData }) {

  const router = useRouter();
  const user = useUser()
  const session = useSession()
  const [studentsAvailable, setStudentsAvailable] = useState([])
  const [assignments, setAssignments] = useState([])
  const [isTeacher, setIsTeacher] = useState(false)
  const [studentAssignments, setStudentAssignments] = useState([])

  useEffect(() => {
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

    async function getAssignments() {
      let { data, error, status } = await supabase
        .from('assignments')
        .select(`*`)
        .eq('classID', classData[0].classID)
    
      setAssignments(data);
      setStudentAssignments(data);
    }

    getAssignments()
    async function getInitial() {
      if (user && user.id) {
        if (user.id === classData[0].user_id) {
          setIsTeacher(true)
        }
      }
    }
    getInitial()
  }, [classData, user]);

    async function removeAStudent(studentID) {
      const updatedStudents = classData[0].students.filter((student) => student !== studentID);
      const { error } = await supabase
      .from('classes')
      .update({ students: updatedStudents })
      .eq('classID', classData[0].classID)
      router.reload()
    }

    function SideBarAnt() {
      const [open, setOpen] = useState(false);
      const showDrawer = () => {
        setOpen(true);
      };
      const onClose = () => {
        setOpen(false);
      };
      return (
        <>
          <Button type="primary" style={{"backgroundColor" : "green"}} size='large' onClick={showDrawer} className='mt-8'> Open Assignment Window </Button>
          <Drawer title={classData[0]?.name.toUpperCase()} style={{"backgroundColor" : "gray"}} placement="left" onClose={onClose} open={open}>
            {isTeacher && (
              <>
                <h1 className='text-gray-700 capitalize text-2xl font-semibold'>Class Assignments:</h1>
                {assignments.map((Assignment) => (
                  <div key={Assignment.assignmentID} className="flex justify-center">
                    <TopicCard5 key={Assignment.assignmentID} studentNum={Assignment.completedBy?.length ? Assignment.completedBy.length : 0} dueDate={Assignment.dueDate} header={Assignment.name} linkSrc={`/class/${classData[0].classID}/assignment/${Assignment.assignmentID}`} />
                  </div>
                ))}
                <AssignmentModal subject={classData[0]?.subject} level={classData[0]?.level} userID={user?.id} classID={classData[0]?.classID} />
              </>
            )}
            {!isTeacher && (
              <>
              <h1 className='text-gray-700 text-2xl font-semibold'>My Remaining Assignments:</h1>
              {studentAssignments.length > 0 && (
                studentAssignments.map((Assignment) => {
                  const isCompleted = Assignment.completedBy && Assignment.completedBy.some((completedByUser) => completedByUser.id === user?.id);
                  
                  // Show assignments that are not completed
                  if (!isCompleted && Assignment.questions != null) {
                    return (
                      <div key={Assignment.assignmentID} className="flex mt-16 mb-16 justify-center">
                        <TopicCard4 dueDate={Assignment.dueDate} header={Assignment.name} linkSrc={`/class/${classData[0].classID}/assignment/${Assignment.assignmentID}/solve`} />      
                      </div>
                    );
                  }
                  
                  return null; // Return null for completed assignments to skip rendering them
                })
              )}
              </>
            )}
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          </Drawer>
        </>
      );
    };

    const [studentData, setStudentData] = useState([]);
    const title = `${classData[0].name} | teachmegcse`
        
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
        <div className="flex">
        {isTeacher &&
          <>
          <div className="block ml-36">
        <div className="flex justify-center">
        <h1 className='text-4xl font-bold mt-20 text-white'>{classData[0].name}</h1>
        </div>
        <div className="flex mt-12 justify-center">
          <div className="w-3/10">
          {(!classData[0].students || classData[0].students.length === 0) &&
          <h2 className='text-3xl mt-8 dark:text-gray-100'>Huh, you {"don't"} seem to have any Students</h2>
          }
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
                        <th scope="col" className="sm:px-4 px-2 py-3">
                          Edit
                        </th>
                      </tr>
                    </thead>
          {studentData.map((student) => (
              <>
                    <tbody key={student.id}>
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <td className="px-10 py-4">
                        <Link href={`/class/${classData[0].classID}/student/${student.id}`} className='text-blue-600 font-semibold text-xl underline hover:no-underline'>
                        {student.username}
                        </Link>
                      </td>
                        <td className="px-10 ml-8 py-4">
                        {student.questionsSolved?.filter((question) => question.Subject == 'physics').length || 0}
                        </td>
                        <td className="px-10 ml-8 py-4">
                        {student.questionsSolved?.filter((question) => question.Subject == 'physics' && (question.Correct.toString() == 'true')).length || 0}
                        </td>
                        <td className="sm:px-4 px-2 py-4">
                        {`${Math.round(((student.questionsSolved?.filter((question) => (question.Subject == 'physics') && (question.Correct.toString() == 'true')).length/student.questionsSolved?.filter((question) => question.Subject == 'physics').length) * 10000)) / 100} %`}
                        </td>
                        <td className="sm:px-4 px-2 py-4">
                          <DeleteOutlineOutlinedIcon onClick={() => removeAStudent(student.id)} fontSize="large" className='cursor-pointer ease-out transition-all hover:bg-gray-600 rounded rounded-xl'/>
                        </td>
                      </tr>
                    </tbody>
              </>
          ))}
          </table>            
          </div>
          }
        <AddStudents studentsAvailable={studentsAvailable} classData={classData} user={user} />
          </div>
        </div>
        <SideBarAnt />
        </div>
        </>
        }
        {!isTeacher &&
        <>
        <div className="block ml-96">
        <div className="flex justify-center">
        <h1 className='text-4xl font-bold mt-20 text-white'>{classData[0].name}</h1>
        </div>
        <h1 className='mt-20 flex justify-center text-4xl font-semibold text-white'>My completed assignments : </h1>
        {studentAssignments.filter((studentAssignment) => (
          // Show assignments that are completed by the user
          studentAssignment.completedBy && studentAssignment.completedBy.some((completedByItem) => completedByItem.id === user?.id)
        )).map((studentAssignment) => {
          // Find the completedBy object for the current user
          const completedByUser = studentAssignment.completedBy.find((completedByItem) => (
            completedByItem.id === user?.id
          ));

          // Calculate the score as Score / numOfQuestions
          const score = completedByUser ? `${completedByUser.Score} / ${completedByUser.numOfQuestions}` : "Not Completed";

          return (
            <div key={studentAssignment.assignmentID} className="flex mt-16 mb-16 justify-center">
              <TopicCard3 key={studentAssignment.assignmentID} header={studentAssignment.name} score={score} />      
            </div>
          );
        })}
        <SideBarAnt />
        </div>
      </>
        }
        </div>
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