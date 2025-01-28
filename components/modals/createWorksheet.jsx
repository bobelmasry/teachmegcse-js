import { supabase } from '../utils/supabase';
import { useState } from 'react';
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
  Select,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';

export default function CreateWorksheet({ user }) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subjectValue, setSubjectValue] = useState('');
  const [levelValue, setLevelValue] = useState('');
  const [worksheetName, setWorksheetName] = useState('');

  async function handleSelect(event) {
    event.preventDefault();
    setSubjectValue(event.target.value);
  }

  async function handleSelect2(event) {
    event.preventDefault();
    setLevelValue(event.target.value);
  }

  async function createWorksheet(event) {
    event.preventDefault();
    if (subjectValue === '' || levelValue === '' || worksheetName === '') {
      return;
    }
    try {
      const { data, error } = await supabase
        .from('worksheets')
        .insert({
          user_id: user.id,
          name: worksheetName.trim(),
          subject: subjectValue,
          level: levelValue,
          questions: [],
        })
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        console.log(data);
        
        // Redirect to the newly created worksheet's page
        router.push(`/worksheet/${data[0].id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
      setLevelValue('');
      setWorksheetName('');
      setSubjectValue('');
    }
  }

  return (
    <>
      <Button colorScheme="blue" size="lg" onClick={onOpen}>
        Create a Worksheet
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>Create a Worksheet</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <form className="space-y-4 md:space-y-5 p-8">
            <FormControl isInvalid={worksheetName === ''} isRequired>
              <FormLabel>Worksheet Name</FormLabel>
              <Input
                variant="outline"
                onChange={(e) => setWorksheetName(e.target.value)}
                value={worksheetName}
                size="md"
                placeholder="Year 12 Physics Homework"
              />
              {worksheetName === '' && <FormErrorMessage>Worksheet name can{"'"}t be empty.</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={subjectValue === ''} isRequired>
              <FormLabel>Subject</FormLabel>
              <Select
                backgroundColor="gray.700"
                placeholder="Choose a subject"
                onChange={handleSelect}
                value={subjectValue}
              >
                <option value="biology">Biology</option>
                <option value="chemistry">Chemistry</option>
                <option value="physics">Physics</option>
                <option value="economics">Economics</option>
              </Select>
              {subjectValue === '' && <FormErrorMessage>Subject is required.</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={levelValue === ''} isRequired>
              <FormLabel>Level</FormLabel>
              <Select
                marginTop={2}
                backgroundColor="gray.700"
                placeholder="Choose a Level"
                onChange={handleSelect2}
                value={levelValue}
              >
                <option value="IGCSE">IGCSE</option>
                <option value="AS">AS</option>
                <option value="A2">A2</option>
              </Select>
              {levelValue === '' && <FormErrorMessage>Level is required.</FormErrorMessage>}
            </FormControl>

          </form>
        </ModalBody>

        <ModalFooter>
          <Button onClick={createWorksheet} colorScheme="blue">
            Create a Worksheet
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

    </>
  );
}
