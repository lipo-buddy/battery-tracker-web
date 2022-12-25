import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'

const FeedbackModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            size="xl"
            isOpen={isOpen}
            onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Send Feedback</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Send feedback
            </ModalBody>
  
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button mr={3} onClick={onClose}>
                Send
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
};

export default FeedbackModal;