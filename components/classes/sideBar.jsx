import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button
  } from '@chakra-ui/react'
  import { useRef } from 'react'
  import Link from 'next/link';
  import Image from 'next/image';

import AssignmentModal from '@/components/modals/createAssignment.jsx'

function ClassCard({linkSrc, header, studentNum, level, subject}) {
    return (
      <div className="flex mt-2 justify-center">
        <Link href={`${linkSrc}`}>
          <article className="w-60 gap-4 md:hover:scale-[1.02] ease-out transition-all rounded-lg border border-gray-100 bg-slate-600 hover:bg-slate-500 border-gray-800 p-2 shadow-sm transition hover:shadow-lg">
            <div className='flex gap-4'>
            <span className="flex justify-center inline-block rounded bg-blue-600 p-4 text-white">
              {subject === 'physics' && (
                <Image src={'https://cdn-icons-png.flaticon.com/512/188/188802.png'} height={30} width={30} alt="" />
              )}
              {subject === 'chemistry' && (
                <Image src={'https://cdn-icons-png.flaticon.com/512/2802/2802825.png'} height={30} width={30} alt="" />
              )}
              {subject === 'biology' && (
                <Image src={'https://cdn-icons-png.flaticon.com/512/2784/2784428.png'} height={30} width={30} alt="" />
              )}
            </span>
  
            <h3 className="text-lg font-semibold text-gray-100"> {header} </h3>
            </div>
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
    );
  }

  function TopicCard3({header, score}) {
    return (
      <div className='mt-4 mb-4 w-full'>
      <div className="btn md:hover:scale-[1.02] ease-out transition-all rounded p-6 border rounded-lg shadow bg-slate-600 border-gray-600 md:hover:bg-slate-500">
    <h5 className="text-md font-semibold text-gray-900 dark:text-white">{header}</h5>
      <span className="text-sm text-gray-900 dark:text-white">Score : {score}</span>
    </div>
      </div>
    )
  };
  
  function TopicCard4({linkSrc, header, dueDate}) {
    const date = new Date(dueDate);
    const options = { month: 'long', day: 'numeric', year : 'numeric' };
    const formattedDate = date.toLocaleString('en-US', options);
      return (
      <div className='mt-4 mb-4 w-full'>
      <Link href={`${linkSrc}`}>
      <div className="btn md:hover:scale-[1.02] ease-out transition-all rounded p-6 border rounded-lg shadow bg-slate-600 border-gray-600 md:hover:bg-slate-500">
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
        <div className="btn md:hover:scale-[1.02] ease-out transition-all rounded p-6 border rounded-lg shadow bg-slate-600 border-gray-600 md:hover:bg-slate-500">
    <h5 className="text-md font-semibold text-gray-900 dark:text-white">{header}</h5>
      <span className="text-sm text-gray-900 dark:text-white">Due : {formattedDate}</span>
      <h5 className="text-sm text-gray-900 dark:text-white">Completed by : {studentNum}</h5>
    </div>
    </Link>
      </div>
    )
  };

export default function SideBarHome({classData, isTeacher, studentAssignments, assignments, classes, user}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()
  
    return (
      <>
        <Button colorScheme='teal' marginTop={32} onClick={onOpen} className='sm:ml-8'>
        <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>

        </Button>
        <Drawer
          isOpen={isOpen}
          placement='left'
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
            {classData[0].name}
            </DrawerHeader>
  
            <DrawerBody>
          <div>
          <ul>
          <li>
            <details>
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 bg-gray-100">
                <span className="text-md font-medium text-black"> Other Classes </span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="black"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              {classes.map((classItem) => (
            <div key={classItem.classID}>
              <ClassCard key={classItem.classID} level={classItem.level} header={classItem.name} linkSrc={`/class/${classItem.classID}`} studentNum={classItem.students ? classItem.students.length : 0} subject={classItem.subject}/>
            </div>
            ))}
            </details>
          </li>
          {!isTeacher &&
          <>
          <li>
          <details className="group mt-2 [&_summary::-webkit-details-marker]:hidden" open={true}>
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 bg-gray-100 hover:text-gray-700">
                <span className="text-md font-medium text-black"> Remaining Assignments </span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="black"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
                {studentAssignments.length > 0 && (
                  studentAssignments.map((Assignment) => {
                    const isCompleted = Assignment.completedBy && Assignment.completedBy.some((completedByUser) => completedByUser.id === user?.id);
                    
                    // Show assignments that are not completed
                    if (!isCompleted && Assignment.questions != null) {
                      return (
                        <div key={Assignment.assignmentID} className="flex justify-center">
                          <TopicCard4 dueDate={Assignment.dueDate} header={Assignment.name} linkSrc={`/class/${classData[0]?.classID}/assignment/${Assignment.assignmentID}/solve`} />      
                        </div>
                      );
                    }
                    
                    return null; // Return null for completed assignments to skip rendering them
                  })
                )}
            </details>
            </li>
                    <li>
                    <details className="group mt-2 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 bg-gray-100">
                          <span className="text-md font-medium text-black"> Completed Assignments </span>
                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="black"
                              >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </summary>
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
                            <div key={studentAssignment.assignmentID} className="flex justify-center">
                              <TopicCard3 key={studentAssignment.assignmentID} header={studentAssignment.name} score={score} />      
                            </div>
                          );
                        })}
                      </details>
                      </li>
                      </>
            }
            {isTeacher &&
            <>
                    <li>
          <details className="group mt-2 [&_summary::-webkit-details-marker]:hidden" open={true}>
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 bg-gray-100 hover:text-gray-700">
                <span className="text-md font-medium text-black"> Assignments </span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="black"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              {assignments.map((Assignment) => (
                    <div key={Assignment.assignmentID} className="flex justify-center">
                      <TopicCard5 key={Assignment.assignmentID} studentNum={Assignment.completedBy?.length ? Assignment.completedBy.length : 0} dueDate={Assignment.dueDate} header={Assignment.name} linkSrc={`/class/${classData[0].classID}/assignment/${Assignment.assignmentID}`} />
                    </div>
                  ))}
            </details>
            </li>
            </>
            }
            {isTeacher &&
            <>
            <li>
            <Link href={`/class/${classData[0].classID}/student`} className="mt-2 block rounded-lg px-4 py-2 text-md font-medium bg-gray-100 text-black hover:text-gray-700">
              View Students
            </Link>
          </li>
          <li>
          <AssignmentModal subject={classData[0]?.subject} level={classData[0]?.level} userID={user?.id} classID={classData[0]?.classID} />
          </li>
          </>
          }
          {!isTeacher &&
            <>
            <li>
            <Link href={`/class/${classData[0].classID}/student`} className="mt-2 block rounded-lg px-4 py-2 text-md font-medium bg-gray-100 text-black hover:text-gray-700">
              Leaderboards
            </Link>
          </li>
          </>
          }
        </ul>
      </div>
    </DrawerBody>
                </DrawerContent>
        </Drawer>
      </>
    )
  }