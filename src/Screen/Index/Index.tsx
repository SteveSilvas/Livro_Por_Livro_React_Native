import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from '../../Routes/auth.routes';
import { PrivateRoutes } from '../../Routes/private.routes';
import { SafeAreaView } from 'react-native';

export default function Index() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const renderPrivateRoutes = () => {
        return isLoggedIn && <PrivateRoutes />;
    }
    const handleLogin = (isLoggedIn: boolean) => {
        setIsLoggedIn(isLoggedIn);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <AuthRoutes setIsLoggedIn={handleLogin} />
                {renderPrivateRoutes()}
            </NavigationContainer>
        </SafeAreaView>
    );
}