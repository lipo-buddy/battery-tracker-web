import { Box, Container } from "@chakra-ui/react";


const Footer = () => {
    return (
        <Box
            flex="0"
            bg="rgba(0,0,0,0.03)"
            borderTop="1px solid rgba(0,0,0,0.05)"
            p="30px"
            color="rgba(0,0,0,0.5)"
            fontSize="14px"
        >
            <Container maxW="1200px">
            LiPo Buddy.
            a project by <a href="https://chrisdalke.com/">Chris Dalke</a>
            </Container>
        </Box>
    )
}

export default Footer;