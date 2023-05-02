import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">18: Electric Fields | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div className="mt-20">
      <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    18.1 Electric Fields and Field Lines
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        An electric field is a field of force that surrounds any charged object or group of charged objects. It is defined as force per unit positive charge.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        The force on a charge in an electric field is given by F = qE, where F is the force, q is the charge, and E is the electric field strength.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        Electric fields can be represented by field lines. Field lines point in the direction of the electric field and the density of the lines represents the strength of the field.
    </li>
</ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    18.2 Uniform Electric Fields
</h2>
<ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
        A uniform electric field is a constant electric field between two parallel plates. The field strength of a uniform electric field is given by E = ΔV/Δd, where E is the electric field strength, ΔV is the potential difference between the plates, and Δd is the distance between the plates.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
        A uniform electric field can affect the motion of charged particles. Charged particles in a uniform electric field will experience a force and move in the direction of the electric field if the particle is positively charged, or in the opposite direction if the particle is negatively charged.
    </li>
</ul>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    18.3 Electric Force Between Point Charges
</h2>
<p class="mt-8 text-lg sm:text-xl dark:text-gray-100">
    For a point outside a spherical conductor, the charge on the sphere can be considered to be a point charge at its center.
</p>
<p class="mt-8 text-lg sm:text-xl dark:text-gray-100">
    {"Coulomb's"} law states that the force (F) between two point charges (Q1 and Q2) in free space is given by F = kQ1Q2/r<sup>2</sup>, where k is {"Coulomb's"} constant, and r is the distance between the charges.
</p>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    18.4 Electric Field of a Point Charge
</h2>
<p class="mt-8 text-lg sm:text-xl dark:text-gray-100">
    The electric field strength (E) due to a point charge in free space is given by E = kQ/r<sup>2</sup>, where Q is the charge of the point charge, and r is the distance from the point charge.
</p>
<h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    18.5 Electric Potential
</h2>
<p class="mt-8 text-lg sm:text-xl dark:text-gray-100">
    Electric potential (V) at a point is the work done per unit positive charge in bringing a small test charge from infinity to the point.
</p>
<p class="mt-8 text-lg sm:text-xl dark:text-gray-100">
    The electric field at a point is equal to the negative of the potential gradient at that point.
</p>
<p class="mt-8 text-lg sm:text-xl dark:text-gray-100">
    The electric potential (V) in the field due to a point charge is given by V = kQ/r, where Q is the charge of the point charge, and r is the distance from the point charge.
</p>
<p class="mt-8 text-lg sm:text-xl dark:text-gray-100">
    The electric potential energy (U) of two point charges is given by U = kQ1Q2/r, where Q1 and Q2 are the charges of the two point charges, and r is the distance between them.
</p>
      </div>
      </div>
      </div>
    </>
  )


};