import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import "flowbite"

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getUserStats(),
    getProfile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mt-8">
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input id="email" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={session.user.email} disabled />
      </div>
      <div className='mt-2'>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <input
          id="username"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    <div className="flex gap-4 mt-4">
      <div>
        <button
          class="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-500 transition-all ease-out dark:focus:ring-blue-800"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-500 transition-all ease-out dark:focus:ring-red-800" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
      </div>
    </div>
  )
}