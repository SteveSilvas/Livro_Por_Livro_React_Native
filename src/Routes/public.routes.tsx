import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screen/Login/Index';
import Register from '../Screen/Register/Index';

import Home from '../Screen/App/Home/Index';
import Logout from '../Screen/App/Logout/Index';
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