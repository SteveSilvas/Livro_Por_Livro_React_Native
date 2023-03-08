import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../../Context/AuthContext';

const ProfileScreen = ({ navigation }: any) => {
    const auth = useContext(AuthContext);

    useEffect(() => {
        console.log('auth:', auth.auth.Email)
    }, [navigation]);

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView>
                <View style={styles.header}>
                    <Text>Imagem</Text>
                </View>
                <View>
                    <View>
                        <Text>Email:</Text>
                        <Text>{auth.auth.Email}</Text>
                    </View>
                </View>
                <Text>Perfil</Text>
                <Text>Perfil</Text>
            </ScrollView>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "pink"
    },

    header: {
        backgroundColor: "red",
        height: "20%"
    }
})
export default ProfileScreen;