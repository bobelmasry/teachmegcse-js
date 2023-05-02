import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">15: Ideal Gas | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div class="mt-20">
  <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    15.1 The Mole
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Amount of substance is an SI base quantity with the base unit mol. It is used to express the number of particles (atoms, molecules, or ions) in a substance.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Molar quantities are used where one mole of any substance is the amount containing a number of particles of that substance equal to the Avogadro constant, NA, which is approximately equal to 6.022 x 10^23 particles/mol.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Molar mass is the mass of one mole of a substance and is given in grams per mole (g/mol).
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The number of moles of a substance is equal to its mass divided by its molar mass.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The ideal gas law relates the pressure, volume, temperature, and number of moles of a gas. It is given by the formula PV = nRT, where P is the pressure, V is the volume, n is the number of moles, R is the gas constant, and T is the absolute temperature.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The gas constant R has a value of 8.31 J/mol K and relates the pressure, volume, temperature, and number of particles in a gas.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    15.2 Equation of State
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        A gas that obeys the relationship pV ∝ T, where T is the thermodynamic temperature, is known as an ideal gas.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The equation of state for an ideal gas is expressed as <span class="italic">pV = nRT</span>, where p is the pressure, V is the volume, n is the number of moles, R is the gas constant, and T is the absolute temperature.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The equation of state can also be expressed as <span class="italic">pV = NkT</span>, where N is the number of molecules and k is the Boltzmann constant, given by k = R/NA.
    </li>
</ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    15.3 Kinetic Theory of Gases
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The kinetic theory of gases assumes that gases are made up of a large number of small particles molecules or atoms that are in constant random motion.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Molecular movement causes the pressure exerted by a gas. The relationship between pressure, volume, and temperature is derived from the kinetic theory of gases as <span class="italic">pV = 1/3Nmc^2</span>, where N is the number of molecules, m is the mass of each molecule, and &lt;c^2&gt; is the mean-square speed of the molecules.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The root-mean-square speed r.m.s. of a molecule is given by pV = 1/3Nmc^2. It is the square root of the average of the squares of the velocities of all the molecules in a gas.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Comparing the equations <span class="italic">pV = 1/3Nm{"<c^2>"}</span> and <span class="italic">pV = NkT</span>, we can deduce that the average translational kinetic energy of a molecule is <span class="italic">3/2 kT</span>, where k is the Boltzmann constant and T is the absolute temperature.
    </li>
</ul>
</div>
      </div>
      </div>
    </>
  )


};