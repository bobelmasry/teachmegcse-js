import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">20: Magnetic Fields | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div class="mt-4">
      <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    20.1 Concept of a Magnetic Field
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      A magnetic field is a region in which a magnetic force can be observed. It can be produced either by moving charges or by permanent magnets.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Magnetic fields are represented by field lines, which point from north to south outside the magnet and from south to north inside the magnet.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    20.2 Force on a Current-Carrying Conductor
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      When a current-carrying conductor is placed in a magnetic field, a force may act on the conductor.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The force on a current-carrying conductor is given by F = BIL sin θ, where B is the magnetic flux density, I is the current, L is the length of the conductor, and θ is the angle between the direction of the magnetic field and the direction of the current.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Magnetic flux density is defined as the force acting per unit current per unit length on a wire placed at right angles to the magnetic field.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    20.3 Force on a Moving Charge
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      When a charged particle moves in a magnetic field, a force is exerted on the particle.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The force on a moving charge in a magnetic field is given by F = BQv sin θ, where B is the magnetic flux density, Q is the charge on the particle, v is the velocity of the particle, and θ is the angle between the velocity vector and the magnetic field vector.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The Hall effect is the production of a voltage across a conductor in a magnetic field, perpendicular to the direction of current flow. The Hall voltage is given by VH = BI/(ntq), where B is the magnetic flux density, I is the current, t is the thickness of the conductor, n is the number of charge carriers per unit volume, and q is the charge on each carrier.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The motion of a charged particle moving in a uniform magnetic field perpendicular to the direction of motion is circular.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Electric and magnetic fields can be used in velocity selection to select charged particles with a specific velocity.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    20.4 Magnetic Fields due to Currents
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Magnetic field patterns can be sketched for the currents in a long straight wire, a flat circular coil, and a long solenoid.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The magnetic field due to the current in a solenoid is increased by a ferrous core.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The forces between current-carrying conductors can be explained by the interaction of the magnetic fields produced by the currents.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    20.5 Electromagnetic induction
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Magnetic flux: The product of magnetic flux density (B) and cross-sectional area (A) perpendicular to the direction of magnetic flux density is called magnetic flux (Φ = BA).
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Magnetic flux linkage: The magnetic flux linkage (NΦ) of a coil is the product of the number of turns of the coil (N) and the magnetic flux (Φ) that links with each turn.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Faraday’s law of electromagnetic induction: Whenever there is a change in magnetic flux linked with a coil, an induced e.m.f. is produced in the coil. The magnitude of the induced e.m.f. is directly proportional to the rate of change of magnetic flux linkage. Mathematically, e.m.f. = -N(dΦ/dt).
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Lenz’s law: The direction of the induced e.m.f. is always such that it opposes the change producing it. This law is based on the conservation of energy.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Factors affecting the magnitude of induced e.m.f.: The magnitude of the induced e.m.f. is directly proportional to the rate of change of magnetic flux linkage, the number of turns in the coil and the strength of the magnetic field. The direction of the induced e.m.f. depends on the direction and rate of change of magnetic flux linkage.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Applications of electromagnetic induction: Electromagnetic induction is the basis for the operation of many devices, including generators, transformers, and induction coils. Generators convert mechanical energy into electrical energy, while transformers change the voltage or current level of an alternating current signal. Induction coils are used in applications such as metal detectors and spark ignition systems for internal combustion engines.
    </li>
  </ul>

      </div>
      </div>
      </div>
    </>
  )


};