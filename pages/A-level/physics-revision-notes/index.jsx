import "flowbite";
import TopicCard2 from "components/topicCard2.jsx"
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import { useSession } from '@supabase/auth-helpers-react'

export default function Home() {
  const session = useSession()
  return (
    <>
    <Head>
      <title>A Level Physics Revision Notes | teachmegcse</title>
      <meta name="description" content="CAIE Past Papers for Cambridge Int'l AS and A Level"></meta>
      <meta name="keywords" content="teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
      A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
      <Headstuff />
    </Head>
    <Navbar session={session} />
      <div className="flex justify-center mt-28">
        <h1 className="text-4xl sm:text-5xl font-bold dark:text-gray-100">A-level Physics Revision Notes</h1>
      </div>
      <div className="flex justify-center items-center ">
      <div className="grid grid-rows-4 gap-11 mt-16 mb-24 w-10/12 md:w-5/12 lg:w-3/12">
        <TopicCard2 header={"12: Motion in a circle"} linkSrc={"physics-revision-notes/12-motion-in-a-circle"} />
        <TopicCard2 header={"13: Gravitational fields"} linkSrc={"physics-revision-notes/13-gravitational-fields"} />
        <TopicCard2 header={"14: Temperature"} linkSrc={"physics-revision-notes/14-temperature"} />
        <TopicCard2 header={"15: Ideal gases"} linkSrc={"physics-revision-notes/15-ideal-gas"} />
        <TopicCard2 header={"16: Thermodynamics"} linkSrc={"physics-revision-notes/16-thermodynamics"} />
        <TopicCard2 header={"17: Oscillations"} linkSrc={"physics-revision-notes/17-oscillations"} />
        <TopicCard2 header={"18: Electric fields"} linkSrc={"physics-revision-notes/18-electric-fields"} />
        <TopicCard2 header={"19: Capacitance"} linkSrc={"physics-revision-notes/19-capacitance"} />
        <TopicCard2 header={"20: Magnetic fields"} linkSrc={"physics-revision-notes/20-magnetic-fields"} />
        <TopicCard2 header={"21: Alternating currents"} linkSrc={"physics-revision-notes/21-alternating-currents"} />
        <TopicCard2 header={"22: Quantum physics"} linkSrc={"physics-revision-notes/22-quantum-physics"} />
        <TopicCard2 header={"23: Nuclear physics"} linkSrc={"physics-revision-notes/23-nuclear-physics"} />
        <TopicCard2 header={"24: Medical physics"} linkSrc={"physics-revision-notes/24-medical-physics"} />
        <TopicCard2 header={"25: Astronomy and cosmology"} linkSrc={"physics-revision-notes/25-astronomy-and-cosmology"} />
      </div>
      </div>
    </>
  )
};
