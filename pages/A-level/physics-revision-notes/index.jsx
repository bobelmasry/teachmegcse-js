import "flowbite";
import TopicCard from "components/topicCard.jsx"
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-28">
        <h1 className="text-4xl sm:text-5xl font-bold dark:text-gray-100">A-level Physics Revision Notes</h1>
      </div>
      <div className="flex justify-center items-center ">
      <div className="grid grid-rows-4 gap-11 mt-16 mb-24 w-10/12 md:w-5/12 lg:w-3/12">
        <TopicCard header={"1: Motion in a circle"} linkSrc={"physics-revision-notes/1-motion-in-a-circle"} />
        <TopicCard header={"2: Gravitational fields"} linkSrc={"physics-revision-notes/2-gravitational-fields"} />
        <TopicCard header={"3: Temperature"} linkSrc={"physics-revision-notes/3-temperature"} />
        <TopicCard header={"4: Ideal gases"} linkSrc={"physics-revision-notes/4-ideal-gas"} />
        <TopicCard header={"5: Thermodynamics"} linkSrc={"physics-revision-notes/5-thermodynamics"} />
        <TopicCard header={"6: Oscillations"} linkSrc={"physics-revision-notes/6-oscillations"} />
        <TopicCard header={"7: Electric fields"} linkSrc={"physics-revision-notes/7-electric-fields"} />
        <TopicCard header={"8: Capacitance"} linkSrc={"physics-revision-notes/8-capacitance"} />
        <TopicCard header={"9: Magnetic fields"} linkSrc={"physics-revision-notes/9-magnetic-fields"} />
        <TopicCard header={"10: Alternating currents"} linkSrc={"physics-revision-notes/10-alternating-currents"} />
        <TopicCard header={"11: Quantum physics"} linkSrc={"physics-revision-notes/11-quantum-physics"} />
        <TopicCard header={"12: Nuclear physics"} linkSrc={"physics-revision-notes/12-nuclear-physics"} />
        <TopicCard header={"13: Medical physics"} linkSrc={"physics-revision-notes/13-medical-physics"} />
        <TopicCard header={"14: Astronomy and cosmology"} linkSrc={"physics-revision-notes/14-astronomy-and-cosmology"} />
      </div>
      </div>
    </>
  )
};
