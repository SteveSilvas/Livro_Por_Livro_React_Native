import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input } from '../../UI/Input/index';
import Button from '../../UI/Button';
import { MessageModal } from '../../UI/MessageModal/index';
import { useAuth } from '../../Context/AuthContext';
import { ApiError } from '../../services/api/client';
import * as usersApi from '../../services/api/users';

interface RegisterForm {
    Name: string;
    Birth: string;
    Email: string;
    Pass: string;
}

export default function Register({ navigation }: any) {
    const { login } = useAuth();
    const [user, setUser] = useState<RegisterForm>({
        Name: "",
        Birth: "",
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

    const changeBirthHandler = (birth: string) => {
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
        return checkMandatorys() && checkPass();
    }

    const onClickSave = async () => {
        if (!checkFields()) {
            return;
        }
        try {
            await usersApi.createUser({
                Name: user.Name,
                // O backend aceita string ISO ou Date; normalizamos para ISO.
                Birth: new Date(user.Birth).toISOString(),
                Email: user.Email,
                Pass: user.Pass,
            });
            setError("Cadastro realizado com sucesso!");
            setShowMessageModal(true)
            setTimeout(async () => {
                // Autentica automaticamente após o cadastro.
                try {
                    await login({ Email: user.Email, Pass: user.Pass });
                } catch {
                    navigation.navigate('Login');
                }
            }, 1500)
        } catch (error) {
            const message =
                error instanceof ApiError
                    ? error.message
                    : 'Não foi possível cadastrar. Tente novamente.';
            setError(message);
            setShowMessageModal(true)
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
                            value={user.Name}
                            onChange={changeNameHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Nascimento (AAAA-MM-DD):</Text>
                        <Input
                            style={styles.input}
                            type='default'
                            placeholder="1995-01-31"
                            value={user.Birth}
                            onChange={changeBirthHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Email:</Text>
                        <Input
                            style={styles.input}
                            type='email-address'
                            value={user.Email}
                            onChange={changeEmailHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Senha:</Text>
                        <Input
                            style={styles.input}
                            type='default'
                            value={user.Pass}
                            onChange={changePassHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Repita a senha:</Text>
                        <Input
                            style={styles.input}
                            type='default'
                            value={confirmPass}
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
