import { Box } from '@chakra-ui/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from '../features/Footer';
import Navbar from '../features/navbar/Navbar';
import AlertScreen from './AlertScreen';
import BatteryScreen from './BatteryScreen';

function RootScreen() {
    return (
        <Box
            display="flex"
            flexDir="column"
            justifyContent="stretch"
            alignItems="stretch"
            flex="1"
        >
            {/* <Navbar /> */}
            <Switch>
                <Route path="/batteries">
                    <BatteryScreen />
                </Route>
                <Route path="/alerts">
                    <AlertScreen />
                </Route>
                <Route>
                    <Redirect to="/batteries" />
                </Route>
            </Switch>
            <Box flex="1"></Box>
            {/* <Footer /> */}
        </Box>
    )
}

export default RootScreen;