import { MDXRemote } from "next-mdx-remote";
import getPost from "helpers/getPost";
import getPosts from "helpers/getPosts";
import { serialize } from "next-mdx-remote/serialize";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import { useSession, useUser } from '@supabase/auth-helpers-react'
import { supabase } from 'utils/supabase';
import { useState, useEffect } from "react";
import { updateSupabase } from 'utils/updateSupabase'
import Link from "next/link";

function Post({ noteData,  content }) {
  const session = useSession()
  const user = useUser()

  const [notesRead, setNotesRead] = useState([])
  const [initialGotten, setinitialGotten] = useState(false)
  const [updated, setUpdated] = useState(false)

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
  
        if (data.notesRead) {
          const array = data.notesRead.filter(note => ((note.title.toString() === noteData.title.toString())));
          setNotesRead(array);
          if (array.length != 0) {
            setUpdated(true)
          }
          else {
            setUpdated(false)
          }
          setinitialGotten(true);
        }
        }
      }
    }
    getInitial()
  }, [user, initialGotten, noteData.title]);
  const title = `${noteData.title} | A-level ${noteData.subject} notes`

  return (
    <>
    <Head>
          <title>{title}</title>
          <meta name="description" content={`Find the Answer and maybe an Explanation`}></meta>
          <meta name="keywords" content={`exceed, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions`}></meta>
          <Headstuff />
    </Head>
      <Navbar session={session} />
    <div className="flex justify-center">
        <h1 className="text-4xl sm:text-5xl mt-20 font-bold dark:text-gray-100">{noteData.title}</h1>
    </div>
    <div className="flex justify-center">
      <div className="prose p-6 text-gray-300 sm:p-12 m-6 sm:m-12 prose-lg bg-white border border-gray-200 rounded-2xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <style>{`
          .prose h2 {
            color: #0286c2; /* Bright blue */
          }
          .prose h3 {
            color: #47c4fd; /* Bright green */
        }
        `}</style>
        <MDXRemote {...content} />
      </div>
    </div>
    <div className="flex flex-flow justify-center mt-20 mb-20">
      {(!updated && session) &&
            <button
                    id='Next'
                    onClick={() => {
                      updateSupabase(noteData, 'profiles', 'notesRead', user, 'title', noteData.title, false);
                      setUpdated(true);
                    }}
                    className="inline-block rounded border border-blue-500 bg-blue-600 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-blue-500"
                    >
                    Mark as Complete
            </button>
      }
      {(!updated && !session) &&
      <>
            <button
                    id='Next'
                    className="inline-block rounded border border-blue-500 bg-blue-600 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-blue-500"
                    >
                    <Link href={'/login-or-signup'}> Sign in to track your progress </Link>
            </button>
            </>
      }
      {updated && 
        <button
        id='Next'
        className="inline-block rounded border border-green-500 bg-green-600 px-12 py-3 text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-green-500 focus:outline-none focus:ring active:text-green-500"
        >
        Completed !
</button>
      }
    </div>
    </>
  );
}

export async function getStaticPaths() {
  const data = [
    { slug: "math" },
    { slug: "accounting" },
    { slug: "arabic" },
    { slug: "business" },
    { slug: "chemistry" },
    { slug: "computer-science" },
    { slug: "economics" },
    { slug: "english-language" },
    { slug: "geography" },
    { slug: "history" },
    { slug: "physics" },
    { slug: "biology" },
  ];

  const paths = data.flatMap((subject) =>
    getPosts({ subject: subject.slug }).map((post) => ({
      params: { subjectName: subject.slug, slug: post.slug },
    }))
  );

  return {
    paths,
    fallback: false,
  };
}


export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  const mdxSource = await serialize(post.content);
  return {
    props: {
      noteData: post.data,
      content: mdxSource,
    },
  };
};

export default Post;