import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screen/Login';
import Register from '../Screen/Register';

import Home from '../Screen/App/Home';
import Logout from '../Screen/App/Logout';
import { Text } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

export function PublicRoutes(props:any) {
    const Stack = createNativeStackNavigator();

    const renderPublicScreens = () => {
        return (
            <>
                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="Register"
                    component={Register}
                />
            </>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                {renderPublicScreens()}
            </Stack.Navigator>
        </NavigationContainer>
            )
}