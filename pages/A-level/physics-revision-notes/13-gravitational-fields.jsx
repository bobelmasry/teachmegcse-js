import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">13: Gravitational Fields | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div class="mt-4">
  <h2 class="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
    13.1 Gravitational Field
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      A gravitational field is a field of force that exists around any object that has mass. It is defined as the force per unit mass that a test mass would experience in the presence of the object.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Gravitational fields can be represented by field lines that show the direction and strength of the force at different points in space.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    13.2 Gravitational Force between Point Masses
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      For a point outside a uniform sphere, the mass of the sphere can be considered to be a point mass at its center.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      {"Newton's"} law of gravitation states that the force of attraction between two point masses is directly proportional to the product of their masses and inversely proportional to the square of the distance between them. The formula for the gravitational force between two point masses is F = Gm1m2/r^2, where F is the gravitational force, m1 and m2 are the masses of the two objects, r is the distance between them, and G is the gravitational constant.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Circular orbits in gravitational fields can be analyzed by relating the gravitational force to the centripetal acceleration it causes. For a circular orbit, the gravitational force is equal to the centripetal force, given by F = ma = mv^2/r, where m is the mass of the orbiting object, v is its linear velocity, and r is the radius of the orbit.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      A satellite in a geostationary orbit remains at the same point above the {"Earth's"} surface, with an orbital period of 24 hours, orbiting from west to east, directly above the Equator.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl font-semibold mt-24 dark:text-gray-100">
    13.3 Gravitational Field of a Point Mass
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      From {"Newton's"} law of gravitation and the definition of gravitational field, the equation g = GM/r^2 can be derived for the gravitational field strength due to a point mass, where g is the gravitational field strength, M is the mass of the object producing the field, and r is the distance from the center of the object.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The equation g = GM/r^2 can be used to calculate the gravitational field strength at any point in space due to a point mass.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The gravitational field strength near the {"Earth's"} surface is approximately constant for small changes in height because the distance from the center of the Earth to the object is much greater than the height above the {"Earth's"} surface. Therefore, the gravitational field strength can be considered to be constant near the {"Earth's"} surface.
    </li>
  </ul>
  <h2 class="text-2xl sm:text-3xl mt-24 font-semibold dark:text-gray-100">
    13.4 Gravitational Potential
  </h2>
  <ul class="mt-8 list-disc list-inside space-y-6">
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Gravitational potential at a point is defined as the work done per unit mass in bringing a small test mass from infinity to that point. It is a scalar quantity and is measured in joules per kilogram J/kg.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The gravitational potential in the field due to a point mass is given by the formula ϕ = -GM/r, where ϕ is the gravitational potential, M is the mass of the object producing the field, r is the distance from the center of the object, and G is the gravitational constant.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Gravitational potential energy of two point masses is given by the formula EP = -GMm/r, where EP is the gravitational potential energy, M and m are the masses of the two objects, and r is the distance between them.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      Gravitational potential and gravitational potential energy are related through the equation EP = mϕ, where EP is the gravitational potential energy, m is the mass of the test mass, and ϕ is the gravitational potential.
    </li>
    <li class="text-lg sm:text-xl dark:text-gray-100">
      The gravitational potential energy of an object at a particular point in a gravitational field is equal to the work done in bringing the object from infinity to that point. If the object is released from that point, it will gain kinetic energy equal to the initial gravitational potential energy.
    </li>
  </ul>
      </div>
      </div>
      </div>
    </>
  )


};