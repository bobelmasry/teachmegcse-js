import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import YearCard from "components/yearCard.jsx"
import Headstuff from "components/headstuff.jsx"

const data = [
  {
    "slug": "math",
    "name" : "Maths (9709)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]} ,
  },
  {
    "slug": "accounting",
    "name" : "Accounting (9706)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]} ,
  },
  {
    "slug": "arabic",
    "name" : "Arabic (9680)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]} ,
  },
  {
    "slug": "business",
    "name" : "Business (9609)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]} ,
  },
  {
    "slug": "chemistry",
    "name" : "Chemistry (9701)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]} ,
  },
  {
    "slug": "computer-science",
    "name" : "Computer Science (9618)",
    "years": {"actualYears" : [2022, 2021]} ,
  },
  {
    "slug": "economics",
    "name" : "Economics (9708)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]} ,
  },
  {
    "slug": "english-language",
    "name" : "English Language (9093)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]} ,
  },
  {
    "slug": "geography",
    "name" : "Geography (9696)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]} ,
  },
  {
    "slug": "history",
    "name" : "History (9489)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]} ,
  },
  {
    "slug": "physics",
    "name" : "Physics (9702)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]} ,
  },
  {
    "slug": "biology",
    "name" : "Biology (9700)",
    "years": {"actualYears" : [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]}
  }
]
const yearsArray = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]


  export async function getStaticPaths() {

    const paths = data.map(subject => ({
      params: { subjectName: subject.slug.toString() }
    }));
    return { paths, fallback: false };
  }

  export async function getStaticProps({ params }) {
    const subjectData = data.find(subject => subject.slug.toString() === params.subjectName);
    return {
      props: {
        subjectData
      }
    };
  }


  export default function SubjectPage({ subjectData }) {
    return (
      <>
        <Head>
          <title>{`Past Papers | A Levels | ${subjectData.name}`}</title>
          <meta name="description" content={`CAIE Past Papers for A-level ${subjectData.name}`}></meta>
          <Headstuff />
        </Head>
        <Navbar />
        <div className="flex justify-center items-center mt-32 ">
          <h1 className="text-3xl sm:text-5xl font-bold dark:text-gray-100">A-level {subjectData.name} Past Papers</h1>
        </div>
        <div className="flex justify-around items-center ">
            <div className="grid grid-flow-row gap-12 mt-36 mb-40 grid-cols-1 sm:grid-cols-2">
            {subjectData.years.actualYears.map(function(object, i){
              return <YearCard header={yearsArray[i]} key={i} linkSrc={`${subjectData.slug}/${yearsArray[i]}`} />;
          })}
            </div>
        </div>
      </>
    );
  }
  
  
  