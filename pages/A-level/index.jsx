import "flowbite";
import YearCard from "components/yearCard.jsx"
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"

export default function Home() {
  return (
  <div>
  <Head>
    <title>Past Papers | A Levels</title>
    <meta name="description" content="CAIE Past Papers for Cambridge Int'l AS and A Level"></meta>
    <Headstuff />
  </Head>
  <Navbar />
  <div className="flex justify-center items-center mt-32">
  <h1 className="text-4xl sm:text-5xl font-bold dark:text-gray-100">A-level Past Papers</h1>
  </div>
    <div className="flex justify-center items-center">
      <div className="grid grid-flow-row gap-12 mt-24 sm:mt-36 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-40">
        <YearCard linkSrc={"accounting"} header={"Accounting (9706)"} />
        <YearCard linkSrc={"arabic"} header={"Arabic (9680)"} />
        <YearCard linkSrc={"business"} header={"Business (9609)"} />
        <YearCard linkSrc={"biology"} header={"Biology (9700)"} />
        <YearCard linkSrc={"chemistry"} header={"Chemistry (9701)"} />
        <YearCard linkSrc={"computer-science"} header={"Computer Science (9618)"} />
        <YearCard linkSrc={"economics"} header={"Economics (9708)"} />
        <YearCard linkSrc={"english-language"} header={"English Language (9093)"} />
        <YearCard linkSrc={"geography"} header={"Geography (9696)"} />
        <YearCard linkSrc={"history"} header={"History (9489)"} />
        <YearCard linkSrc={"math"} header={"Maths (9709)"} />
        <YearCard linkSrc={"physics"} header={"Physics (9702)"} />
      </div>
    </div>
  </div>
  )
}