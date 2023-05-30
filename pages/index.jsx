import "flowbite";
import Dashboard from '../components/dashboard.jsx'
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
import { useSession } from '@supabase/auth-helpers-react'


export default function Home () {
  
  const session = useSession()
  
  return (
    <>
    <Head>
    <title>teachmegcse | A-level and IGCSE Content</title>
    <meta name="description" content="CAIE Past Papers for Cambridge Int'l AS and A Level"></meta>
    <meta name="keywords" content="teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
    <Headstuff />
    <meta name="google-site-verification" content="ZPZaedV92LzUagW1ABnkJ35wh4Unm4fgVMAkkOQ2IRw" />
    </Head>
    <Navbar session={session} />
      <div>
      {!session ? (
        <>
        <Banner />
        <Special_home />
        <SplitSection header={"Solve Topic Questions"} description={"Our topic questions are amazing, with dozens of questions per chapter and maybe even a detailed explananation that will help you understand the answer clearly."} imageSrc={"/topic.jpg"} />
        <SplitSection header={"Understand your Mistakes"} description={"Understand your mistakes and revise using our top of the line revision notes, they're summarised clearly to help you understand and remember only the things you need."} imageSrc={"/notes.jpg"} />
        <SplitSection header={"Track your Progress"} description={"Track your progress and know which chapters you still need to revise, we track every question you solve so you'll always know how much time you should spend revising "} imageSrc={"/stats.jpg"} />
        <Pricing />
        <Cta />
        <Footer />
        </>
      ) : (
        <>
        <div className="flex justify-center mt-28 mb-8">
          <div className="min-w-5/6 sm:max-w-5/6">
            <Dashboard session={session} />
          </div>
        </div>
        </>
      )}
    </div>
    </>
  )
}