import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Textarea,
    Flex,
    ButtonGroup
  } from '@chakra-ui/react'

import { Icon } from '@blueprintjs/core';
import { useEffect, useState } from 'react';
import { AiOutlineBug } from 'react-icons/ai';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setCategory(null);
      setText('');
    }
  }, [isOpen]);


    return (
        <Modal
            size="xl"
            isOpen={isOpen}
            onClose={onClose}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Send Feedback</ModalHeader>
            <ModalBody>
              <Flex justifyContent="stretch" align="stretch">
                <ButtonGroup flex="1" isAttached w="100%" mb="20px">
                  <Button
                    flex="1"
                    colorScheme={category === 'positive' ? 'blue' : 'gray'} 
                    leftIcon={<Icon icon="symbol-triangle-up" />}
                    onClick={() => setCategory('positive')}
                  >
                    Positive
                  </Button>
                  <Button
                    flex="1"
                    colorScheme={category === 'negative' ? 'blue' : 'gray'} 
                    leftIcon={<Icon icon="symbol-triangle-down" />}
                    onClick={() => setCategory('negative')}
                  >Negative</Button>
                  <Button
                    flex="1"
                    colorScheme={category === 'bug' ? 'blue' : 'gray'} 
                    leftIcon={<AiOutlineBug />}
                    onClick={() => setCategory('bug')}
                  >Bug</Button>
                  <Button
                    flex="1"
                    colorScheme={category === 'feature' ? 'blue' : 'gray'} 
                    leftIcon={<Icon icon="lightbulb" />}
                    onClick={() => setCategory('feature')}
                  >Request</Button>
                </ButtonGroup>
              </Flex>
              <Textarea placeholder="Send us your feedback (Good or bad) here!" value={text} onChange={(e) => setText(e.target.value)} />
            </ModalBody>
  
            <ModalFooter>
              <Button mr={3} onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={onClose}
                rightIcon={<Icon icon="send-message" />}
              >
                Send
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
};

export default FeedbackModal;