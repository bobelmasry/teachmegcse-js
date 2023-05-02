import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">21: Alternating Currents | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div className="mt-20">
      <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    21.1 Characteristics of alternating currents:
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Period and Frequency: An alternating current (AC) changes its direction and magnitude periodically. The time taken to complete one cycle is called the period (T), while the number of cycles per second is called frequency (f). They are related by T = 1/f.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Peak value: The peak value is the maximum value reached by the current during each cycle. For a sinusoidal alternating current, it is given by I0.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Sinusoidal alternating current: The current is given by the equation I = I0 sin(ωt), where ω = 2πf is the angular frequency.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Mean power: The mean power in a resistive load is half the maximum power for a sinusoidal alternating current, given by P = (I0^2 R)/2.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        R.M.S. value: The root-mean-square (r.m.s.) value of a current or voltage is the equivalent steady direct current or voltage that produces the same power in a resistive load. For a sinusoidal alternating current, I_r.m.s. = I0/√2 and V_r.m.s. = V0/√2.
    </li>
</ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    21.2 Rectification and smoothing:
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Half-wave rectification: In half-wave rectification, a single diode is used to convert AC to DC by allowing current to flow only in one direction. The output voltage is pulsating DC with a frequency twice that of the input AC.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Full-wave rectification: In full-wave rectification, a bridge rectifier made of four diodes is used to convert AC to DC by allowing current to flow in one direction. The output voltage is pulsating DC with a frequency twice that of the input AC.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Smoothing: In smoothing, a capacitor is used to reduce the ripple in the output voltage. The capacitor charges during the peaks of the pulsating DC and discharges during the troughs, resulting in a smoother output voltage. The effect of capacitance and load resistance on smoothing should be considered.
    </li>
</ul>

      </div>
      </div>
      </div>
    </>
  )


};