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
        <TopicCard header={"12: Motion in a circle"} linkSrc={"physics-revision-notes/12-motion-in-a-circle"} />
        <TopicCard header={"13: Gravitational fields"} linkSrc={"physics-revision-notes/13-gravitational-fields"} />
        <TopicCard header={"14: Temperature"} linkSrc={"physics-revision-notes/14-temperature"} />
        <TopicCard header={"15: Ideal gases"} linkSrc={"physics-revision-notes/15-ideal-gas"} />
        <TopicCard header={"16: Thermodynamics"} linkSrc={"physics-revision-notes/16-thermodynamics"} />
        <TopicCard header={"17: Oscillations"} linkSrc={"physics-revision-notes/17-oscillations"} />
        <TopicCard header={"18: Electric fields"} linkSrc={"physics-revision-notes/18-electric-fields"} />
        <TopicCard header={"19: Capacitance"} linkSrc={"physics-revision-notes/19-capacitance"} />
        <TopicCard header={"20: Magnetic fields"} linkSrc={"physics-revision-notes/20-magnetic-fields"} />
        <TopicCard header={"21: Alternating currents"} linkSrc={"physics-revision-notes/21-alternating-currents"} />
        <TopicCard header={"22: Quantum physics"} linkSrc={"physics-revision-notes/22-quantum-physics"} />
        <TopicCard header={"23: Nuclear physics"} linkSrc={"physics-revision-notes/23-nuclear-physics"} />
        <TopicCard header={"24: Medical physics"} linkSrc={"physics-revision-notes/24-medical-physics"} />
        <TopicCard header={"25: Astronomy and cosmology"} linkSrc={"physics-revision-notes/25-astronomy-and-cosmology"} />
      </div>
      </div>
    </>
  )
};
