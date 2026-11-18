import React from 'react';
import { PublicRoutes } from '../../Routes/public.routes';
import { AppRoutes } from '../../Routes/app.routes';
import { SafeAreaView } from 'react-native';
import { useAuth } from '../../Context/AuthContext';

export default function Index() {
    const { isLoggedIn } = useAuth();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {!isLoggedIn && <PublicRoutes />}
            {isLoggedIn && <AppRoutes />}
        </SafeAreaView>
    );
}