import { supabase } from 'utils/supabase'
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
  } from '@chakra-ui/react'


export default function AddStudents ({studentsAvailable, classData, user}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()

    async function addAStudent(studentID, event) {
      event.preventDefault();
      let data2;
    
      if (classData[0].students === null) {
        data2 = [studentID.toString()];
      } else {
        data2 = [...classData[0].students];
        data2.push(studentID.toString());
      }
    
      try {
        const { data, error } = await supabase
          .from('classes')
          .update({
            students: data2
          })
          .eq('user_id', user.id);
    
        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      } finally {
        router.reload();
      }
    }
    
    return (
        <div>
    <Button colorScheme='blue' margin={8} size='lg' onClick={onOpen}>Add Students</Button>

<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent bg="gray.800" color="white">
    <ModalHeader>Add Students</ModalHeader>
    <ModalCloseButton color="white" />
    <ModalBody>
          <div className="space-y-4 md:space-y-5 p-8">
            <div className="flex items-start"></div>
            {studentsAvailable.length === 0 && (
              <p className='text-white'>No available students.</p>
            )}

            {studentsAvailable.map((student) => (
              <div key={student.id} className="flex gap-4">
                <p key={student.id} className="w-full w-4/5 sm:w-3/5 bg-gray-500 text-white focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5 text-center">
                  {student.username}
                </p>
                <AddIcon onClick={(event) => addAStudent(student.id, event)} fontSize="large" className='cursor-pointer ease-out transition-all hover:bg-gray-200 bg-gray-400 rounded rounded-xl' />
              </div>
            ))}
          </div>
        </ModalBody>
</ModalContent>
</Modal>
</div>
    )
  }