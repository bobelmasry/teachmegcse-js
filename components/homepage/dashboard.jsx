import { useState, useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import "flowbite"
import Link from 'next/link';
import DataTable from "components/homepage/dataTable.jsx"
import { supabase } from 'utils/supabase'
import CreateClass from 'components/modals/createClass.jsx'
import UpdateClass from 'components/modals/updateClass.jsx'
import findStudentClasses from 'utils/findStudentClasses.js'
import findStudentAssignments from 'utils/findStudentAssignments.js'


export default function Dashboard({ session }) {

    const user = useUser()
      //for teachers
     function TopicCard({linkSrc, header, studentNum, level}) {
      return (
        <div>
        <Link href={`${linkSrc}`}>
        <div className="btn flex justify-center shadow-[0_7px_0_0px_rgb(3,105,161)] md:hover:scale-[1.02] ease-out transition-all rounded p-6 bg-gray-50 border border-gray-200 rounded-lg shadow md:hover:bg-gray-100 dark:bg-slate-600 dark:border-gray-600 md:dark:hover:bg-gray-500">
      <h5 className="text-3xl font-semibold text-gray-900 dark:text-white">{header}</h5>
        <h5 className="text-2xl mt-1 ml-4 text-gray-900 dark:text-white">{studentNum} Student(s)</h5>
        <h5 className="text-2xl mt-7 ml-6 text-gray-900 dark:text-white">{level}</h5>
      </div>
      </Link>
        </div>
      )
    };
    //for students
    function TopicCard2({linkSrc, header, assignmentNum}) {
      return (
        <div>
        <Link href={`${linkSrc}`}>
        <div className="btn flex justify-center shadow-[0_7px_0_0px_rgb(3,105,161)] md:hover:scale-[1.02] ease-out transition-all rounded p-6 bg-gray-50 border border-gray-200 rounded-lg shadow md:hover:bg-gray-100 dark:bg-slate-600 dark:border-gray-600 md:dark:hover:bg-gray-500">
      <h5 className="text-3xl font-semibold text-gray-900 dark:text-white">{header}</h5>
        <h5 className="text-2xl mt-1 ml-4 text-gray-900 dark:text-white">{assignmentNum} Assignment(s) remaining</h5>
      </div>
      </Link>
        </div>
      )
    };

    const [username, setUsername] = useState(null)
    const [initialGotten, setinitialGotten] = useState(false)
    const [isTeacher, setIsTeacher] = useState(false)
    const [school, setSchool] = useState('')
    const [questionsSolved, setQuestionsSolved] = useState([])
    const [classes, setClasses] = useState([])
    const [studentClasses, setStudentClasses] = useState([])
    const [studentAssignments, setStudentAssignments] = useState([])
    const [userCompletedAssignments, setUserCompletedAssignments] = useState([]);

    useEffect(() => {
      async function getProfile() {
        if (!initialGotten) {
        try {
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`*`)
            .eq('id', user.id)
            .single()

          if (error && status !== 406) {
            throw error
          }

          if (data) {
            setUsername(data.username)
            setQuestionsSolved(data.questionsSolved)
            setIsTeacher(data.isTeacher)
            setSchool(data.school)
            }
        } catch (error) {
          console.log(error)
        } finally {
          setinitialGotten(true)
        }
      }}

      async function getClasses () {
        if (!initialGotten) {
        const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('user_id', user.id)

        if (data) {
          setClasses(data)
        }
      }
      }
      async function getClassesForStudent() {
        if (user && user.id) {
          const studentClasses = await findStudentClasses(user.id);
          if (studentClasses) {
            setStudentClasses(studentClasses)
          }
        }
      }
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
      getClassesForStudent()
      getProfile()
      getClasses()
      getAssignmentsForStudent()
      }, [classes, initialGotten, questionsSolved, session, user, user.id])

  return (
    <>
    <div className="flex justify-center">
    <div className="w-11/12 sm:w-3/6 md:w-full">
      {username != null && 
      <div className="flex justify-start mb-6">
        <h2 className='text-5xl dark:text-gray-100'>Hi <span className='text-blue-500 font-semibold capitalize'>{username}</span>,</h2>
      </div>
      }
      {(!isTeacher) && 
        <>
      <div className="flex justify-start mb-12">
        <h2 className='text-4xl dark:text-gray-100'>My Stats:</h2>
      </div>
      <DataTable questionsSolved={questionsSolved} />
</>
}
{isTeacher && (
  <>
    {classes.length === 0 ? (
      <>
        <h2 className='text-3xl mt-8 dark:text-gray-100'>Huh, you {"don't"} seem to have any classes</h2>
        <div className="flex flex-flow justify-center mt-20 ml-60 md:ml-96">
        </div>
        <CreateClass user={user} school={school} />
      </>
    ) : (
      <>
        <div className="flex justify-start mb-12">
          <h2 className='text-4xl dark:text-gray-100'>Your Classes:</h2>
        </div>
        <div className="flex justify-center items-center">
        <div className="grid gap-10 mt-16 w-10/12 md:w-8/12">
        {classes.map((classItem) => (
          <div key={classItem.classID} className="flex">
            <TopicCard key={classItem.classID} level={classItem.level} header={classItem.name} linkSrc={`/class/${classItem.classID}`} studentNum={classItem.students ? classItem.students.length : 0} />
            <div>
              <UpdateClass userID={user.id} classID={classItem.classID} subject={classItem.subject} school={classItem.school} level={classItem.level} />
            </div>        
          </div>
          ))}
        </div>
        </div>
        <div className="flex flex-flow justify-center mt-32 ml-60 md:ml-96">
          <CreateClass user={user} school={school} />
        </div>
      </>
    )}
  </>
)}
          {(!isTeacher && school) && 
          <>
          <h1 className='text-4xl mt-20 dark:text-gray-100'>My Classes:</h1>
          {studentClasses.map((classItem) => {
        // Find the number of completed assignments for the current class
        const completedAssignmentsForClass = userCompletedAssignments.filter(
          (assignment) => assignment.classID === classItem.classID
        );

        return (
          <div key={classItem.classID} className="flex mt-10 mb-20">
            {/* Pass the number of completed assignments as the assignmentNum prop */}
            <TopicCard2 key={classItem.classID} header={classItem.name} linkSrc={`/class/${classItem.classID}`} assignmentNum={completedAssignmentsForClass.length} />
          </div>
        );
      })}
          </>
          }

      <div className="flex m-4 mt-4">
        <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-500 dark:focus:ring-red-800" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
      </div>
      </div>
  </>
  )
}