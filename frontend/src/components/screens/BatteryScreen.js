import { Text, Box, Container, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { IoIosAdd, IoIosAddCircle } from "react-icons/io";
import { TbBarcode } from 'react-icons/tb';
import DatabaseContext from "../../context/DatabaseContext";
import BatteryCard from "../features/BatteryCard";
import CreateBatteryModal from "../modals/CreateBatteryModal";

function BatteryScreen() {
    const {
        batteries,
        addBattery
    } = useContext(DatabaseContext);
    const [createBatteryOpen, setCreateBatteryOpen] = useState(false);

    return (
        <Container
            maxW="1180px"
            pt="40px"
            display="flex"
            flexDir="column"
            justifyContent="stretch"
            alignItems="stretch"
            mb="50px"
        >
            <Box
                display="flex"
                flexDir="row"
                justifyContent="stretch"
                alignItems="center"
                mb="15px"
                pb="15px"
                borderBottom="1px solid rgba(0,0,0,0.05)"
            >
                <Heading size="md">0 Batteries</Heading>
                <Box flex="1"></Box>
                {/* <Button
                    bg="rgba(0,0,0,0.05)"
                    border="1px solid rgba(0,0,0,0.2)"
                    color="black"
                    height="40px"
                    borderRadius="0px"
                    shadow="3px 3px rgba(0,0,0,0.05)"
                    mr="10px"
                    _hover={{
                        bg: 'rgba(0,0,0,0.1)',
                        shadow: "3px 3px rgba(0,0,0,0.1)"
                    }}
                    _active={{
                        bg: 'rgba(0,0,0,0.1)',
                        shadow: "3px 3px rgba(0,0,0,0.1)"
                    }}
                >
                    <TbBarcode />&nbsp;Scan QR
                </Button> */}
                <Button
                    bg="rgba(0,0,0,0.05)"
                    border="1px solid rgba(0,0,0,0.2)"
                    color="black"
                    height="40px"
                    borderRadius="0px"
                    shadow="3px 3px rgba(0,0,0,0.05)"
                    _hover={{
                        bg: 'rgba(0,0,0,0.1)',
                        shadow: "3px 3px rgba(0,0,0,0.1)"
                    }}
                    _active={{
                        bg: 'rgba(0,0,0,0.1)',
                        shadow: "3px 3px rgba(0,0,0,0.1)"
                    }}
                    onClick={() => setCreateBatteryOpen(true)}
                >
                    Add Battery
                </Button>
            </Box>
            <Box>
                <SimpleGrid columns={[1, 1, 2, 3]} spacing={[6,6,8, 8]}>
                    {batteries.map((battery) => {
                        return (
                            <BatteryCard batteryData={battery} />
                        );
                    })}
                    <Box
                        bg="rgba(0,0,0,0.035)"
                        borderRadius="2px"
                        h="250px"
                        display="flex"
                        flexDir="row"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="20px"
                        fontWeight="bold"
                        color="rgba(0,0,0,0.3)"
                        cursor="pointer"
                        onClick={() => setCreateBatteryOpen(true)}
                        _hover={{
                            bg: 'rgba(0,0,0,0.05)'
                        }}
                    >
                        <Text mr="6px" fontSize="28px" opacity="0.8">
                            <IoIosAddCircle />
                        </Text>
                        Add Battery
                    </Box>
                </SimpleGrid>
            </Box>
            <CreateBatteryModal
                isOpen={createBatteryOpen}
                onClose={() => setCreateBatteryOpen(false)}
            />
        </Container>
    )
}

export default BatteryScreen;