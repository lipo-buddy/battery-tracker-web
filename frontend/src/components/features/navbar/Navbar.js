import { Button, Box, Container, Tabs, TabList, Tab, Image, Text } from "@chakra-ui/react";
import { Icon } from '@blueprintjs/core';
import { TiBatteryCharge, TiBell, TiEdit, TiLightbulb, TiThumbsUp, TiUserOutline } from 'react-icons/ti';
import logo from '../../../assets/img/logo-text-black.png';
import { useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import FeedbackModal from "../../modals/FeedbackModal";

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
    const [feedbackOpen, setFeedbackOpen] = useState(false);

    return (
        <>
        <Box   
            bg="black"
            color="white"
            display="flex"
            flexDir="column"
            justifyContent="stretch"
            alignItems="stretch"
        >
            <Container
                maxW="100vw"
                display="flex"
                flexDir="row"
                justifyContent="stretch"
                alignItems="stretch"
                h="50px"
                overflow="hidden"
            >
                <Box
                    flex="0 0 auto"
                    display="flex"
                    flexDir="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    pointerEvents="none"
                    userSelect="none"
                >
                    <Image src={logo} height="35px" />
                </Box>
                <Box flex="1"></Box>
                <Box flex="0"
                    display="flex"
                    flexDir="row">
                    <Button
                        bg="rgba(255,255,255,0.0)"
                        color="white"
                        height="50px"
                        borderRight="1px solid rgba(255,255,255,0.15)"
                        borderLeft="1px solid rgba(255,255,255,0.15)"
                        borderRadius="0px"
                        _hover={{
                            bg: 'rgba(255,255,255,0.1)',
                        }}
                        _active={{
                            bg: 'rgba(255,255,255,0.2)',
                        }}
                        onClick={() => setFeedbackOpen(true)}
                    >
                        <TiEdit />&nbsp;Feedback
                    </Button>
                    <Button
                        bg="rgba(255,255,255,0.0)"
                        color="white"
                        height="50px"
                        borderRight="1px solid rgba(255,255,255,0.15)"
                        borderRadius="0px"
                        _hover={{
                            bg: 'rgba(255,255,255,0.1)',
                        }}
                        _active={{
                            bg: 'rgba(255,255,255,0.2)',
                        }}
                    >
                        <TiUserOutline />&nbsp;Log In to Sync
                    </Button>
                </Box>
            </Container>
        </Box>
        <Box   
            borderBottom="2px solid rgba(0,0,0,0.05)"
            bg="#F9C80E"
            display="flex"
            flexDir="column"
            justifyContent="stretch"
            alignItems="stretch"
        >
            <Box
                borderTop="1px solid rgba(0,0,0,0.1)"
            />
            <Container
                maxW="1200px"
                mb="-2px"
            >
                <TabButton path="/batteries"><TiBatteryCharge />&nbsp;Batteries</TabButton>
                {/* <TabButton path="/alerts"><TiBell />&nbsp;Alerts</TabButton> */}
            </Container>
        </Box>
        <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
        </>
    );
}

export default Navbar;