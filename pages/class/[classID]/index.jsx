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
import findStudentAssignments from 'utils/findStudentAssignments.js'

function TopicCard({linkSrc, header, dueDate, studentNum}) {
  const date = new Date(dueDate);
  const options = { month: 'long', day: 'numeric', year : 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = date.toLocaleString('en-US', options);
    return (
    <div className='mt-8'>
    <Link href={`${linkSrc}`}>
    <div className="btn flex justify-center shadow-[0_7px_0_0px_rgb(3,105,161)] md:hover:scale-[1.02] ease-out transition-all rounded p-6 bg-gray-50 border border-gray-200 rounded-lg shadow md:hover:bg-gray-100 dark:bg-slate-600 dark:border-gray-600 md:dark:hover:bg-gray-500">
  <h5 className="text-3xl font-semibold text-gray-900 dark:text-white">{header}</h5>
    <h5 className="text-lg mt-1 ml-4 text-gray-900 dark:text-white">Due : {formattedDate}</h5>
    <h5 className="text-lg mt-1 ml-4 text-gray-900 dark:text-white">Completed by : {studentNum}</h5>
  </div>
  </Link>
    </div>
  )
};

function TopicCard2({linkSrc, header, dueDate}) {
  const date = new Date(dueDate);
  const options = { month: 'long', day: 'numeric', year : 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = date.toLocaleString('en-US', options);
    return (
    <div className='mt-8'>
    <Link href={`${linkSrc}`}>
    <div className="btn flex justify-center shadow-[0_7px_0_0px_rgb(3,105,161)] md:hover:scale-[1.02] ease-out transition-all rounded p-6 bg-gray-50 border border-gray-200 rounded-lg shadow md:hover:bg-gray-100 dark:bg-slate-600 dark:border-gray-600 md:dark:hover:bg-gray-500">
  <h5 className="text-3xl font-semibold text-gray-900 dark:text-white">{header}</h5>
    <h5 className="text-lg mt-1 ml-4 text-gray-900 dark:text-white">Due : {formattedDate}</h5>
  </div>
  </Link>
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

 export default function ClassPage({ classData }) {

  const router = useRouter();
  const user = useUser()
  const session = useSession()
  const [studentsAvailable, setStudentsAvailable] = useState([])
  const [assignments, setAssignments] = useState([])
  const [isTeacher, setIsTeacher] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [studentAssignments, setStudentAssignments] = useState([])
  const [userCompletedAssignments, setUserCompletedAssignments] = useState([]);

    function isUserInClass(classes, userId) {
      return classes.some((classItem) => classItem.students.includes(userId));
    }

  useEffect(() => {
    const fetchData = async () => {
      if (!classData[0].students) {
        return;
      }
  
      const studentDataArray = [];
      for (const student of classData[0].students) {
        const { data } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('id', student);
        if (data.length === 0) {
          throw new Error('Profile not found');
        }
        studentDataArray.push(data[0]);
      }
      setStudentData(studentDataArray);
    };
  
    fetchData();

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
    
      setStudentsAvailable(studentsNotInClass);
    }

    addStudents()

    async function getAssignments() {
      let { data, error, status } = await supabase
        .from('assignments')
        .select(`*`)
        .eq('classID', classData[0].classID)
    
      setAssignments(data);
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
    async function getAssignmentsForStudent() {
      if (user && user.id) {
        const studentAssignments = await findStudentAssignments(user.id);
        if (studentAssignments) {
          setStudentAssignments(studentAssignments);
          // Assuming the assignments data is stored in a variable called 'assignments'
          const filteredAssignments = studentAssignments.filter((assignment) => {
            // Check if 'completedBy' exists and is not null before using 'find'
            if (assignment.completedBy && assignment.completedBy.length > 0) {
              const completedByUser = assignment.completedBy.find((user) => user.id === user.id);
              return !completedByUser;
            }
            return true; // Include assignments without 'completedBy' property
          });
          setUserCompletedAssignments(filteredAssignments);
        }
      }
    }
    getAssignmentsForStudent()
  }, [classData, user]);

  useEffect(() => {
    if (classData && classData.length > 0) {
      const isUserInAnyClass = isUserInClass(classData, user?.id);
      setIsStudent(isUserInAnyClass);
    }
  }, [classData, user?.id]);

    async function removeAStudent(studentID) {
      const updatedStudents = classData[0].students.filter((student) => student !== studentID);
      const { error } = await supabase
      .from('classes')
      .update({ students: updatedStudents })
      .eq('user_id', user.id)
      router.reload()
    }
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
        {isTeacher &&
          <>
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
                        {student.username}
                      </td>
                        <td className="px-10 ml-8 py-4">
                        {student.questionsSolved?.filter((question) => question.Subject == 'physics').length || 0}
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
          <div className="flex justify-start mt-20">
            <h1 className='text-4xl font-bold mb-20 text-white'>My Assignments</h1>
          </div>
          {assignments.map((Assignment) => (
          <div key={Assignment.assignmentID} className="flex justify-center">
            <TopicCard key={Assignment.assignmentID} studentNum={Assignment.completedBy?.length ? Assignment.completedBy.length : 0} dueDate={Assignment.dueDate} header={Assignment.name} linkSrc={`/class/${classData[0].classID}/assignment/${Assignment.assignmentID}`} />      
          </div>
          ))}
        <AssignmentModal subject={classData[0]?.subject} level={classData[0]?.level} userID={user?.id} classID={classData[0]?.classID} />
          </div>
        </div>
        </>
        }
        {!isTeacher && !isStudent &&
          <h1 className='mt-20 flex justify-center text-4xl text-white'>Hey, you {"don't"} seem to be a teacher</h1>
        }
        {!isTeacher && isStudent &&
        <>
        <h1 className='mt-20 flex justify-center text-5xl font-semibold text-white'>My remaining assignments : </h1>
        {userCompletedAssignments.length > 0 ? (
          userCompletedAssignments.map((Assignment) => (
            <div key={Assignment.assignmentID} className="flex mt-16 mb-16 justify-center">
              <TopicCard2 key={Assignment.assignmentID} dueDate={Assignment.dueDate} header={Assignment.name} linkSrc={`/class/${classData[0].classID}/assignment/${Assignment.assignmentID}/solve`} />      
            </div>
          ))
        ) : (
          <h1 className='mt-20 flex justify-center text-3xl font-semibold text-white'>All assignments complete !</h1>
        )}
        <h1 className='mt-20 flex justify-center text-4xl font-semibold text-white'>My completed assignments : </h1>
        {studentAssignments.filter((studentAssignment) => (
          !userCompletedAssignments.some((completedAssignment) => (
            completedAssignment.assignmentID === studentAssignment.assignmentID
          ))
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