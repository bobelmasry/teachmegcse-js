import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">23: Nuclear Physics | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div class="mt-4">
      <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    23.1 Mass defect and nuclear binding energy:
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
  <li class="text-lg sm:text-xl dark:text-gray-100">
    The equivalence between energy and mass is represented by the equation E = mc².
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    Nuclear equations represent nuclear reactions such as 7N + 4He → 8O + 1H.
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    Mass defect is the difference between the sum of the individual masses of nucleons and the actual mass of a nucleus.
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    Binding energy is the energy released when nucleons come together to form a nucleus.
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    Binding energy per nucleon varies with nucleon number and has a maximum value for nuclei with an atomic mass number of around 56.
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    Nuclear fusion is the joining of two lighter nuclei to form a heavier nucleus, while nuclear fission is the splitting of a heavier nucleus into two lighter nuclei.
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    The energy released in nuclear reactions can be calculated using E = ∆mc².
  </li>
</ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    23.2 Radioactive decay:
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
  <li class="text-lg sm:text-xl dark:text-gray-100">
    The random nature of radioactive decay is evidenced by fluctuations in count rate.
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    Radioactive decay is both spontaneous and random.
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    Activity is defined as the number of radioactive decays per unit time, and the decay constant is the probability of decay per unit time. A = λN is the relationship between activity and the number of radioactive nuclei N.
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    Half-life is the time taken for half the original number of radioactive nuclei to decay.
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    The relationship between decay constant and half-life is λ = 0.693/t(1/2) where t(1/2) is half of the time.
  </li>
  <li class="text-lg sm:text-xl dark:text-gray-100">
    Radioactive decay is an exponential process, and the relationship between activity or number of undecayed nuclei and time is x = x0e^(-λt).
  </li>
</ul>

      </div>
      </div>
      </div>
    </>
  )


};