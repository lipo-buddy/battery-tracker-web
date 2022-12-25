import { Text, Box, Container, Button, Heading } from "@chakra-ui/react";

function BatteryScreen() {
    return (
        <Container
            maxW="1180px"
            pt="40px"
            display="flex"
            flexDir="column"
            justifyContent="stretch"
            alignItems="stretch"
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
                >
                    Add Battery
                </Button>
            </Box>
            <Box border="1px solid blue">
                Batteries
                Batteries
                Batteries
                Batteries
                Batteries
                Batteries

            </Box>

        </Container>
    )
}

export default BatteryScreen;