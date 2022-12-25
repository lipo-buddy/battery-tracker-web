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
import { TbChevronDown } from "react-icons/tb";
import DatabaseContext from "../../context/DatabaseContext";

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

    return (
        <Box
            border="1px solid rgba(0,0,0,0.1)"
            bg="rgba(0,0,0,0.025)"
            shadow="3px 3px rgba(0,0,0,0.05)"
            h="250px"
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
                <Text>{name || 'Untitled'}</Text>
                <Box flex="1"></Box>
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
            >
                <VStack spacing={0}>
                    <Text fontSize="80px" color="rgba(0,0,0,0.1)">
                        <IoIosBatteryFull />
                    </Text>
                    <Text
                        display="block"
                        transform="translateY(-10px)"
                        fontSize="20px"
                        fontWeight="bold"
                        color="rgba(0,0,0,0.2)"
                    >12V, 1300mah, LiPo</Text>

                </VStack>
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
                    <option value="storage'">Status: Storage</option>
                    <option value="discharged">Status: Discharged</option>
                    <option value="dead">Status: Dead</option>
                </Select>
            </Box>
        </Box>
    )
}

export default BatteryCard;