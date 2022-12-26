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
import { useContext } from "react";
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
    TiBatteryMid
} from 'react-icons/ti';

import { TbChevronDown } from "react-icons/tb";
import DatabaseContext from "../../context/DatabaseContext";

const fgColorMapping = {
    'fully-charged': '#D1980B',
    'partially-charged': '#C87619',
    'storage': '#1C6E42',
    'discharged': '#CD4246',
    'dead': '#CD4246'
}

const bgColorMapping = {
    'fully-charged': '#FBD065',
    'partially-charged': '#FBB360',
    'storage': '#72CA9B',
    'discharged': '#FA999C',
    'dead': '#FA999C'
}

const iconMappings = {
    'fully-charged': TiBatteryFull,
    'partially-charged': TiBatteryMid,
    'storage': TbBatteryEco,
    'discharged': TiBatteryLow,
    'dead': TbBatteryOff

}

function BatteryCard({ batteryData }) {
    const {
        id,
        name,
        status
    } = batteryData;

    const {
        deleteBattery,
        updateBattery
    } = useContext(DatabaseContext);

    const onStatusChange = (e) => {
        const newStatus = e.target.value;
        updateBattery({
            ...batteryData,
            status: newStatus
        });
    }

    console.log(status);
    console.log(fgColorMapping[status])

    const IconMapped = iconMappings[status] || TbBatteryOff;

    return (
        <Box
            border="1px solid rgba(0,0,0,0.1)"
            bg="rgba(0,0,0,0.025)"
            shadow="3px 3px rgba(0,0,0,0.05)"
            h={["210px","210px","250px"]}
            display="flex"
            flexDir="column"
            justifyContent="stretch"
            alignItems="stretch"
        >
            <Box
                flex="0 0 auto"
                bg="white"
                display="flex"
                flexDir="row"
                justifyContent="stretch"
                alignItems="center"
                pl="15px"
            >
                <Text
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    flex="1"
                >{name || 'Untitled'}</Text>
                <Button variant="ghost" borderRadius="0px">Edit</Button>
                <Menu placement="bottom-end">
                <MenuButton as={Button} variant="ghost" borderRadius="0px">
                <TbChevronDown />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => deleteBattery(id)}>Delete</MenuItem>
                </MenuList>
                </Menu>
            </Box>
            <Box
                flex="1"
                h="50px"
                borderTop="1px solid rgba(0,0,0,0.1)"
                display="flex"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                pointerEvents="none"
                userSelect="none"
                position="relative"
                zIndex="0"
            >
                <VStack spacing={0}>
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
                    >12V, 1300mah, LiPo</Text>

                </VStack>
                <Box
                    position="absolute"
                    top="0px"
                    bottom="0px"
                    left="0px"
                    right="0px"
                    bg={bgColorMapping[status]}
                    zIndex="-1"
                    opacity="0.2"
                >
                </Box>
            </Box>
            <Box
                flex="0 0 auto"
                borderTop="1px solid rgba(0,0,0,0.1)"
                display="flex"
                flexDir="row"
                justifyContent="stretch"
                alignItems="stretch"
                fontWeight="bold"
            >
                <Select
                    borderRadius="0px"
                    border="none"
                    value={status}
                    onChange={(e) => onStatusChange(e)}
                >
                    <option value="fully-charged">Status: Fully Charged</option>
                    <option value="partially-charged">Status: Partially Charged</option>
                    <option value="storage">Status: Storage</option>
                    <option value="discharged">Status: Discharged</option>
                    <option value="dead">Status: Dead</option>
                </Select>
            </Box>
        </Box>
    )
}

export default BatteryCard;