import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import "flowbite"

export default function Dashboard({ session }) {
    const supabase = useSupabaseClient()
    const user = useUser()

    const [username, setUsername] = useState(null)
    const [loading, setLoading] = useState(true)
    const [questionsSolved, setQuestionsSolved] = useState(null)
    const [questionsCorrect, setQuestionsCorrect] = useState(null)

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
            .select(`username`)
            .eq('id', user.id)
            .single()
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            setUsername(data.username)
          }
        } catch (error) {
          alert('Error loading user data!')
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      async function getUserStats() {
        try {
          setLoading(true)
    
          let { data, error, status } = await supabase
            .from('profile')
            .select(`questions_solved, questions_correct, notes_read`)
            .eq('user_id', user.id)
            .single()
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            setQuestionsSolved(data.questions_solved)
            setQuestionsCorrect(data.questions_correct)
          }
        } catch (error) {
          alert('Error loading user data!')
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
  
      
  return (
    <div className="w-full flex gap-8 sm:w-3/6 md:w-full lg:w-96">
      {username != null && 
      <div className="flex justify-start mb-6">
        <h2 className='text-5xl dark:text-gray-100'>Hi <span className='text-blue-500 font-semibold capitalize'>{username}</span>,</h2>
      </div>
      }
      <div className="flex justify-start mb-12">
        <h2 className='text-4xl dark:text-gray-100'>Your Stats:</h2>
      </div>

      <article className="rounded-lg border border-gray-100 mt-4 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div>
          <p className="text-xl text-gray-500 dark:text-gray-200">Questions solved</p>
          <p className="text-4xl mt-1 font-bold text-blue-500">{questionsSolved}</p>
        </div>
      </article>

      <article className="rounded-lg border border-gray-100 mt-4 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div>
          <p className="text-xl text-gray-500 dark:text-gray-200">Questions Correct</p>
          <p className="text-4xl mt-1 font-bold text-blue-500">{questionsCorrect}</p>
        </div>
      </article>
      <article className="rounded-lg border border-gray-100 mt-4 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div>
          <p className="text-xl text-gray-500 dark:text-gray-200">Overall Percentage</p>
          <p className="text-4xl mt-1 font-bold text-blue-500">{`${Math.round(((questionsCorrect/questionsSolved) * 10000)) / 100} %`}</p>
        </div>
      </article>
      
      <div className="flex gap-4 mt-8">
        <button className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}