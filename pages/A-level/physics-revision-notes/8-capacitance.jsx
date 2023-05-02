import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">19: Capacitance | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div className="mt-20">
      <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    19.1 Capacitors and Capacitance
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Capacitance is the ability of a capacitor to store electric charge. It is defined as the ratio of the charge stored on each conductor to the potential difference between them, i.e., C = Q/V.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The capacitance of a parallel-plate capacitor is given by C = εA/d, where ε is the permittivity of the medium between the plates, A is the area of each plate, and d is the distance between the plates.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Capacitors in series have a combined capacitance given by 1/C = 1/C1 + 1/C2 + 1/C3 + ..., while capacitors in parallel have a combined capacitance given by C = C1 + C2 + C3 + ....
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    19.2 Energy Stored in a Capacitor
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The electric potential energy stored in a capacitor is given by U = 1/2CV^2 or U = 1/2QV, where C is the capacitance, V is the potential difference, and Q is the charge on the capacitor.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    19.3 Discharging a Capacitor
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      When a capacitor discharges through a resistor, the potential difference, charge, and current vary with time.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The time constant τ = RC, where R is the resistance of the resistor and C is the capacitance of the capacitor.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The charge, current, and potential difference for a discharging capacitor can be modeled using equations of the form x = x0 e^(-t/RC), where x represents current, charge, or potential difference.
    </li>
  </ul>

      </div>
      </div>
      </div>
    </>
  )


};