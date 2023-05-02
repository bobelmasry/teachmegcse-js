import "flowbite";
import Banner from "components/banner.jsx"
import Cta from "components/cta.jsx"
import Special_home from "components/special-home.jsx"
import SplitSection from "components/split-section.jsx"
import Pricing from "components/pricing.jsx"
import Reviews from "components/reviews.jsx"
import Footer from "components/footer.jsx"
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"

export default function Home() {
  return (
  <div>
  <Head>
    <title>teachmegcse | A-level and IGCSE Content</title>
    <meta name="description" content="CAIE Past Papers for Cambridge Int'l AS and A Level"></meta>
    <meta name="keywords" content="teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
    <Headstuff />
  </Head>
  <Navbar />
  <Banner />
  <Special_home />
  <SplitSection header={"Topic Questions"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolores laborum labore provident impedit esse recusandae facere libero harum sequi."} imageSrc={"/photo.avif"} />
  <SplitSection header={"Revision Notes"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolores laborum labore provident impedit esse recusandae facere libero harum sequi."} imageSrc={"/photo.avif"} />
  <Pricing />
  <div className="flex font-semibold justify-center mt-48">
    <h3 className="text-2xl sm:text-5xl text-gray-100">{"Don't"} just take our word for it .. </h3>
  </div>
  <Reviews />
  <Cta />
  <Footer />
  </div>
  )
}