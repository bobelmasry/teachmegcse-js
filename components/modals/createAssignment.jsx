import { DatePicker, Modal } from 'antd';
import { supabase } from 'utils/supabase'
import { useState } from 'react'
import { useRouter } from 'next/router';
import {Button} from '@chakra-ui/react'

export default function AssignmentModal ({userID, classID, subject, level}) {
  const router = useRouter()
  const onChange = (value, dateString) => {
    setDueDate(value)
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

    const [class_Name, SetClass_Name] = useState('');
    const [dueDate2, setDueDate] = useState(null);


    async function createAssignment(event) {
      event.preventDefault()
      try {
        const { error } = await supabase.from('assignments').insert({ user_id: userID, name: class_Name.trim(), classID: classID, dueDate : dueDate2, subject : subject, level : level });
        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        setIsModalOpen(false)
        setDueDate(null)
        SetClass_Name('')
        router.reload();
      }
    }

    return (
        <div>
<Button colorScheme='blue' margin={16} size='lg' onClick={showModal}> Create an Assignment </Button>
{isModalOpen && 
<Modal title="Create an Assignment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <form className="space-y-4 md:space-y-5 p-8">
        <div>
          <label
            htmlFor="class_name"
            className="block mb-2 text-sm font-medium"
          >
            Assignment Name
          </label>
        </div>
        <input
          type="text"
          name="class_name"
          className={`border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder="September Homework"
          value={class_Name}
            onChange={(e) => SetClass_Name(e.target.value)}
        />
        <label
            htmlFor="class_name"
            className="block mb-2 text-sm font-medium"
          >
            Due Date
          </label>
          <DatePicker onChange={onChange} />
        {dueDate2 === null && (
        <p className="text-red-500 text-sm">Please select a due date.</p>
      )}
    </form>
<button
        type="submit"
        onClick={event => createAssignment(event)}
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Create an Assignment
</button>
</Modal>
}
  </div>
    )
  }