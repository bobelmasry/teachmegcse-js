import { useState, useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import "flowbite"
import Link from 'next/link';
import DataTable from "components/homepage/dataTable.jsx"
import { supabase } from 'utils/supabase'
import CreateClass from 'components/modals/createClass.jsx'
import CreateWorksheet from 'components/modals/createWorksheet.jsx'
import UpdateClass from 'components/modals/updateClass.jsx'
import findStudentClasses from 'utils/findStudentClasses.js'
import findStudentAssignments from 'utils/findStudentAssignments.js'
import Image from 'next/image';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useRouter } from 'next/router';


export default function Dashboard({ session }) {

    const user = useUser()
    const router = useRouter()

    async function removeAWorksheet(worksheetID) {
      console.log(worksheetID);
      const { error } = await supabase
      .from('worksheets')
      .delete()
      .eq('id', worksheetID)
      if (error){
        console.log(error);
      }
      router.reload()
    }
      //for teachers
    function ClassCard({linkSrc, header, studentNum, level, subject}) {
      return (
        <div className='flex justify-center'>
        <Link href={`${linkSrc}`}>

      <article className="md:hover:scale-[1.02] ease-out transition-all rounded-lg border border-gray-100 bg-slate-600 hover:bg-slate-500 border-gray-800 p-4 shadow-sm transition hover:shadow-lg sm:p-6" >
        <span className="flex justify-center inline-block rounded bg-blue-600 p-2 text-white">
          {subject == 'physics' &&
          <Image src={'https://cdn-icons-png.flaticon.com/512/188/188802.png'} height={100} width={100} alt='' />
          }
          {subject == 'chemistry' &&
          <Image src={'https://cdn-icons-png.flaticon.com/512/2802/2802825.png'} height={100} width={100} alt='' />
          }
          {subject == 'biology' &&
          <Image src={'https://cdn-icons-png.flaticon.com/512/2784/2784428.png'} height={100} width={100} alt='' />
          }
        </span>

          <h3 className="text-3xl mt-2 font-semibold text-gray-100"> {header} </h3>

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap font-semibold rounded-full bg-purple-300 px-2.5 py-0.5 text-sm text-purple-600">
            {studentNum} Student(s)
          </span>

          <span className="whitespace-nowrap font-semibold rounded-full bg-green-300 px-2.5 py-0.5 text-sm text-purple-600">
            {level}
          </span>
    </div>
      </article>
      </Link>
        </div>
      )
    };
    //for students
    function ClassCard2({linkSrc, header, subject, assignmentNum, level}) {
      return (
        <div className='flex justify-center'>
        <Link href={`${linkSrc}`}>

      <article className="md:hover:scale-[1.02] ease-out transition-all rounded-lg border border-gray-100 bg-slate-600 hover:bg-slate-500 border-gray-800 p-4 shadow-sm transition hover:shadow-lg sm:p-6" >
        <span className="flex justify-center inline-block rounded bg-blue-600 p-4 text-white">
          {subject == 'physics' &&
          <Image src={'https://cdn-icons-png.flaticon.com/512/188/188802.png'} height={100} width={100} alt='' />
          }
          {subject == 'chemistry' &&
          <Image src={'https://cdn-icons-png.flaticon.com/512/2802/2802825.png'} height={100} width={100} alt='' />
          }
          {subject == 'biology' &&
          <Image src={'https://cdn-icons-png.flaticon.com/512/2784/2784428.png'} height={100} width={100} alt='' />
          }
        </span>

          <h3 className="text-3xl mt-2 font-semibold text-gray-100"> {header} </h3>

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap font-semibold rounded-full bg-purple-300 px-2.5 py-0.5 text-sm text-purple-600">
            {assignmentNum} Assignment(s)
          </span>
          <span className="whitespace-nowrap font-semibold rounded-full bg-green-300 px-2.5 py-0.5 text-sm text-purple-600">
            {level}
          </span>
    </div>
      </article>
      </Link>
        </div>
      )
    };

    function WorksheetCard({linkSrc, header, subject, questionNum, level}) {
      return (
        <div className='flex justify-center'>
        <Link href={`${linkSrc}`}>

      <article className="md:hover:scale-[1.02] ease-out transition-all rounded-lg border border-gray-100 bg-slate-600 hover:bg-slate-500 border-gray-800 p-4 shadow-sm transition hover:shadow-lg sm:p-6" >

          <h3 className="text-3xl mt-2 font-semibold text-gray-100"> {header} - {subject} </h3>

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap font-semibold rounded-full bg-purple-300 px-2.5 py-0.5 text-sm text-purple-600">
            {questionNum} Question (s)
          </span>
          <span className="whitespace-nowrap font-semibold rounded-full bg-green-300 px-2.5 py-0.5 text-sm text-purple-600">
            {level}
          </span>
    </div>
      </article>
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
    const [worksheets, setWorksheets] = useState([])
    const [studentClasses, setStudentClasses] = useState([])
    const [studentAssignments, setStudentAssignments] = useState([])

    useEffect(() => {
  
      const fetchData = async () => {
        if (!initialGotten && session && session.user) {
          const userId = session.user.id;
  
          try {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userId)
              .single();
  
              const { data: classesData, error: classesError } = await supabase
              .from('classes')
              .select('*')
              .eq('user_id', userId);

              const { data: worksheetData, error: worksheetError } = await supabase
              .from('worksheets')
              .select('*')
              .eq('user_id', userId);
  
            const studentClasses = await findStudentClasses(userId);
  
            const studentAssignments = await findStudentAssignments(userId);
  
            setUsername(profileData.username);
            setQuestionsSolved(profileData.questionsSolved);
            setIsTeacher(profileData.isTeacher);
            setSchool(profileData.school);
            setClasses(classesData || []);
            setWorksheets(worksheetData || []);
            setStudentClasses(studentClasses);
            setStudentAssignments(studentAssignments);
            setinitialGotten(true)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      };
  
      fetchData();
    }, [session, initialGotten]);
    
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-10 mt-16 w-11/12 md:w-10/12">
        {classes.map((classItem) => (
          <div key={classItem.classID}>
            <ClassCard key={classItem.classID} level={classItem.level} header={classItem.name} linkSrc={`/class/${classItem.classID}`} studentNum={classItem.students ? classItem.students.length : 0} subject={classItem.subject}/>
              <UpdateClass userID={user.id} classID={classItem.classID} subject={classItem.subject} school={classItem.school} level={classItem.level} />
          </div>
          ))}
        </div>
        </div>
        <div className="flex mt-20 justify-start mb-12">
          <h2 className='text-4xl dark:text-gray-100'>Your Worksheets:</h2>
        </div>
        <div className="flex mt-12 justify-center items-center">
        {worksheets.map((worksheet) => (
          <div key={worksheet.id} className='flex no-wrap'>
            <WorksheetCard key={worksheet.id} level={worksheet.level} header={worksheet.name} linkSrc={`/worksheet/${worksheet.id}`} questionNum={worksheet.questions ? worksheet.questions.length : 0} subject={worksheet.subject}/>
            <DeleteOutlineOutlinedIcon onClick={() => removeAWorksheet(worksheet.id)} fontSize="large" className='cursor-pointer ease-out transition-all bg-gray-500 hover:bg-gray-300 mt-8 ml-4 rounded rounded-xl'/>
          </div>
          ))}
          </div>
        <div className="flex flex-flow justify-center mt-32 ml-60 md:ml-96">
          <CreateClass user={user} school={school} />
        </div>
        <div className="flex flex-flow justify-center mt-6 ml-60 md:ml-96">
          <CreateWorksheet user={user} />
        </div>

      </>
    )}
  </>
)}
          {(!isTeacher && school) && 
          <div>
          <h1 className='text-4xl mt-20 dark:text-gray-100'>My Classes:</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-10 w-11/12 md:w-10/12 mb-20">
          {studentClasses.map((classItem) => {
            // Find the assignments that belong to the current class and are not completed by the user
            const incompleteAssignmentsForClass = studentAssignments.filter((assignment) => (
              assignment.classID === classItem.classID && assignment.questions != null &&
              !assignment.completedBy?.some((completedByItem) => completedByItem.id === user?.id)
            ));

            return (
              <div key={classItem.classID} className="flex mt-10">
                {/* Pass the number of incomplete assignments as the assignmentNum prop */}
                <ClassCard2 key={classItem.classID} level={classItem.level} subject={classItem.subject} header={classItem.name} linkSrc={`/class/${classItem.classID}`} assignmentNum={incompleteAssignmentsForClass.length} />
              </div>
            );
          })}
          </div>
          </div>
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