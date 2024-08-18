import { supabase } from 'utils/supabase';
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
} from '@chakra-ui/react';

export default function CreateWorksheet({ user }) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subjectValue, setSubjectValue] = useState('');
  const [levelValue, setLevelValue] = useState('');
  const [worksheetName, setWorksheetName] = useState('');
  const [type, setType] = useState('');

  async function handleSelect(event) {
    event.preventDefault();
    setSubjectValue(event.target.value);
  }

  async function handleSelect2(event) {
    event.preventDefault();
    setLevelValue(event.target.value);
  }

  async function handleSelect3(event) {
    event.preventDefault();
    setType(event.target.value);
  }

  async function createWorksheet(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from('worksheets')
        .insert({
          user_id: user.id,
          name: worksheetName.trim(),
          subject: subjectValue,
          type: type,
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
      setType('');
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
              <div>
                <FormLabel>Worksheet Name</FormLabel>
              </div>
              <Input
                variant="outline"
                onChange={(e) => setWorksheetName(e.target.value)}
                value={worksheetName}
                size="md"
                placeholder="Year 12 Physics"
              />
              <div>
                <FormLabel>Subject</FormLabel>
                <Select
                  backgroundColor="gray.700"
                  placeholder="Choose a subject"
                  onChange={handleSelect}
                >
                  <option value="biology">Biology</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="physics">Physics</option>
                  <option value="economics">Economics</option>
                </Select>
              </div>
              <div>
                <FormLabel>Level</FormLabel>
                <Select
                marginTop={2}
                  backgroundColor="gray.700"
                  placeholder="Choose a Level"
                  onChange={handleSelect2}
                >
                  <option value="IGCSE">IGCSE</option>
                  <option value="AS">AS</option>
                  <option value="A2">A2</option>
                </Select>
                <FormLabel marginTop={3}>Type (MCQ or Long Answer)</FormLabel>
                <Select
                  marginTop={3}
                  backgroundColor="gray.700"
                  placeholder="Choose a Type"
                  onChange={handleSelect3}
                >
                  <option value="MCQ">MCQ</option>
                  <option value="LongAnswer">Long Answer</option>
                </Select>
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={event => createWorksheet(event)} colorScheme="blue">
              Create a Worksheet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
