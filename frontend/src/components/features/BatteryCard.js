import {
    Box,
    Text,
    VStack,
    Button,
    Select,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { IoIosBatteryFull } from 'react-icons/io';
import { 
    TbBatteryOff,
    TbBattery,
    TbBatteryEco
} from 'react-icons/tb';
import { 
    TiBatteryCharge,
    TiBatteryFull,
    TiBatteryHigh,
    TiBatteryLow,
    TiBatteryMid,
    TiEdit,
    TiTrash
} from 'react-icons/ti';


import { TbChevronDown } from "react-icons/tb";
import DatabaseContext from "../../context/DatabaseContext";
import CreateEditBatteryModal from "../modals/CreateEditBatteryModal";
import { Icon } from "@blueprintjs/core";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

const fgColorMapping = {
    'fully-charged': '#C87619',
    'partially-charged': '#D1980B',
    'storage': '#1C6E42',
    'discharged': '#CD4246',
    'dead': '#9D3F9D'
}

const bgColorMapping = {
    'fully-charged': '#FBB360',
    'partially-charged': '#FBD065',
    'storage': '#72CA9B',
    'discharged': '#FA999C',
    'dead': '#D69FD6'
}

const iconMappings = {
    'fully-charged': TiBatteryFull,
    'partially-charged': TiBatteryHigh,
    'storage': TiBatteryMid,
    'discharged': TiBatteryLow,
    'dead': TbBatteryOff
}

const nextStatus = {
    'fully-charged': 'partially-charged',
    'partially-charged': 'storage',
    'storage': 'discharged',
    'discharged': 'fully-charged',
    'dead': 'dead'
}

const labelMappings = {
    'default': 'Generic',
    'lipo': 'LiPo',
    'liion': 'LiIon',
    'lifepo4': 'LiFePo4',
    'lead-acid': 'Lead Acid'
}

function BatteryCard({ batteryData }) {
    const {
        id,
        name,
        status,
        chemistry,
        capacity,
        nominalVoltage,
        numCells
    } = batteryData;

    const {
        deleteBattery,
        updateBattery
    } = useContext(DatabaseContext);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const onStatusChange = (e) => {
        const newStatus = e.target.value;
        updateBattery({
            ...batteryData,
            status: newStatus
        });
    }

    const cycleStatus = () => {
        const newStatus = nextStatus[status];
        updateBattery({
            ...batteryData,
            status: newStatus
        });
    }

    let labelStr = '';
    labelStr += labelMappings[chemistry || 'default']
    if (capacity) {
        labelStr += ', ' + capacity + 'mAh'
    }
    if (nominalVoltage) {
        labelStr += ', ' + nominalVoltage + 'V'
    }
    if (numCells && (chemistry !== 'lead-acid')) {
        labelStr += ' (' + numCells + 'S)'
    }

    const IconMapped = iconMappings[status] || TbBatteryOff;

    return (
        <Box
            border="1px solid rgba(0,0,0,0.2)"
            bg="rgba(0,0,0,0.025)"
            shadow="3px 3px rgba(0,0,0,0.05)"
            h={["210px","210px","250px"]}
            display="flex"
            flexDir="column"
            justifyContent="stretch"
            alignItems="stretch"
            position="relative"
            borderRadius="3px"
            overflow="hidden"
        >
            <Box
                flex="0 0 auto"
                display="flex"
                flexDir="row"
                justifyContent="stretch"
                alignItems="center"
                pl="10px"
                pt="2px"
                pb="5px"
            >
                <Text
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    flex="1"
                    fontSize="18px"
                    fontWeight="bold"
                    color={fgColorMapping[status]}
                    textTransform="uppercase"
                >{name || 'Untitled'}</Text>
                <Button
                variant="text"
                    fontSize="20px" p="0px" bg="none" borderRadius="0px" onClick={() => setEditOpen(true)}>
                    <TiEdit />
                </Button>
                <Button fontSize="20px" p="0px"  bg="none" variant="text" borderRadius="0px" onClick={() => setDeleteOpen(true)}>
                    <TiTrash />
                </Button>
            </Box>
            <Box
                flex="1"
                h="50px"
                display="flex"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                position="relative"
                zIndex="0"
                cursor="pointer"
                onClick={() => {
                    cycleStatus();
                }}
            >
                <VStack spacing={0}
                    pointerEvents="none"
                    userSelect="none"
                >
                    <Text 
                        fontSize="80px"
                        color={fgColorMapping[status]}
                        opacity="1.0"
                    >
                        <IconMapped />
                    </Text>
                    <Text
                        display="block"
                        transform="translateY(-10px)"
                        fontSize="20px"
                        fontWeight="bold"
                        color={fgColorMapping[status]}
                        opacity="1.0"
                    >{labelStr}</Text>

                </VStack>
            </Box>
            <Box
                flex="0 0 auto"
                display="flex"
                flexDir="row"
                justifyContent="stretch"
                alignItems="stretch"
                fontWeight="bold"
                bg="rgba(255,255,255,0.5)"
            >
                <Select
                    borderRadius="0px"
                    border="none"
                    value={status}
                    onChange={(e) => onStatusChange(e)}
                    size={"lg"}
                    userSelect="none"
                >
                    <option value="fully-charged">Status: Fully Charged</option>
                    <option value="partially-charged">Status: Partially Charged</option>
                    <option value="storage">Status: Storage</option>
                    <option value="discharged">Status: Discharged</option>
                    <option value="dead">Status: Dead / Damaged</option>
                </Select>
            </Box>
            <Box
                position="absolute"
                top="0px"
                bottom="0px"
                left="0px"
                right="0px"
                bg={bgColorMapping[status]}
                zIndex="-1"
                opacity="0.2"
                cursor="pointer"
            >
            </Box>
            <CreateEditBatteryModal 
                isOpen={editOpen}
                initialState={batteryData}
                onCancel={() => setEditOpen(false)}
                onConfirm={(editedData) => {
                    updateBattery(editedData);
                    setEditOpen(false);
                }}
            />
            <DeleteConfirmModal 
                isOpen={deleteOpen}
                batteryName={name}
                onCancel={() => setDeleteOpen(false)}
                onConfirm={() => {
                    deleteBattery(id);
                    setDeleteOpen(false);
                }}
            />
        </Box>
    )
}

export default BatteryCard;