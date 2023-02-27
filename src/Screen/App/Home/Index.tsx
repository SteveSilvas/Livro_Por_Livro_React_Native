import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../../UI/Button';
import { AuthContext } from '../../../Context/AuthContext';
const Home = ({ navigation }: any) => {
    const { auth, setAuth } = useContext(AuthContext);

    const loggout = () => {
        alert("voltar")
        setAuth({
            Email: "",
            Pass: "",
            LoggedIn: false
        });
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>Home</Text>
                <Button text="Loggout" onClick={loggout}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;