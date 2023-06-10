import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">24: Medical Physics | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div class="mt-4">
      <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    24.1 Production and use of ultrasound
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        A piezo-electric crystal generates an e.m.f. when its shape changes and changes shape when a p.d. is applied across it.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Ultrasound waves are generated and detected by a piezoelectric transducer.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Reflection of ultrasound at boundaries between tissues can be used to obtain diagnostic information about internal structures.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The specific acoustic impedance of a medium is Z = ρc, where c is the speed of sound in the medium.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        IR / I0 = (Z1 – Z2)2 /(Z1 + Z2)2 is used for the intensity reflection coefficient of a boundary between two media.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Ultrasound is attenuated as it passes through matter and I = I0e–μx is used to describe this attenuation.
    </li>
</ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    24.2 Production and use of X-rays
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        X-rays are produced by electron bombardment of a metal target, and the minimum wavelength of X-rays produced from the accelerating p.d. can be calculated.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        X-rays are used in imaging internal body structures, including X-ray imaging, and contrast can be used to improve image quality.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        I = I0e–μx is used to describe the attenuation of X-rays in matter.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        CT scanning produces a 3D image of an internal structure by combining multiple X-ray images taken in the same section from different angles to obtain a 2D image of the section, then repeating this process along an axis and combining 2D images of multiple sections.
    </li>
</ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    24.3 PET scanning
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      A tracer is a substance containing radioactive nuclei that can be introduced into the body and is then absorbed by the tissue being studied.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      A tracer that decays by β+ decay is used in positron emission tomography (PET scanning).
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Annihilation occurs when a particle interacts with its antiparticle, and mass-energy and momentum are conserved in the process.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      In PET scanning, positrons emitted by the decay of the tracer annihilate when they interact with electrons in the tissue, producing a pair of gamma-ray photons travelling in opposite directions.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The energy of the gamma-ray photons emitted during the annihilation of an electron-positron pair can be calculated.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The gamma-ray photons from an annihilation event travel outside the body and can be detected, and an image of the tracer concentration in the tissue can be created by processing the arrival times of the gamma-ray photons.
    </li>
  </ul>

      </div>
      </div>
      </div>
    </>
  )


};