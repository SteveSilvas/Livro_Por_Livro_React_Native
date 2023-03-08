import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../../UI/Button';
import { AuthContext } from '../../../Context/AuthContext';
import { ConfirmModal } from '../../../UI/ConfirmModal';
const Home = ({ navigation }: any) => {
    return(
        <SafeAreaView>
            <Text>Home</Text>
        </SafeAreaView>
    );
}

export default Home;