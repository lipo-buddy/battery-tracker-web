import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import { BrowserRouter } from 'react-router-dom';
import ChakraContextProvider from './context/ChakraContext';
import RootScreen from './components/screens/RootScreen';
import 'focus-visible/dist/focus-visible';
import { DatabaseContextProvider } from './context/DatabaseContext';

ReactDOM.render(
  <ChakraContextProvider>
    <BrowserRouter>
      <DatabaseContextProvider>
        <RootScreen />
      </DatabaseContextProvider>
    </BrowserRouter>
  </ChakraContextProvider>,
  document.getElementById('root')
);