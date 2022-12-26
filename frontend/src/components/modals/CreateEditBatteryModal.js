import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Select,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    VStack,
    HStack,
  } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react';
import DatabaseContext from '../../context/DatabaseContext';

const defaultBattery = {
  id: null,
  name: 'Untitled Battery',
  chemistry: 'lipo',
  capacity: null,
  nominalVoltage: null,
  numCells: null
};

const CreateEditBatteryModal = ({ initialState, isOpen, onConfirm, onCancel }) => {
  const [battery, setBattery] = useState(initialState || defaultBattery);

  useEffect(() => {
    if (isOpen) {
      setBattery(initialState || defaultBattery);
    }
  }, [isOpen]);

  const {
      addBattery
  } = useContext(DatabaseContext);
  
  const editing = battery.id !== null;
  const isLeadAcid = battery.chemistry === 'lead-acid';
  return (
      <Modal
          size="xl"
          isOpen={isOpen}
          onClose={onCancel}
          closeOnEsc={true}
          closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent ml="10px" mr="10px">
          <ModalHeader>{editing ? 'Edit': 'Create'} Battery</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Battery name"
                value={battery.name || ''}
                onChange={(e) => {
                  setBattery((old) => ({
                    ...old,
                    name: e.target.value
                  }));
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Battery Chemistry</FormLabel>
              <Select
                value={battery.chemistry || 'lipo'}
                onChange={(e) => {
                  setBattery((old) => ({
                    ...old,
                    chemistry: e.target.value
                  }));
                }}
              >
                <option value="lipo">LiPo (Pouch Cell)</option>
                <option value="liion">LiIon</option>
                <option value="lifepo4">LiFePo4</option>
                <option value="lead-acid">Lead-Acid</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Capacity</FormLabel>
              <Input
                placeholder="1000mAh"
                value={battery.capacity || ''}
                onChange={(e) => {
                  setBattery((old) => ({
                    ...old,
                    capacity: e.target.value
                  }));
                }}
              />
              <FormHelperText>
                Nominal battery capacity in mAh.
              </FormHelperText>
            </FormControl>
            {isLeadAcid && (
              <FormControl>
              <FormLabel>Nominal Voltage</FormLabel>
              <Input
                placeholder="11.4V"
                value={battery.nominalVoltage || ''}
                onChange={(e) => {
                  setBattery((old) => ({
                    ...old,
                    nominalVoltage: e.target.value
                  }));
                }}
              />
              <FormHelperText>
                Nominal voltage listed on the battery. Normally this
                is the storage voltage.
              </FormHelperText>
            </FormControl>
            )}
            {!isLeadAcid && (
              <HStack justify="flex-start" align="flex-start" spacing={6}>
              <FormControl>
                <FormLabel>Nominal Voltage</FormLabel>
                <Input
                  placeholder="11.4V"
                  value={battery.nominalVoltage || ''}
                  onChange={(e) => {
                    setBattery((old) => ({
                      ...old,
                      nominalVoltage: e.target.value
                    }));
                  }}
                />
                <FormHelperText>
                  Nominal voltage listed on the battery. Normally this
                  is the storage voltage.
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Number of Cells</FormLabel>
                <Input
                  placeholder="3"
                  value={battery.numCells || ''}
                  onChange={(e) => {
                    setBattery((old) => ({
                      ...old,
                      numCells: e.target.value
                    }));
                  }}
                />
                <FormHelperText>
                  Number of series cells in the battery.
                </FormHelperText>
              </FormControl>
              </HStack>
            )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onCancel}>
              Cancel
            </Button>
            <Button mr={3} onClick={() => onConfirm(battery)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
};

export default CreateEditBatteryModal;