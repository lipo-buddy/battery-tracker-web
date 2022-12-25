import { Button, Box, Container, Tabs, TabList, Tab, Image, Text } from "@chakra-ui/react";
import { Icon } from '@blueprintjs/core';
import { TiBatteryCharge, TiBell } from 'react-icons/ti';
import logo from '../../../assets/img/logo.png';
import { useHistory, useRouteMatch } from "react-router-dom";

const TabButton = ({ path, children }) => {
    const match = useRouteMatch(path);
    const history = useHistory();

    return (
        <Button
            bg="none"
            color="black"
            borderRadius="0px"
            borderBottom={match ? "2px solid black" : "2px solid rgba(0,0,0,0.0)"}
            _hover={{
                bg: "rgba(0,0,0,0.1)"
            }}
            _active={{
                bg: "rgba(0,0,0,0.1)"
            }}
            onClick={() => {
                history.push(path);
            }}
        >{children}</Button>
    )
}
const Navbar = () => {
    const history = useHistory();

    return (
        <Box   
            borderBottom="2px solid rgba(0,0,0,0.05)"
            bg="#F9C80E"
            display="flex"
            flexDir="column"
            justifyContent="stretch"
            alignItems="stretch"
        >
            <Container
                maxW="1200px"
                p={3}
                display="flex"
                flexDir="row"
                justifyContent="stretch"
                alignItems="stretch"
            >
                <Box
                    flex="0 0 auto"
                    display="flex"
                    flexDir="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    pointerEvents="none"
                    userSelect="none"
                    pl="15px"
                >
                    <Image src={logo} width="40px" height="40px" />
                    <Text fontSize="20px" fontWeight="bold">LiPo Buddy</Text>
                </Box>
                <Box flex="1"></Box>
                <Box flex="0" pr="15px">
                    <Button
                        bg="rgba(0,0,0,0.9)"
                        color="white"
                        height="40px"
                        borderRadius="0px"
                        shadow="3px 3px rgba(0,0,0,0.1)"
                        _hover={{
                            bg: 'rgba(0,0,0,0.95)',
                            shadow: "3px 3px rgba(0,0,0,0.2)"
                        }}
                        _active={{
                            bg: 'rgba(0,0,0,1.0)',
                            shadow: "3px 3px rgba(0,0,0,0.2)"
                        }}
                    >
                        Log In to Sync
                    </Button>
                </Box>
            
            </Container>
            <Box
                borderTop="1px solid rgba(0,0,0,0.1)"
            />
            <Container
                maxW="1200px"
                mb="-2px"
            >
                <TabButton path="/batteries"><TiBatteryCharge />&nbsp;Batteries</TabButton>
                <TabButton path="/alerts"><TiBell />&nbsp;Alerts</TabButton>
            </Container>
        </Box>
    );
}

export default Navbar;