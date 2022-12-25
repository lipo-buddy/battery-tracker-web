import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
      global: {
        "html, body": {
        }
      }
    },
    initialColorMode: 'light',
    useSystemColorMode: false,
  });
  

const ChakraContextProvider = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
    );
}

export default ChakraContextProvider;