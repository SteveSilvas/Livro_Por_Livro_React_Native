import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input } from '../../UI/Input/Index';
import Button from '../../UI/Button';
import api from '../../services/Api';
import axios from "axios";
import StatusRoute from '../../@Tests/StatusRequets';
import Registration from '../../services/Auth/RegistrationServices';
import { UserRegisterType } from '../../@Types/UserRegisterType';
import { MessageModal } from '../../UI/MessageModal/MessageModal';
import StatusRequets from '../../@Tests/StatusRequets';

export default function Register({ navigation }: any) {
    const date = new Date(1995, 1, 1);
    const [user, setUser] = useState<UserRegisterType>({
        Id: 0,
        Name: "",
        Birth: date,
        Email: "",
        Pass: ""
    });
    const [confirmPass, setConfirmPass] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [showMessageModal, setShowMessageModal] = useState<boolean>(false);


    useEffect(() => {
        if (!showMessageModal) {
            setError("");
        }
    }, [showMessageModal]);


    const changeNameHandler = (name: string) => {
        setUser((prev) => {
            return { ...prev, Name: name }
        });
    }

    const changeBirthHandler = (birth: any) => {
        setUser((prev) => {
            return { ...prev, Birth: birth }
        });
    }

    const changeEmailHandler = (email: string) => {
        setUser((prev) => {
            return { ...prev, Email: email }
        });
    }

    const changePassHandler = (pass: string) => {
        setUser((prev) => {
            return { ...prev, Pass: pass }
        });
    }

    const changeConfirmPassHandler = (password: string) => {
        setConfirmPass(password)
    }

    const onClickLogin = () => {
        navigation.navigate('Login');
    }

    const checkMandatorys = () => {

        if (!user.Name || !user.Birth || !user.Email || !user.Pass || !confirmPass) {

            setShowMessageModal(true)
            setError("Preencha todos os campos");

            return false;
        } else return true;
    }

    const checkPass = () => {
        if (user.Pass != confirmPass) {
            setError("Senhas diferentes");
            setShowMessageModal(true)

            return false
        }
        return true;
    }

    const checkFields = () => {
        let errorStatus: boolean = checkMandatorys() && checkPass();

        return errorStatus;
    }

    const onClickSave = () => {
        if (checkFields()) {
            Registration.RegisterAxiosRequest(user)
            .then((response)=>{
                setError(response);
                setShowMessageModal(true)
                setTimeout(()=>{
                    navigation.navigate('Login');
                }, 3000)
            })
            .catch((error)=>{
                setError(error.response.data);
                setShowMessageModal(true)
            });
        }
    }

    const closeMessageModalHandler = () => {
        setShowMessageModal(false);
    }

    const renderMessageModal = () => {
        return <MessageModal
            showModal={showMessageModal}
            message={error}
            closeModal={closeMessageModalHandler}
        />
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderMessageModal()}
            <ScrollView style={styles.scrollView}>
                <View style={styles.form}>
                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Nome:</Text>
                        <Input
                            style={styles.input}
                            type='default'
                            onChange={changeNameHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Nascimento:</Text>
                        <Input
                            style={styles.input}
                            type='numeric'
                            onChange={changeBirthHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Email:</Text>
                        <Input
                            style={styles.input}
                            type='email-address'
                            onChange={changeEmailHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Senha:</Text>
                        <Input
                            style={styles.input}
                            type='default'
                            onChange={changePassHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Repita a senha:</Text>
                        <Input
                            style={styles.input}
                            type='default'
                            onChange={changeConfirmPassHandler}
                        />
                    </View>


                    <View style={styles.footer}>
                        <Button
                            text="Fazer login"
                            style={styles.button}
                            onClick={onClickLogin}
                        />
                        <Button
                            text="Salvar"
                            style={styles.button}
                            onClick={onClickSave}
                        />
                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: "100%",
        height: "100%",
        backgroundColor: "#FFF7D9"
    },
    scrollView: {
        flex: 1
    },
    form: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: 490,
        borderWidth: 1,
        borderColor: "#7C8891",
        borderRadius: 12
    },
    rowForm: {
        width: "80%",
        display: "flex",
        alignItems: "flex-start",
    },

    label: {
        fontWeight: "bold"
    },
    input: {
        width: "100%",
    },

    footer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "80%"
    },

    button: {
        backgroundColor: "#BC9BDE",
        color: "black",
        fontSize: 15,
        textAlign: "center",
        width: "40%"
    },
});
