import { useState, useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import "flowbite"
import Link from 'next/link';
import DataTable from "./dataTable.jsx"
import { supabase } from '../utils/supabase'
import CreateClass from '../modals/createClass.jsx'
import CreateWorksheet from '../modals/createWorksheet.jsx'
import UpdateClass from '../modals/updateClass.jsx'
import findStudentClasses from '../utils/findStudentClasses.js'
import findStudentAssignments from '../utils/findStudentAssignments.js'
import Image from 'next/image';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useRouter } from 'next/router';
import {
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'


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
      function ClassCard({ linkSrc, header, studentNum, level, subject }) {
        return (
          <div className="flex justify-center my-4">
            <Link href={linkSrc}>
              <article className="md:hover:scale-[1.05] transition-transform ease-out rounded-lg border border-gray-200 bg-slate-700 hover:bg-slate-600 p-6 shadow-md hover:shadow-lg">
                <div className="flex justify-center mb-4">
                <Image
                            src={
                              subject === "physics"
                                ? "https://cdn-icons-png.flaticon.com/512/188/188802.png"
                                : subject === "chemistry"
                                ? "https://cdn-icons-png.flaticon.com/512/2802/2802825.png"
                                : "https://cdn-icons-png.flaticon.com/512/2784/2784428.png"
                            }
                            height={80}
                            width={80}
                            alt={`${subject} icon`}
                          />
                </div>
                <h3 className="text-3xl font-semibold text-center text-gray-100 mb-4">
                  {header}
                </h3>
                <div className="flex justify-around mt-4">
                  <span className="whitespace-nowrap font-semibold rounded-full bg-purple-300 px-4 py-1 text-sm text-purple-600">
                    {studentNum} Student(s)
                  </span>
                  <span className="whitespace-nowrap font-semibold rounded-full bg-green-300 px-4 py-1 text-sm text-green-600">
                    {level}
                  </span>
                </div>
              </article>
            </Link>
          </div>
        );
      }

      function WorksheetCard({ linkSrc, header, subject, questionNum, level }) {
        return (
          <div className='flex justify-center my-4'>
            <Link href={linkSrc}>
              <article className="group md:hover:scale-105 transition-transform ease-out rounded-lg border border-gray-200 bg-slate-700 hover:bg-slate-600 p-6 shadow-lg hover:shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                  {header} - <span className="text-blue-400">{subject}</span>
                </h3>
      
                <div className="mt-4 flex gap-3">
                  <span className="whitespace-nowrap font-medium rounded-full bg-purple-500 px-4 py-1 text-sm text-white">
                    {questionNum} Question(s)
                  </span>
                  <span className="whitespace-nowrap font-medium rounded-full bg-green-500 px-4 py-1 text-sm text-white">
                    {level}
                  </span>
                </div>
              </article>
            </Link>
          </div>
        );
      }


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
    <div className="w-8/12 md:w-full m-auto">
      {username != null && 
      <div className="flex justify-start mb-6 ml-4">
        <h2 className='text-5xl dark:text-gray-100'>Hi <span className='text-blue-500 font-semibold capitalize'>{username}</span>,</h2>
      </div>
      }
      {(!isTeacher) && 
        <>
      <div className="flex justify-start mb-12 ml-4">
        <h2 className='text-4xl dark:text-gray-100'>My Stats:</h2>
      </div>
      <DataTable questionsSolved={questionsSolved} />
</>
}
{isTeacher && (
  <>
    {classes.length === 0 ? (
      <>
        <h2 className='text-3xl mt-8 mb-8 dark:text-gray-100'>Huh, you {"don't"} seem to have any classes</h2>
        <CreateClass user={user} school={school} />
      </>
    ) : (
      <>
        <div className="flex justify-start mb-12">
          <h2 className='text-4xl dark:text-gray-100 ml-4'>Your Classes:</h2>
        </div>
        <div className="flex justify-center items-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-10  w-9/12 md:w-10/12">
        {classes.map((classItem) => (
          <div key={classItem.classID}>
            <ClassCard key={classItem.classID} level={classItem.level} header={classItem.name} linkSrc={`/class/${classItem.classID}`} studentNum={classItem.students ? classItem.students.length : 0} subject={classItem.subject}/>
              <div className='flex justify-end'>
                <UpdateClass userID={user.id} classID={classItem.classID} subject={classItem.subject} school={classItem.school} level={classItem.level} />
              </div>
          </div>
          ))}
        </div>
        </div>
        <div className="flex mt-20 justify-start mb-12 ml-4">
          <h2 className='text-4xl dark:text-gray-100'>Your Worksheets:</h2>
        </div>
        <div className="flex mt-12 justify-center items-center flex-col gap-8">
        {worksheets.map((worksheet) => (
          <div key={worksheet.id} className='flex no-wrap'>
            <WorksheetCard key={worksheet.id} level={worksheet.level} header={worksheet.name} linkSrc={`/worksheet/${worksheet.id}`} questionNum={worksheet.questions ? worksheet.questions.length : 0} subject={worksheet.subject}/>
            <DeleteOutlineOutlinedIcon onClick={() => removeAWorksheet(worksheet.id)} fontSize="large" className='cursor-pointer ease-out transition-all bg-gray-500 hover:bg-gray-300 mt-8 ml-4 rounded rounded-xl'/>
          </div>
          ))}
          </div>
        <div className="flex flex-flow justify-center mt-32 w-full ml-40">
          <CreateClass user={user} school={school} />
        </div>
        <div className="flex flex-flow justify-center mt-6 w-full ml-40">
          <CreateWorksheet user={user} />
        </div>
      </>
    )}
  </>
)}
          {(!isTeacher && school) && 
          <div>
          <h1 className='text-4xl mt-20 mb-12 dark:text-gray-100'>My Classes:</h1>
          <TableContainer backgroundColor="gray.800" borderRadius="lg" p={4} shadow="lg">
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th color="teal.300" fontSize="lg">Class Name</Th>
                  <Th color="teal.300" fontSize="lg">Subject</Th>
                  <Th isNumeric color="teal.300" fontSize="lg">Assignments</Th>
                  <Th color="teal.300" fontSize="lg">Level</Th>
                </Tr>
              </Thead>
              <Tbody>
                {studentClasses.map((classItem) => {
                  return (
                    <Tr key={classItem.classID} _hover={{ bg: "gray.700" }}>
                      <Td>
                        <div className="flex gap-4 items-center">
                          <Link href={`/class/${classItem.classID}`}>
                            <Text
                              color="blue.400"
                              as="u"
                              fontWeight="bold"
                              _hover={{ color: "blue.300" }}
                            >
                              {classItem.name}
                            </Text>
                          </Link>
                          <Image
                            src={
                              classItem.subject === "physics"
                                ? "https://cdn-icons-png.flaticon.com/512/188/188802.png"
                                : classItem.subject === "chemistry"
                                ? "https://cdn-icons-png.flaticon.com/512/2802/2802825.png"
                                : "https://cdn-icons-png.flaticon.com/512/2784/2784428.png"
                            }
                            height={40}
                            width={40}
                            alt={`${classItem.subject} icon`}
                          />
                        </div>
                      </Td>
                      <Td textTransform="capitalize">{classItem.subject}</Td>
                      <Td isNumeric>{classItem.students ? classItem.students.length : 0}</Td>
                      <Td textTransform="capitalize">{classItem.level}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          </div>
          }

      <div className="ml-4 w-full mt-12 mb-8">
        <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-500 dark:focus:ring-red-800" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
      </div>
  </>
  )
}