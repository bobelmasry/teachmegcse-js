import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">25: Astronomy & Cosmology | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div class="mt-4">
      <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    25.1 Standard candles:
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Luminosity is the total power of radiation emitted by a star.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The inverse square law for radiant flux intensity F in terms of the luminosity L of the source is F = L /(4πd²).
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      An object of known luminosity is called a standard candle.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Standard candles are used to determine distances to galaxies.
    </li>
  </ul>
</div>
<div>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    25.2 Stellar radii:
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Wien’s displacement law λmax ∝ 1 / T is used to estimate the peak surface temperature of a star.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The Stefan–Boltzmann law L = 4πσr²T⁴ is used to estimate the radius of a star.
    </li>
  </ul>
</div>
<div>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    25.3 Hubble’s law and the Big Bang theory:
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The lines in the emission spectra from distant objects show an increase in wavelength from their known values.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The redshift of electromagnetic radiation from a source moving relative to an observer is given by ∆λ / λ . ∆f/f . v / c.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Redshift leads to the idea that the Universe is expanding.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Hubble’s law v = H0d is used to explain how the Universe is expanding and to support the Big Bang theory.
    </li>
  </ul>

      </div>
      </div>
      </div>
    </>
  )


};