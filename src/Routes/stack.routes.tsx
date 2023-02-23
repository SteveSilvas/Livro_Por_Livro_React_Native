import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screen/Login/Index';
import Register from '../Screen/Register/Index';
import { Text } from 'react-native';
import React from 'react';


export function StackRoutes() {
    const Stack = createNativeStackNavigator();
    // const renderLogin = ()=>{
    //     return <Login/>
    // }

    // const renderRegister = ()=>{
    //     return <Register/>
    // }
    return (

        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name="Login"
                component={Login}
            />

            <Stack.Screen
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    )
}