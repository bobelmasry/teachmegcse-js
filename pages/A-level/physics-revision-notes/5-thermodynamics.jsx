import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">16: Thermodynamics | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div className="mt-20">
      <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    16.1 Internal Energy
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Internal energy is the sum of a random distribution of kinetic and potential energies associated with the molecules of a system. It is determined by the state of the system and is a function of temperature, pressure, and volume.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        A rise in temperature of an object is related to an increase in its internal energy. When heat is added to a system, its internal energy increases.
    </li>
</ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    16.2 The First Law of Thermodynamics
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The work done when the volume of a gas changes at constant pressure is given by W = pΔV, where p is the pressure and ΔV is the change in volume. The work done by the gas is positive, while the work done on the gas is negative.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The first law of thermodynamics states that the change in internal energy (∆U) of a system is equal to the heat added to the system (q) plus the work done on the system (W), expressed as ∆U = q + W.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The first law of thermodynamics is a statement of the conservation of energy. It states that energy cannot be created or destroyed, only transferred or converted from one form to another.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The sign convention for work and heat is important in the first law of thermodynamics. Work done on the system is negative and work done by the system is positive. Heat added to the system is positive, while heat removed from the system is negative.
    </li>
</ul>
      </div>
      </div>
      </div>
    </>
  )


};