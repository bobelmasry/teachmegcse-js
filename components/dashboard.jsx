import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import "flowbite"

export default function Dashboard({ session }) {
    const supabase = useSupabaseClient()
    const user = useUser()

    const [username, setUsername] = useState(null)
    const [initialGotten, setinitialGotten] = useState(false)
    const [questionsSolved, setQuestionsSolved] = useState([])
    

    useEffect(() => {
      async function getProfile() {
        if (!initialGotten) {
        try {
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`*`)
            .eq('id', user.id)
            .single()

          if (error && status !== 406) {
            throw error
          }

          if (data) {
            setUsername(data.username)
            setQuestionsSolved(data.questionsSolved)
            }
        } catch (error) {
          console.log(error)
        } finally {
          setinitialGotten(true)
        }
      }}
      getProfile()
      }, [initialGotten, questionsSolved, session, supabase, user.id])

  return (
    <>
    <div className="flex justify-center">
    <div className="w-11/12 sm:w-3/6 md:w-full">
      {username != null && 
      <div className="flex justify-start mb-6">
        <h2 className='text-5xl dark:text-gray-100'>Hi <span className='text-blue-500 font-semibold capitalize'>{username}</span>,</h2>
      </div>
      }
      <div className="flex justify-start mb-12">
        <h2 className='text-4xl dark:text-gray-100'>Your Stats:</h2>
      </div>
      
      <div className="relative overflow-x-auto shadow-md rounded-lg">
  <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
    <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="sm:px-4 px-2 py-3">
          Subject
        </th>
        <th scope="col" className="sm:px-4 px-2 py-3">
          Questions Solved
        </th>
        <th scope="col" className="sm:px-4 px-2 py-3">
          Percentage
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th scope="row" className="sm:px-4 px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Biology
        </th>
        <td className="px-10 py-4">
        {questionsSolved.filter((question) => question.Subject == 'biology').length}
        </td>
        <td className="sm:px-4 px-2 py-4">
        {`${Math.round(((questionsSolved.filter((question) => (question.Subject == 'biology') && (question.Correct.toString() == 'true')).length/questionsSolved.filter((question) => question.Subject == 'biology').length) * 10000)) / 100} %`}
        </td>
      </tr>
      <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="sm:px-4 px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Chemistry
        </th>
        <td className="px-10 py-4">
        {questionsSolved.filter((question) => question.Subject == 'chemistry').length}
        </td>
        <td className="sm:px-4 px-2 py-4">
        {`${Math.round(((questionsSolved.filter((question) => (question.Subject == 'chemistry') && (question.Correct.toString() == 'true')).length/questionsSolved.filter((question) => question.Subject == 'chemistry').length) * 10000)) / 100} %`}
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th scope="row" className="sm:px-4 px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Physics
        </th>
        <td className="px-10 py-4">
        {questionsSolved.filter((question) => question.Subject == 'physics').length}
        </td>
        <td className="sm:px-4 px-2 py-4">
        {`${Math.round((((questionsSolved.filter((question) => (question.Subject == 'phyics') && (question.Correct.toString() == 'true')).length)/(questionsSolved.filter((question) => question.Subject == 'physics').length)) * 10000)) / 100} %`}
        </td>
      </tr>
      <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="sm:px-4 px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Economics
        </th>
        <td className="px-10 py-4">
        {questionsSolved.filter((question) => question.Subject == 'economics').length}
        </td>
        <td className="sm:px-4 px-2 py-4">
        {`${Math.round(((questionsSolved.filter((question) => (question.Subject == 'economics') && (question.Correct.toString() == 'true')).length/questionsSolved.filter((question) => question.Subject == 'economics').length) * 10000)) / 100} %`}
        </td>
      </tr>
    </tbody>
  </table>
</div>

      <div className="flex gap-4 mt-24">
        <button className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
      </div>
      </div>
  </>
  )
}