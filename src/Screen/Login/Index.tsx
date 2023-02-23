import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, ScrollView, SafeAreaView } from "react-native";
import Button from "../../UI/Button";
import { Input } from "../../UI/Input/Index";
import { LoginType } from "../../@Types/LoginType";

const Login = ({ navigation }: any) => {
    const [login, setLogin] = useState<LoginType>({
        email: "",
        pass: "",
        loggedIn: false
    });

    const changeEmailHandler = (email: string) => {
        setLogin((prev) => {
            return { ...prev, email: email }
        });
    }

    const changePassHandler = (pass: string) => {
        setLogin((prev) => {
            return { ...prev, pass: pass }
        });
    }

    const onClickLogin = () => {
        alert("login");
    }

    const onClickRegister = () => {
        navigation.navigate('Register');      
    }
 
    return (
        <SafeAreaView style={styles.loginPage}>
            <ScrollView>
                <View style={styles.panelApresentation}>
                    <Image
                        style={{ width: 150, height: 150, resizeMode: "contain" }}
                        source={require('../../../assets/logo.png')}
                    />
                    <Text style={styles.title}>Books Barter</Text>
                </View>
                <View style={styles.form}>

                    <View style={styles.rowForm}>
                        <Text>Email:</Text>
                        <Input
                            type="email-address"
                            onChange={changeEmailHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text>Senha:</Text>
                        <Input
                            type="default"
                            onChange={changePassHandler}
                        />
                        <Text style={styles.linkPass}>Esqueci a senha</Text>
                    </View>

                    <Button
                        text="Entrar"
                        style={styles.button}
                        onClick={onClickLogin}
                    />

                    <Button
                        text="Cadastrar"
                        style={styles.button}
                        onClick={onClickRegister}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginPage: {
        padding: 10,
        width: "100%",
        height: "100%",
        backgroundColor: "#FFF7D9"
    },

    panelApresentation: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    title: {
        fontSize: 30,
        color: "#785E91",
        fontWeight: "bold"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: 300,
        borderWidth: 1,
        borderColor: "#7C8891",
        borderRadius: 12
    },

    rowForm: {
        width: "100%",
        display: "flex",
        alignItems: "center"
    },

    input: {
        borderWidth: 1,
        borderColor: "#7C8891",
        width: "60%",
        borderRadius: 12
    },

    linkPass: {
        color: "#7C8891",
        fontWeight: "bold"
    },

    button: {
        backgroundColor: "#BC9BDE",
        color: "black",
        fontSize: 15,
        textAlign: "center",
        width: "60%"
    },
})

export default Login;