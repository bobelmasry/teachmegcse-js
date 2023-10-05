import "flowbite";
import SubjectCard from "components/subjectCard.jsx"
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import { useSession } from '@supabase/auth-helpers-react'

export default function Home() {
  const session = useSession()
  return (
  <div>
    <Head>
      <title>IGCSE Resources | teachmegcse</title>
      <meta name="description" content="CAIE Past Papers for Cambridge IGCSE"></meta>
      <meta name="keywords" content="teachmegcse, teach me gcse, IGCSE revision notes, IGCSE past papers, IGCSE topic questions, 
      IGCSE math past papers, IGCSE physics past papers, IGCSE chemistry past papers"></meta>
      <Headstuff />
    </Head>
    <Navbar session={session} />
    <div className="mt-36 flex justify-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight dark:text-gray-100">IGCSE Content</h1>
      </div>
    <div className="flex justify-center items-center">
      <div className="grid grid-flow-row gap-16 mt-24 sm:mt-36 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-center mb-40 w-11/12 md:w-4/6 lg:w-4/6">
        <SubjectCard header={"Business (0450)"}  link1={"/IGCSE/business/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Biology (0610)"} link1={"/IGCSE/biology/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Chemistry (0620)"} link1={"/IGCSE/chemistry/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Computer Science (0478)"} link1={"/IGCSE/computer-science/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Economics (0455)"} link1={"/IGCSE/economics/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"English as a First Language (0500)"} link1={"/IGCSE/english-language/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"History (0470)"} link1={"/IGCSE/history/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Maths (0580)"} link1={"/IGCSE/math/"} link2={"#"} link3={"#"}  />
        <SubjectCard header={"Physics (0625)"} link1={"/IGCSE/physics/"} link2={"#"} link3={"#"} />
      </div>
    </div>
  </div>
  )
}