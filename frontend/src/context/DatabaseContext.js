import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useLocalStorage} from 'react-use';

const DatabaseContext = React.createContext(null);
export default DatabaseContext;

export function DatabaseContextProvider({ children }) {
    const [batteryNum, setBatteryNum] = useLocalStorage('battery-counter', 0);
    const [batteries, setBatteries] = useLocalStorage('batteries', [{
        name: 'Test1',
        id: uuidv4()
    }, {
        name: 'Test2',
        id: uuidv4()
    }]);

    const addBattery = (name) => {
        setBatteries([...batteries, {
            name: `Battery #${batteryNum || 0}`,
            id: uuidv4(),
            status: 'discharged'
        }]);
        setBatteryNum((batteryNum || 0) + 1);
    };

    const deleteBattery = (id) => {
        setBatteries(batteries.filter((old) => old.id !== id));
    }

    const updateBattery = (battery) => {
        setBatteries(batteries.map((batt) => {
            if (batt.id === battery.id) {
                return battery;
            } else {
                return batt;
            }
        }));
    }

    return (
        <DatabaseContext.Provider value={{
            batteries,
            addBattery,
            deleteBattery,
            updateBattery
        }}>
            { children }
        </DatabaseContext.Provider>
    );
}