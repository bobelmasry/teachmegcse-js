import {React, useState } from "react"
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
  VStack,
  FormLabel,
  Input,
} from "@chakra-ui/react"

import { supabase } from '@/components/utils/supabase';
import Router from "next/router";

export default function AssignmentModal({ subject, level, userID, classID }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");

  let router = Router

  function formatDateTime(dateString) {
    const date = new Date(dateString);
  
    // Set the time to 11:59 PM (23:59)
    date.setHours(23, 59, 0, 0);
  
    // Return the formatted ISO string
    return date.toISOString();
  }

  async function createAssignment(event) {
    event.preventDefault()
    try {
      const { error } = await supabase.from('assignments').insert({ user_id: userID, name: name.trim(), classID: classID, dueDate : formatDateTime(dueDate), subject : subject, level : level });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setDueDate(null)
      setName('')
      router.reload();
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        className="mt-2 w-full rounded-lg px-4 py-2 text-md font-medium bg-gray-100 text-black"
      >
        Create Assignment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Assignment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={createAssignment}>
              <VStack spacing={4}>
                <div>
                  <FormLabel>Assignment Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter assignment name"
                    required
                  />
                </div>

                <div>
                  <FormLabel>Due Date</FormLabel>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>

                <Button mt={4} colorScheme="blue" type="submit">
                  Create Assignment
                </Button>
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}