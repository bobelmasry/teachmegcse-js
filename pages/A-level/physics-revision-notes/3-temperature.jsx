import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">14: Temperature | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div class="mt-20">
  <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    14.1 Thermal Equilibrium
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Thermal energy is transferred from a region of higher temperature to a region of lower temperature until both regions reach thermal equilibrium.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Regions of equal temperature are in thermal equilibrium, meaning that there is no net heat transfer between them.
    </li>
  </ul>
</div>
<div class="mt-20">
  <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    14.2 Temperature Scales
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      A physical property that varies with temperature can be used for the measurement of temperature. Examples of such properties include the density of a liquid, volume of a gas at constant pressure, resistance of a metal, and e.m.f. of a thermocouple.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The scale of thermodynamic temperature (kelvin) does not depend on the property of any particular substance and is based on the behavior of ideal gases.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Temperatures can be converted between kelvin and degrees Celsius using the formula T/K = θ/°C + 273.15.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The lowest possible temperature is zero kelvin on the thermodynamic temperature scale, also known as absolute zero. At this temperature, the particles of matter have zero kinetic energy and cannot transfer any heat.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-20 font-semibold dark:text-gray-100">
    14.3 Specific Heat Capacity and Specific Latent Heat
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Specific heat capacity is the amount of heat energy required to raise the temperature of 1 kilogram of a substance by 1 Kelvin. The formula for specific heat capacity is Q = mcΔT, where Q is the heat energy transferred, m is the mass of the substance, c is its specific heat capacity, and ΔT is the change in temperature.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Specific latent heat is the amount of heat energy required to change the state of 1 kilogram of a substance without changing its temperature. Specific latent heat of fusion is the amount of heat energy required to change 1 kilogram of a solid into a liquid at its melting point, and specific latent heat of vaporization is the amount of heat energy required to change 1 kilogram of a liquid into a gas at its boiling point.
    </li>
  </ul>
</div>
      </div>
      </div>
    </>
  )


};