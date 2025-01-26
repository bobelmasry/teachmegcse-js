import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react"
import { useRef } from "react"
import Link from "next/link"
import { ClassCard } from "@/components/classes/ClassCard"
import { TopicCard } from "@/components/classes/TopicCard"
import AssignmentModal from "@/components/classes/createAssignment"

interface Class {
  classID: string
  name: string
  level: string
  subject: "physics" | "chemistry" | "biology"
  students?: { id: string }[]
}

interface Assignment {
  assignmentID: string
  name: string
  dueDate: string
  questions: any
  completedBy?: { id: string; Score: number; numOfQuestions: number }[]
}

interface SideBarHomeProps {
  classData: Class[]
  isTeacher: boolean
  studentAssignments: Assignment[]
  assignments: Assignment[]
  classes: Class[]
  user: { id: string }
}

export default function SideBarHome({
  classData,
  isTeacher,
  studentAssignments,
  assignments,
  classes,
  user,
}: SideBarHomeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef<HTMLElement | null>(null);

  return (
    <>
      <Button colorScheme="teal" marginTop={32} onClick={onOpen} className="sm:ml-8">
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
      <Drawer isOpen={isOpen} placement="left" initialFocusRef={firstField as React.RefObject<HTMLElement>} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{classData[0].name}</DrawerHeader>
          <DrawerBody>
            <div>
              <ul>
                <li>
                  <details className="group mt-2 [&_summary::-webkit-details-marker]:hidden" open={false}>
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 bg-gray-100">
                      <span className="text-md font-medium text-black">Other Classes</span>
                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>
                    {classes.map((classItem) => (
                      <ClassCard
                        key={classItem.classID}
                        level={classItem.level}
                        header={classItem.name}
                        linkSrc={`/class/${classItem.classID}`}
                        studentNum={classItem.students ? classItem.students.length : 0}
                        subject={classItem.subject}
                      />
                    ))}
                  </details>
                </li>
                {!isTeacher && (
                  <>
                    <li>
                      <details className="group mt-2 [&_summary::-webkit-details-marker]:hidden" open={true}>
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 bg-gray-100 hover:text-gray-700">
                          <span className="text-md font-medium text-black">Remaining Assignments</span>
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
                        {studentAssignments.length > 0 &&
                          studentAssignments.map((assignment) => {
                            const isCompleted =
                              assignment.completedBy &&
                              assignment.completedBy.some((completedByUser) => completedByUser.id === user?.id)
                            if (!isCompleted && assignment.questions != null) {
                              return (
                                <TopicCard
                                  key={assignment.assignmentID}
                                  dueDate={assignment.dueDate}
                                  header={assignment.name}
                                  linkSrc={`/class/${classData[0]?.classID}/assignment/${assignment.assignmentID}/solve`}
                                />
                              )
                            }
                            return null
                          })}
                      </details>
                    </li>
                    <li>
                      <details className="group mt-2 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 bg-gray-100">
                          <span className="text-md font-medium text-black">Completed Assignments</span>
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
                        {studentAssignments
                          .filter(
                            (studentAssignment) =>
                              studentAssignment.completedBy &&
                              studentAssignment.completedBy.some((completedByItem) => completedByItem.id === user?.id),
                          )
                          .map((studentAssignment) => {
                            const completedByUser = studentAssignment.completedBy?.find(
                              (completedByItem) => completedByItem.id === user?.id,
                            )
                            const score = completedByUser
                              ? `${completedByUser.Score} / ${completedByUser.numOfQuestions}`
                              : "Not Completed"
                            return (
                              <TopicCard
                                key={studentAssignment.assignmentID}
                                header={studentAssignment.name}
                                score={score}
                              />
                            )
                          })}
                      </details>
                    </li>
                  </>
                )}
                {isTeacher && (
                  <>
                    <li>
                      <details className="group mt-2 [&_summary::-webkit-details-marker]:hidden" open={true}>
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 bg-gray-100 hover:text-gray-700">
                          <span className="text-md font-medium text-black">Assignments</span>
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
                        {assignments.map((assignment) => (
                          <TopicCard
                            key={assignment.assignmentID}
                            studentNum={assignment.completedBy?.length ?? 0}
                            dueDate={assignment.dueDate}
                            header={assignment.name}
                            linkSrc={`/class/${classData[0].classID}/assignment/${assignment.assignmentID}`}
                          />
                        ))}
                      </details>
                    </li>
                    <li>
                      <Link
                        href={`/class/${classData[0].classID}/student`}
                        className="mt-2 block rounded-lg px-4 py-2 text-md font-medium bg-gray-100 text-black hover:text-gray-700"
                      >
                        View Students
                      </Link>
                    </li>
                    <li>
                      <AssignmentModal
                        subject={classData[0]?.subject}
                        level={classData[0]?.level}
                        userID={user?.id}
                        classID={classData[0]?.classID}
                      />
                    </li>
                  </>
                )}
                {!isTeacher && (
                  <li>
                    <Link
                      href={`/class/${classData[0].classID}/student`}
                      className="mt-2 block rounded-lg px-4 py-2 text-md font-medium bg-gray-100 text-black hover:text-gray-700"
                    >
                      Leaderboards
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

