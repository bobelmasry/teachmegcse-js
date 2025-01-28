import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'


export default function Modal ({user, school}) {
  const supabase = useSupabaseClient()
  const [modalShown, setModelShown] = useState(true)
  const chapters = [
      {
          "id" : 1,
          "subject": "chemistry",
        },
        {
          "id" : 2,
          "subject": "physics",
        },
        {
          "id" : 3,
          "subject": "economics",
        },
        {
          "id" : 4,
          "subject": "biology",
        },
  ]
  const [subjectValue, setSubjectValue] = useState('');
  const [class_Name, SetClass_Name] = useState('');

  async function handleSelect(event) {
      event.preventDefault();
      setSubjectValue(event.target.value)
      }

  async function createClass(event) {
    event.preventDefault()
    try {
      const { error } = await supabase.from('classes').insert({ user_id: user.id, name: class_Name.trim(), subject: subjectValue, school : school });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setModelShown(false)
    }
  }
if (modalShown){
  return (
      <div>
  {/* Main modal */}
  <div id="defaultModal" tabIndex={-1} className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-2xl max-h-full">
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        {/* Modal header */}
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create a Class
          </h3>
          <button onClick={() => setModelShown(!modalShown)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Modal body */}
        <form className="space-y-4 md:space-y-5 p-8">
    <div>
      <div>
        <label
          htmlFor="class_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Class Name
        </label>
      </div>
      <input
        type="text"
        name="class_name"
        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder="Year 12 Physics"
        value={class_Name}
          onChange={(e) => SetClass_Name(e.target.value)}
      />
    </div>

    <div>
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Subject
        </label>
      </div>
      <select id="chapters" value={subjectValue} onChange={handleSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option id='0' value={0} defaultValue={true}>Choose a Subject</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.subject}>{chapter.subject}</option>
            ))}
      </select>
    </div>

    <div className="flex items-start"></div>
      <button
      type="submit"
      onClick={event => createClass(event)}
      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      Create a Class
    </button>
  </form>
      </div>
    </div>
  </div>
</div>
  )}
}