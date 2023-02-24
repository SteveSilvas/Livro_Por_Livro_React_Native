import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screen/Login/Index';
import Register from '../Screen/Register/Index';
import { Text } from 'react-native';
import React from 'react';


export function AuthRoutes(props: any) {
    const Stack = createNativeStackNavigator();

    const testeLogin = (isLogged:boolean) =>{
        props.setIsLoggedIn(isLogged)
    }
    return (

        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name="Login"
                component={Login}
                initialParams={{ isLoggedIn: testeLogin }}
            />


            <Stack.Screen
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    )
}