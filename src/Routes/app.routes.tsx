import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screen/App/Home/Index';
import Register from '../Screen/Register/Index';
import Logout from '../Screen/App/Logout/Index';
import { Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export function AppRoutes() {
    const Stack = createNativeStackNavigator();

    const renderAppScreens = () => {
        return (
            <>
                <Stack.Screen
                    name="Home"
                    component={Home}
                />

                <Stack.Screen
                    name="Logout"
                    component={Logout}
                />
            </>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                {renderAppScreens()}
            </Stack.Navigator>
        </NavigationContainer>
    )

}