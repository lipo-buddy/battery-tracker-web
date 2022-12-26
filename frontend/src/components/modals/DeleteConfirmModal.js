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
    ButtonGroup,
    Heading,
    Text
  } from '@chakra-ui/react'

import { Icon } from '@blueprintjs/core';
import { useEffect, useState } from 'react';
import { AiOutlineBug } from 'react-icons/ai';

const DeleteConfirmModal = ({ isOpen, onConfirm, onCancel, batteryName }) => {
    return (
        <Modal
            size="lg"
            isOpen={isOpen}
            onClose={onCancel}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Battery</ModalHeader>
            <ModalBody>
              <Text fontSize="md">
                Are you sure you want to delete <b>{batteryName || 'Untitled Battery'}</b>?
                This cannot be undone, and you will lose any history for this battery.
              </Text>
            </ModalBody>
  
            <ModalFooter>
              <Button mr={3} onClick={onCancel} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                colorScheme="red"
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
};

export default DeleteConfirmModal;