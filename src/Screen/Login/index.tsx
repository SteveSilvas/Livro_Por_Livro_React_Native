import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import Button from "../../UI/Button";
import { Input } from "../../UI/Input/index";
import { LoginType } from "../../@Types/api";
import { MessageModal } from "../../UI/MessageModal/index";
import { MessageModalPropsType } from "../../@Types/MessageModalPropsType";
import { useAuth } from '../../Context/AuthContext';
import { ApiError } from '../../services/api/client';

const Login = ({ navigation }: any) => {
    const { login, loading } = useAuth();
    const [modal, setModal] = useState<MessageModalPropsType>(
        {
            message: "",
            showModal: false,
            closeModal: hideModal
        }
    );

    const [loginData, setLoginData] = useState<LoginType>({
        Email: "",
        Pass: "",
    });

    const showModal = (message: string, otherCloseModal?: () => void): void => {
        setModal({
            message: message,
            showModal: true,
            closeModal: otherCloseModal || hideModal
        });
    }

    function hideModal(): void {
        setModal((prev) => { return { ...prev, showModal: false } })
    }

    const changeEmailHandler = (email: string) => {
        setLoginData((prev) => {
            return { ...prev, Email: email }
        });
    }

    const changePassHandler = (pass: string) => {
        setLoginData((prev) => {
            return { ...prev, Pass: pass }
        });
    }

    const checkFields = () => {
        if (!loginData.Email) {
            showModal("Preencha o Email.");
            return false;
        }

        if (!loginData.Pass) {
            showModal("Preencha a Senha.");
            return false;
        }

        return true;
    }

    const onClickLogin = async () => {
        if (!checkFields()) {
            return;
        }
        try {
            await login(loginData);
            // Em caso de sucesso o AuthContext passa a `isLoggedIn = true`
            // e o Index troca automaticamente para as rotas autenticadas.
        } catch (error) {
            const message =
                error instanceof ApiError
                    ? error.message
                    : 'Não foi possível entrar. Tente novamente.';
            showModal(message);
        }
    }

    const onClickRegister = () => {
        navigation.navigate('Register');
    }

    const renderMessageModal = () => {
        return <MessageModal
            showModal={modal.showModal}
            message={modal.message}
            closeModal={modal.closeModal}
        />
    }

    return (
        <SafeAreaView style={styles.loginPage}>
            {renderMessageModal()}
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
                            value={loginData.Email}
                            onChange={changeEmailHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text>Senha:</Text>
                        <Input
                            type="default"
                            value={loginData.Pass}
                            onChange={changePassHandler}
                        />
                        <Text style={styles.linkPass}>Esqueci a senha</Text>
                    </View>

                    <Button
                        text={loading ? "Entrando..." : "Entrar"}
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
