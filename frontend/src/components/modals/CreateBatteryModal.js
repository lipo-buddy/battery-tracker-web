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
import { useContext } from 'react';
import DatabaseContext from '../../context/DatabaseContext';

const CreateBatteryModal = ({ isOpen, onClose }) => {
    const {
        addBattery
    } = useContext(DatabaseContext);
    
    const onConfirm = () => {
        addBattery('new!');
        onClose();
    };

    return (
        <Modal
            size="xl"
            isOpen={isOpen}
            onClose={onClose}
            closeOnEsc={true}
            closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent ml="10px" mr="10px">
            <ModalHeader>Create Battery</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Name
              Chemistry
              Capacity (mAh)

              LiPo
              Nominal Voltage
              Number of Cells

              LiFePo4
              Nominal Voltage
              Number of Cells

              LiIon 18650
              Nominal Voltage

              Lead Acid Settings

                Add picture!
            </ModalBody>
  
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button mr={3} onClick={onConfirm}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
};

export default CreateBatteryModal;