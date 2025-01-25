import Link from "next/link"
import Image from "next/image"

interface ClassCardProps {
  linkSrc: string
  header: string
  studentNum: number
  level: string
  subject: "physics" | "chemistry" | "biology"
}

const subjectIcons = {
  physics: "https://cdn-icons-png.flaticon.com/512/188/188802.png",
  chemistry: "https://cdn-icons-png.flaticon.com/512/2802/2802825.png",
  biology: "https://cdn-icons-png.flaticon.com/512/2784/2784428.png",
}

export function ClassCard({ linkSrc, header, studentNum, level, subject }: ClassCardProps) {
  return (
    <div className="flex mt-2 justify-center">
      <Link href={linkSrc}>
        <article className="w-60 gap-4 md:hover:scale-[1.02] ease-out transition-all rounded-lg border border-gray-800 bg-slate-600 hover:bg-slate-500 p-2 shadow-sm transition hover:shadow-lg">
          <div className="flex gap-4">
            <span className="flex justify-center inline-block rounded bg-blue-600 p-4 text-white">
              <Image src={subjectIcons[subject] || "/placeholder.svg"} height={30} width={30} alt={subject} />
            </span>
            <h3 className="text-lg font-semibold text-gray-100">{header}</h3>
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
  )
}

