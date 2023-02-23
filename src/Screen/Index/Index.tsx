import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/stack.routes';
import { SafeAreaView } from 'react-native';

export default function Index() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
                <StackRoutes />
            </NavigationContainer>
        </SafeAreaView>
    );
}