import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { PublicRoutes } from '../../Routes/public.routes';
import { AppRoutes } from '../../Routes/app.routes';
import { SafeAreaView } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';

export default function Index() {
    const auth = useContext(AuthContext);

    const renderPublicRoutes = () => {
        return !auth.auth.LoggedIn && <PublicRoutes />;
    }


    const renderAppRoutes = () => {
        return auth.auth.LoggedIn && <AppRoutes />;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {renderPublicRoutes()}
            {renderAppRoutes()}
        </SafeAreaView>
    );
}