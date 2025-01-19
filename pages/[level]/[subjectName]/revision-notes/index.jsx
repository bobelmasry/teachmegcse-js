import getPosts from "../../../../components/helpers/getPosts.js";
import Head from 'next/head';
import Navbar from "../../../../components/navbar.jsx"
import Headstuff from "../../../../components/headstuff.jsx"
import { useSession, useUser } from '@supabase/auth-helpers-react'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from '../../../../components/utils/supabase';
import data from "../../../../public/subjects.json"

function NoteCard({ linkSrc, header, hasGrey, hasGreen }) {
  return (
    <div>
      <Link href={linkSrc}>
        <div className="btn flex justify-between items-center gap-8 shadow-[0_7px_0_0px_rgb(3,105,161)] md:hover:scale-[1.05] transition-transform ease-out rounded-lg p-6 bg-gray-50 border border-gray-200 shadow md:hover:bg-gray-100 dark:bg-slate-600 dark:border-gray-600 md:dark:hover:bg-gray-500">
          <h5 className="text-3xl font-semibold text-gray-900 dark:text-white">{header}</h5>
          <div className="relative w-14 h-10 flex justify-center items-center">
            {hasGrey && (
              <Image
                fill
                src="/checkmark.png"
                alt="Grey Checkmark"
                className="object-contain"
              />
            )}
            {hasGreen && (
              <Image
                fill
                src="/correct.png"
                alt="Green Checkmark"
                className="object-contain"
              />
            )}
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

  const extractNumber = (title) => {
    const match = title.match(/^(\d+)/);
    return match ? parseInt(match[0], 10) : Infinity; // If no number, place it at the end
  };

  // Sort the posts based on the extracted number
  const sortedPosts = [...posts].sort((a, b) => {
    return extractNumber(a.data.title) - extractNumber(b.data.title);
  });

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
    <div className="flex justify-center items-center mt-28 ">
        <h1 className="text-center text-3xl sm:text-5xl font-bold dark:text-gray-100 w-10/12 sm:w-full">A-level {posts[0]?.data.subject} Revision Notes</h1>
      </div>
      <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 gap-12 mt-16 mb-24 w-10/12 md:w-5/12 lg:w-3/12">
      {sortedPosts.map((post) => {
            const array = notesRead?.filter(note => note.title.toString() === post.data.title.toString());
            const isRead = array && array.length !== 0;

          if (session) {
            if (isRead) {
              return (
                <NoteCard 
                  key={post.slug} 
                  hasGreen={true} 
                  header={post.data.title} 
                  linkSrc={`/A-level/${post.data.subject}/revision-notes/${post.slug}`} 
                />
              );
            } else {
              return (
                <NoteCard 
                  key={post.slug} 
                  hasGrey={true} 
                  header={post.data.title} 
                  linkSrc={`/A-level/${post.data.subject}/revision-notes/${post.slug}`} 
                />
              );
            }
          } else {
            return (
              <NoteCard 
                key={post.slug} 
                hasGrey={true} 
                header={post.data.title} 
                linkSrc={`/A-level/${post.data.subject}/revision-notes/${post.slug}`} 
              />
            );
          }
          })}
      </div>
    </div>
    </>
  );
}

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
    params: { subjectName: subject.slug.toString(), level: subject.level.toString() },
  }));
  return { paths, fallback: false };
}