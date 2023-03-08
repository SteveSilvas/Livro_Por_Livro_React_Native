import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Image, TextInput, ScrollView, SafeAreaView } from "react-native";
import Button from "../../UI/Button";
import { Input } from "../../UI/Input/Index";
import { LoginType } from "../../@Types/LoginType";
import LoginServices from '../../services/Auth/LoginServices';
import { MessageModal } from "../../UI/MessageModal/index,";
import { MessageModalPropsType } from "../../@Types/MessageModalPropsType";
import { AuthContext } from '../../Context/AuthContext';

const Login = ({ navigation}: any) => {
    const {auth, setAuth} = useContext(AuthContext);
    const [modal, setModal] = useState<MessageModalPropsType>(
        {
            message: "",
            showModal: false,
            closeModal: hideModal
        }
    );

    const [login, setLogin] = useState<LoginType>({
        Email: "",
        Pass: "",
        LoggedIn: false
    });

    const showModal = (message: string, otherCloseModal?: () => void): void => {
        setModal({
            message: message,
            showModal: true,
            closeModal: otherCloseModal || hideModal
        });
    }

    function closeModalModify(): void {
        setAuth(login);
        hideModal();
    }

    function hideModal(): void {
        setModal((prev) => { return { ...prev, showModal: false } })
    }

    const changeEmailHandler = (email: string) => {
        setLogin((prev) => {
            return { ...prev, Email: email }
        });
    }

    const changePassHandler = (pass: string) => {
        setLogin((prev) => {
            return { ...prev, Pass: pass }
        });
    }

    const checkFields = () => {
        if(!login.Email){
            showModal("Preencha o Email.");
            return false; 
        }

        if(!login.Pass){
            showModal("Preencha a Senha.");
            return false;
        }
       
        return true;
    }

    const onClickLogin = () => {
        
        if (checkFields()) {
            LoginServices.LoginAxiosRequest(login)
                .then((response) => {
                    
                    setLogin((prev)=> {return {...prev, LoggedIn: true}})
                    showModal(response.message, closeModalModify);
                })
                .catch((error) => {
                    if (error.response) {
                        const errorMessage: string = `Erro: ${error.response.data}`;
                        showModal(errorMessage);
                    }
                });
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