import "flowbite";
import Head from 'next/head';
import Navbar from "components/navbar.jsx"
import Headstuff from "components/headstuff.jsx"
import Account from '../components/homepage/Account.jsx'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const user = useUser()

  return (
    <>
    <Head>
    <title>Login or Signup | teachmegcse</title>
    <meta name="description" content="Login or Signup to Teachmegcse"></meta>
    <meta name="keywords" content="teachmegcse, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
    A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
    <Headstuff />
  </Head>
  <Navbar session={session} />
    <div className="flex justify-center">
      <div className="w-3/4 sm:w-2/4 md:w-1/4 mt-36">
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa,
          style: {
            message: { color: 'white' },
          },
        }}
        providers={{}} theme="dark" />
      ) : (
        <>
        <Account session={session} />
        </>
      )}
    </div>
    </div>
    </>
  )
}

export default Home