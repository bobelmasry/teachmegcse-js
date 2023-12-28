import getPosts from "helpers/getPosts";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import { useSession, useUser } from '@supabase/auth-helpers-react'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from 'utils/supabase';

function TopicCard2({ linkSrc, header, hasSignIn, hasGrey, hasGreen }) {
  return (
    <div>
      <Link href={`${linkSrc}`}>
        <div className="btn flex gap-8 shadow-[0_7px_0_0px_rgb(3,105,161)] md:hover:scale-[1.02] ease-out transition-all rounded block p-6 bg-gray-50 border border-gray-200 rounded-lg shadow md:hover:bg-gray-100 dark:bg-slate-600 dark:border-gray-600 md:dark:hover:bg-gray-500">
          <h5 className="text-3xl font-semibold text-gray-900 dark:text-white">{header}</h5>
          {(hasSignIn) && 
            <h5 className="text-xl mt-2 font-bold text-gray-900 dark:text-white">Sign In to track your progress</h5>
          }
          <div style={{ position: 'relative', width: '56px', height: '42px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {(hasGrey) && 
              <Image
                fill 
                src="/checkmark.png"
                alt="Current Image" 
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            }
            {(hasGreen) && 
              <Image
                fill 
                src="/correct.png"
                alt="Current Image" 
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            }
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home({ posts }) {
  const session = useSession()

  const user = useUser()

  const [notesRead, setNotesRead] = useState([])
  const [initialGotten, setinitialGotten] = useState(false)

  useEffect(() => {
    async function getInitial() {
      if (!initialGotten) {
      if (user && user.id) {
        // Check if user and user.id are defined
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setNotesRead(data.notesRead);
          setinitialGotten(true);
        }
        }
      }
    }
    getInitial()
  }, [user, initialGotten, posts]);

  const title = `A-level ${posts[0]?.data.subject} Revision Notes`
  return (
    <>
    <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions`}></meta>
          <Headstuff />
        </Head>
        <Navbar session={session} />
    <div className="flex justify-center mt-28">
        <h1 className="text-4xl sm:text-5xl font-bold dark:text-gray-100">A-level {posts[0]?.data.subject} Revision Notes</h1>
      </div>
      <div className="flex justify-center items-center">
      <div className="grid grid-rows-4 gap-11 mt-16 mb-24 w-10/12 md:w-5/12 lg:w-3/12">
      {posts.map((post) => {
        if (notesRead) {
          const array = notesRead?.filter(note => ((note.title.toString() === post.data.title.toString())));
        if ((session) && (array.length != 0)) {
          return(
            <TopicCard2 key={post?.slug} hasGreen={true} header={post?.data.title} linkSrc={`/A-level/${posts[0]?.data.subject}/revision-notes/${post?.slug}`} />
      )
        }}
       if ((session)){
          return(
          <TopicCard2 key={post?.slug} hasGrey={true} header={post?.data.title} linkSrc={`/A-level/${posts[0]?.data.subject}/revision-notes/${post?.slug}`} />
          )
        }
        else if (!session) {
          return(
            <TopicCard2 key={post?.slug} hasSignIn={true} header={post?.data.title} linkSrc={`/A-level/${posts[0]?.data.subject}/revision-notes/${post?.slug}`} />
      )
        }
        })}
      </div>
    </div>
    </>
  );
}
const data = [
  {
    "slug": "math"  },
  {
    "slug": "accounting"  },
  {
    "slug": "arabic"  },
  {
    "slug": "business"  },
  {
    "slug": "chemistry"  },
  {
    "slug": "computer-science"  },
  {
    "slug": "economics"  },
  {
    "slug": "english-language"  },
  {
    "slug": "geography"  },
  {
    "slug": "history"  },
  {
    "slug": "physics"  },
  {
    "slug": "biology"  }
]

export const getStaticProps = ({ params }) => {
  const posts = getPosts({ subject: params.subjectName });

  return {
    props: {
      posts,
    },
  };
};

export async function getStaticPaths() {

  const paths = data.map(subject => ({
    params: { subjectName: subject.slug.toString() }
  }));
  return { paths, fallback: false };
}