import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import SideBar from "../../../components/sidebar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-36">
        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold dark:text-gray-100">12: Motion in a Circle | A-level Physics</h1>
      </div>
      <div className="flex justify-center mt-20 mb-24 ">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 bg-slate-700 rounded-2xl p-5 md:p-10 shadow-gray-800 shadow shadow-2xl">
      <div class="mt-4">
            <h2 className="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
            12.1 Kinematics of Uniform Circular Motion
            </h2>
            <ul className="mt-8 list-disc list-inside space-y-6">
            <li className="text-lg sm:text-xl dark:text-gray-100">
                Radian is a unit of measurement for the angle, defined as the angle
                subtended at the center of a circle by an arc equal in length to the
                radius of the circle. Angular displacement is the angle moved by an
                object in circular motion, expressed in radians.
            </li>
            <li className="text-lg sm:text-xl dark:text-gray-100">
                Angular speed is the rate of change of angular displacement. It is
                defined as the angle moved per unit time, usually measured in radians
                per second (rad/s).
            </li>
            <li className="text-lg sm:text-xl dark:text-gray-100">
                The relationship between angular speed and the period of the motion is
                given by ω = 2π/T, where T is the period of the motion.
            </li>
            <li className="text-lg sm:text-xl dark:text-gray-100">
                The linear speed of an object in circular motion is given by v = rω,
                where v is the linear speed, r is the radius of the circle, and ω is the
                angular speed.
            </li>
            </ul>
        </div>
        <div className="mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
            12.2 Centripetal Acceleration
            </h2>
            <ul className="mt-8 list-disc list-inside space-y-6">
            <li className="text-lg sm:text-xl dark:text-gray-100">
                Centripetal acceleration is the acceleration of an object moving in a
                circle due to a force acting towards the center of the circle. It is
                always perpendicular to the direction of motion of the object.
            </li>
            <li className="text-lg sm:text-xl dark:text-gray-100">
                Centripetal acceleration causes circular motion with a constant angular
                speed.
            </li>
            <li className="text-lg sm:text-xl dark:text-gray-100">
                The magnitude of the centripetal acceleration is given by a = rω^2,
                where a is the centripetal acceleration, r is the radius of the circle,
                and ω is the angular speed.
            </li>
            <li className="text-lg sm:text-xl dark:text-gray-100">
                The magnitude of the centripetal acceleration can also be expressed in
                terms of linear speed as a = v^2/r, where v is the linear speed.
            </li>
            <li className="text-lg sm:text-xl dark:text-gray-100">
                The centripetal force required to maintain an object in circular motion
                is given by F = ma = mrω^2 or F = mv^2/r, where F is the centripetal
                force, m is the mass of the object, r is the radius of the circle, ω is
                the angular speed, and v is the linear speed.
            </li>
            </ul>
        </div>
        </div>
      </div>
    </>
  )


};