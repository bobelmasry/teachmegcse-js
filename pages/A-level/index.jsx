import "flowbite";
import YearCard from "components/yearCard.jsx"
import Head from 'next/head';
import Navbar from "components/navbar.jsx"

export default function Home() {
  return (
  <div className="">
  <Head>
    <title>A-level - teachmegcse</title>
  </Head>
  <Navbar />
  <div className="flex justify-center items-center mt-32">
  <h1 className="text-4xl sm:text-5xl font-bold dark:text-gray-100">A-level Past Papers</h1>
  </div>
    <div className="flex justify-center items-center">
      <div className="grid grid-flow-row gap-12 mt-24 sm:mt-36 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-40">
        <YearCard linkSrc={"accounting"} header={"Accounting (9706)"} />
        <YearCard linkSrc={"#"} header={"Arabic (9680)"} />
        <YearCard linkSrc={"#"} header={"Business (9609)"} />
        <YearCard linkSrc={"biology"} header={"Biology (9700)"} />
        <YearCard linkSrc={"#"} header={"Chemistry (9701)"} />
        <YearCard linkSrc={"#"} header={"Computer Science (9618)"} />
        <YearCard linkSrc={"#"} header={"Economics (9708)"} />
        <YearCard linkSrc={"#"} header={"English Language (9093)"} />
        <YearCard linkSrc={"#"} header={"Geography (9696)"} />
        <YearCard linkSrc={"#"} header={"History (9489)"} />
        <YearCard linkSrc={"math"} header={"Maths (9709)"} />
        <YearCard linkSrc={"#"} header={"Physics (9702)"} />
      </div>
    </div>
  </div>
  )
}