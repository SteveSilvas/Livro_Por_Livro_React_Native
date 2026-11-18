import React from 'react';
import { PublicRoutes } from '../../Routes/public.routes';
import { AppRoutes } from '../../Routes/app.routes';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../Context/AuthContext';

export default function Index() {
    const { isLoggedIn, restoring } = useAuth();

    if (restoring) {
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#785E91" />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.root}>
            {!isLoggedIn && <PublicRoutes />}
            {isLoggedIn && <AppRoutes />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF7D9',
    },
    loadingText: {
        marginTop: 12,
        color: '#785E91',
        fontWeight: 'bold',
    },
});