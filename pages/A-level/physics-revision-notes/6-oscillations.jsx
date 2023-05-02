import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">17: Oscillations | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div className="mt-20">
      <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    17.1 Simple Harmonic Oscillations
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Simple harmonic motion occurs when acceleration is proportional to the displacement from a fixed point and in the opposite direction. The terms displacement, amplitude, period, frequency, angular frequency, and phase difference are used to describe oscillations. The period can be expressed in terms of both frequency and angular frequency.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The equation of motion for a simple harmonic oscillator is a = -ω^2x, where a is the acceleration, x is the displacement, and ω is the angular frequency. The solution to this equation is x = x0 sin(ωt), where x0 is the amplitude of the oscillation.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The velocity of an oscillator is given by v = v0 cos(ωt), where v0 is the maximum velocity of the oscillator.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The kinetic and potential energy of an oscillator in simple harmonic motion interchange during the motion. The total energy of the oscillator is given by E = 1/2mω^2x0^2, where m is the mass of the oscillator.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    17.2 Damped and Forced Oscillations, Resonance
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Damping occurs when a resistive force acts on an oscillating system, causing it to lose energy over time.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Light, critical, and heavy damping are three types of damping. Light damping results in oscillations that slowly decay to zero, while heavy damping results in oscillations that do not oscillate at all. Critical damping results in the quickest return to equilibrium without overshooting.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Resonance occurs when an oscillator is forced to oscillate at its natural frequency. At resonance, the amplitude of the oscillation is at a maximum.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl font-semibold mt-24 dark:text-gray-100">
    17.3 Damping and Resonance
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Damping is the process of reducing the amplitude of an oscillation due to the presence of a resistive force. In an oscillating system, damping can be caused by friction, air resistance, or any other force that opposes the motion.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The terms light, critical, and heavy damping refer to the amount of damping in an oscillating system. Light damping occurs when the resistive force is small, critical damping occurs when the resistive force is just enough to prevent oscillations from continuing indefinitely, and heavy damping occurs when the resistive force is large enough to cause the system to return to its equilibrium position without oscillating.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Displacement-time graphs can be used to illustrate the different types of damping. Lightly damped systems will have a gradual decrease in amplitude over time, critical damping will result in the oscillations returning to equilibrium without any overshoot, and heavily damped systems will have a rapid decrease in amplitude and return to equilibrium without oscillating.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Resonance occurs when an oscillating system is forced to oscillate at its natural frequency, resulting in a maximum amplitude of oscillations. This phenomenon can occur in a variety of systems, such as mechanical systems, electrical circuits, and acoustic systems.
    </li>
</ul>
      </div>
      </div>
      </div>
    </>
  )


};