import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    FormLabel,
    Select
  } from '@chakra-ui/react'


export default function UpdateClass ({classID, subject, school, level, userID}) {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [class_Name, SetClass_Name] = useState('');

    async function updateClass(event) {
      event.preventDefault()
      try {
        const { error } = await supabase
          .from('classes')
          .upsert({ name: class_Name.trim(), classID: classID, user_id: userID, subject: subject, school : school, level : level })
          .eq('classID', classID)
          .eq('user_id', userID)
          .eq('subject', subject)
    
        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        router.reload()
      }
    }

    async function deleteClass(event) {
      event.preventDefault()
      try {
        const { error } = await supabase
          .from('classes')
          .delete()
          .eq('classID', classID);
    
        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        router.reload()
      }
    }

    return (
        <div>
    <Button colorScheme='blue' margin={2} size='md' onClick={onOpen}>Edit</Button>

<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent bg="gray.800" color="white">
    <ModalHeader>Edit Your Class</ModalHeader>
    <ModalCloseButton color="white" />
    <ModalBody>
          <form className="space-y-4 md:space-y-5 p-8">
      <div>
        <div>
          <FormLabel>
            Class Name
          </FormLabel>
        </div>
        <Input variant='outline' onChange={(e) => SetClass_Name(e.target.value)} value={class_Name} size='md' placeholder={class_Name.trim()} />
      </div>
      <div>
        <div>
        <FormLabel>
          Subject
        </FormLabel>
        </div>
        <Select placeholder={subject} disabled={true}>
                <option>{subject}</option>
        </Select>
      </div>
      <div>
        <div>
        <FormLabel>
          Level
        </FormLabel>
        </div>
        <Select placeholder={level} disabled={true}>
                <option>{level}</option>
        </Select>
      </div>
      </form>
    </ModalBody>

<ModalFooter gap={4}>
<button onClick={event => updateClass(event)}
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Update Class
      </button>
      <button onClick={event => deleteClass(event)}
        className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Delete Class
      </button>
</ModalFooter>
</ModalContent>
</Modal>
</div>
    )
  }