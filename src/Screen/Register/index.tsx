import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input } from '../../UI/Input/index';
import Button from '../../UI/Button';
import { MessageModal } from '../../UI/MessageModal/index';
import { useAuth } from '../../Context/AuthContext';
import { getErrorMessage } from '../../Util/errors';
import {
    isValidBirthDate,
    isValidEmail,
    isValidName,
    isValidPassword,
    MIN_PASSWORD_LENGTH,
    toIsoDate,
} from '../../Util/validation';
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
    const [saving, setSaving] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

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

    const checkName = () => {
        if (!isValidName(user.Name)) {
            setError("Informe o nome.");
            setShowMessageModal(true);
            return false;
        }
        return true;
    }

    const checkEmail = () => {
        if (!isValidEmail(user.Email)) {
            setError("Informe um e-mail válido.");
            setShowMessageModal(true);
            return false;
        }
        return true;
    }

    const checkBirth = () => {
        if (!isValidBirthDate(user.Birth)) {
            setError("Informe uma data de nascimento válida (AAAA-MM-DD).");
            setShowMessageModal(true);
            return false;
        }
        return true;
    }

    const checkPass = () => {
        if (!isValidPassword(user.Pass)) {
            setError(`A senha deve ter ao menos ${MIN_PASSWORD_LENGTH} caracteres.`);
            setShowMessageModal(true);
            return false;
        }
        if (user.Pass != confirmPass) {
            setError("Senhas diferentes");
            setShowMessageModal(true)
            return false
        }
        return true;
    }

    const checkFields = () => {
        return (
            checkMandatorys() &&
            checkName() &&
            checkEmail() &&
            checkBirth() &&
            checkPass()
        );
    }

    const onClickSave = async () => {
        if (saving || !checkFields()) {
            return;
        }
        setSaving(true);
        try {
            await usersApi.createUser({
                Name: user.Name.trim(),
                Birth: toIsoDate(user.Birth),
                Email: user.Email.trim(),
                Pass: user.Pass,
            });
            setSuccess(true);
            setError("Cadastro realizado com sucesso!");
            setShowMessageModal(true)
            setTimeout(async () => {
                // Autentica automaticamente após o cadastro.
                try {
                    await login({ Email: user.Email.trim(), Pass: user.Pass });
                } catch {
                    setSuccess(false);
                    navigation.navigate('Login');
                }
            }, 1500)
        } catch (error) {
            setError(getErrorMessage(error, 'Não foi possível cadastrar. Tente novamente.'));
            setShowMessageModal(true)
        } finally {
            setSaving(false);
        }
    }

    const closeMessageModalHandler = () => {
        setShowMessageModal(false);
        // Após o sucesso, fecha a modal e volta ao login caso o auto-login falhe.
        if (success) {
            setSuccess(false);
            navigation.navigate('Login');
        }
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
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <View style={styles.form}>
                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Nome:</Text>
                        <Input
                            style={styles.input}
                            type='default'
                            editable={!saving}
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
                            editable={!saving}
                            value={user.Birth}
                            onChange={changeBirthHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Email:</Text>
                        <Input
                            style={styles.input}
                            type='email-address'
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!saving}
                            value={user.Email}
                            onChange={changeEmailHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Senha:</Text>
                        <Input
                            style={styles.input}
                            type='default'
                            secureTextEntry
                            autoCapitalize="none"
                            editable={!saving}
                            value={user.Pass}
                            onChange={changePassHandler}
                        />
                    </View>

                    <View style={styles.rowForm}>
                        <Text style={styles.label}>Repita a senha:</Text>
                        <Input
                            style={styles.input}
                            type='default'
                            secureTextEntry
                            autoCapitalize="none"
                            editable={!saving}
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
                            text={saving ? "Salvando..." : "Salvar"}
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
