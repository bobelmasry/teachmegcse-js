import "flowbite";
import SubjectCard from "components/subjectCard.jsx"
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"

export default function Home() {
  return (
  <div>
  <Head>
    <title>teachmegcse | A-level and IGCSE Content</title>
    <meta name="description" content="CAIE Past Papers for Cambridge Int'l AS and A Level"></meta>
    <meta name="keywords" content="teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
    <Headstuff />
  </Head>
  <Navbar />
  <div className="mt-36 flex justify-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight dark:text-gray-100">A-level Content</h1>
      </div>
    <div className="flex justify-center items-center">
      <div className="grid grid-flow-row gap-16 mt-24 sm:mt-36 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-center mb-40 w-11/12 md:w-4/6 lg:w-4/6">
        <SubjectCard header={"Accounting (9706)"} link1={"/A-level/accounting/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Arabic (9680)"} link1={"/A-level/arabic/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Business (9609)"} link1={"/A-level/business/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Biology (9700)"} link1={"/A-level/biology/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Chemistry (9701)"} link1={"/A-level/chemistry/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Computer Science (9618)"} link1={"/A-level/computer-science/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Economics (9708)"} link1={"/A-level/economics/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"English Language (9093)"} link1={"/A-level/english-language/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Geography (9696)"} link1={"/A-level/geography/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"History (9489)"} link1={"/A-level/history/"} link2={"#"} link3={"#"} />
        <SubjectCard header={"Maths (9709)"} link1={"/A-level/math/"} link2={"/A-level/math-revision-notes"} link3={"#"}  />
        <SubjectCard header={"Physics (9702)"} revisionNotes={true} link1={"/A-level/physics/"} link2={"/A-level/physics-revision-notes"} link3={"#"} />
      </div>
    </div>
  </div>
  )
}