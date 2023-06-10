import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">22: Quantum Physics | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div class="mt-4">
      <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    22.1 Energy and momentum of a photon
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Electromagnetic radiation has both wave-like and particle-like properties.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        A photon is a quantum of electromagnetic energy that behaves as a particle.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The energy of a photon is given by E = hf, where h is {"Planck's"} constant and f is the frequency of the radiation.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The electronvolt (eV) is a common unit of energy for particles, with 1 eV equivalent to 1.6 x 10^-19 J.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        A photon has momentum, which is given by p = E/c, where c is the speed of light in a vacuum.
    </li>
</ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    22.2 Photoelectric effect
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Photoelectrons can be emitted from a metal surface when it is illuminated by electromagnetic radiation.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The minimum frequency or wavelength of radiation required to emit photoelectrons from a metal surface is called the threshold frequency or threshold wavelength, respectively.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The energy required to remove an electron from a metal surface is called the work function, denoted by Φ.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The maximum kinetic energy of photoelectrons emitted from a metal surface is given by the equation hf = Φ + 1/2mv^2, where m is the mass of the electron and v is its velocity.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The maximum kinetic energy of photoelectrons is independent of the intensity of the incident radiation, but the number of photoelectrons emitted (i.e. the photoelectric current) is proportional to the intensity.
    </li>
</ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    22.3 Wave-particle duality
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The photoelectric effect suggests that electromagnetic radiation behaves as particles, while phenomena such as interference and diffraction suggest that it behaves as waves.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Electron diffraction experiments demonstrate the wave-like nature of particles, where electrons exhibit diffraction patterns when passed through a diffraction grating.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The de Broglie wavelength is the wavelength associated with a moving particle, given by λ = h/p, where p is the momentum of the particle.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The wave-particle duality suggests that particles, including photons and electrons, exhibit both wave-like and particle-like behavior.
    </li>
  </ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    22.4 Energy levels in atoms and line spectra
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Electrons in atoms occupy discrete energy levels, and transitions between energy levels result in the absorption or emission of radiation.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The appearance and formation of emission and absorption line spectra can be explained by transitions between energy levels in atoms.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The energy of a photon emitted or absorbed during a transition between energy levels is given by hf = E1 - E2, where E1 and E2 are the initial and final energy levels of the electron.
    </li>
  </ul>

      </div>
      </div>
      </div>
    </>
  )


};