import React from "react"
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
  Textarea,
} from "@chakra-ui/react"

export default function AssignmentModal({ subject, level, userID, classID }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [dueDate, setDueDate] = React.useState("")

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
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                  <FormLabel>Description</FormLabel>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                  <FormLabel>Due Date</FormLabel>
                  <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
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
  )
}

