import Link from "next/link"
import { formatDate } from "@/components/utils/dateFormatter"

interface TopicCardProps {
  linkSrc?: string
  header: string
  dueDate?: string
  score?: string
  studentNum?: number
  questions? : number
  status? : string
  isTeacher? : boolean
}

export function TopicCard({ linkSrc, header, dueDate, score, studentNum, questions, status, isTeacher }: TopicCardProps) {
  const cardContent = (
    <div className="btn md:hover:scale-[1.02] ease-out transition-all rounded p-6 border rounded-lg shadow bg-slate-600 border-gray-600 md:hover:bg-slate-500">
      <h5 className="text-md font-semibold text-white">{header}</h5>
      {dueDate && <span className="text-sm text-white">Due: {formatDate(dueDate)}</span>}
      {score && <span className="text-sm text-white">Score: {score}</span>}
      {studentNum !== undefined && (
        <h5 className="text-sm text-white">Completed by: {studentNum}</h5>
      )}
      <p>Questions: {questions}</p>
      {isTeacher &&
      <p>Status: {status}</p>
      }
    </div>
  )

  if (linkSrc) {
    return (
      <div className="mt-4 mb-4 w-full">
        <Link href={linkSrc}>{cardContent}</Link>
      </div>
    )
  }

  return <div className="mt-4 mb-4 w-full">{cardContent}</div>
}

