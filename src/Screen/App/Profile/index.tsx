import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../Context/AuthContext';
import Converters from '../../../Util/Converters';
import { Input } from '../../../UI/Input/index';
import Button from '../../../UI/Button';
import { MessageModal } from '../../../UI/MessageModal/index';
import { MessageModalPropsType } from '../../../@Types/MessageModalPropsType';
import { ApiError } from '../../../services/api/client';

const ProfileScreen = ({ navigation }: any) => {
    const { user, refreshProfile, updateProfile } = useAuth();
    const [editing, setEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [modal, setModal] = useState<MessageModalPropsType>({
        message: '',
        showModal: false,
        closeModal: hideModal,
    });

    function hideModal(): void {
        setModal((prev) => ({ ...prev, showModal: false }));
    }

    const showModal = (message: string): void => {
        setModal({ message, showModal: true, closeModal: hideModal });
    };

    const startEditing = () => {
        setName(user?.Name ?? '');
        setBirth(
            user?.Birth
                ? new Date(user.Birth).toISOString().slice(0, 10)
                : '',
        );
        setEmail(user?.Email ?? '');
        setEditing(true);
    };

    const onSave = async () => {
        try {
            await updateProfile({
                Name: name || undefined,
                Birth: birth ? new Date(birth).toISOString() : undefined,
                Email: email || undefined,
            });
            setEditing(false);
            showModal('Perfil atualizado com sucesso!');
        } catch (error) {
            showModal(
                error instanceof ApiError
                    ? error.message
                    : 'Não foi possível atualizar o perfil.',
            );
        }
    };

    const onRefresh = useCallback(() => {
        refreshProfile().catch((error) => {
            showModal(
                error instanceof ApiError
                    ? error.message
                    : 'Não foi possível carregar o perfil.',
            );
        });
    }, [refreshProfile]);

    const renderMessageModal = () => (
        <MessageModal
            showModal={modal.showModal}
            message={modal.message}
            closeModal={modal.closeModal}
        />
    );

    const renderReadOnly = () => (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.label}>Nome:</Text>
                <Text>{user?.Name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Nascimento:</Text>
                <Text>
                    {user?.Birth && Converters.GetDateString(new Date(user.Birth))}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text>{user?.Email}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Provedor:</Text>
                <Text>{user?.Provider}</Text>
            </View>
            <Button text="Editar perfil" style={styles.button} onClick={startEditing} />
            <Button text="Atualizar" style={styles.button} onClick={onRefresh} />
        </View>
    );

    const renderEditing = () => (
        <View style={styles.card}>
            <View style={styles.field}>
                <Text style={styles.label}>Nome:</Text>
                <Input type="default" value={name} onChange={setName} />
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Nascimento (AAAA-MM-DD):</Text>
                <Input type="default" value={birth} onChange={setBirth} />
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Email:</Text>
                <Input type="email-address" value={email} onChange={setEmail} />
            </View>
            <Button text="Salvar" style={styles.button} onClick={onSave} />
            <Button
                text="Cancelar"
                style={styles.button}
                onClick={() => setEditing(false)}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.root}>
            {renderMessageModal()}
            <ScrollView>
                <View style={styles.header}>
                    <Text>Perfil</Text>
                </View>
                {editing ? renderEditing() : renderReadOnly()}
            </ScrollView>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#FFF7D9"
    },

    header: {
        backgroundColor: "#BC9BDE",
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },

    card: {
        padding: 16,
        gap: 8,
    },

    row: {
        flexDirection: 'row',
        gap: 8,
    },

    field: {
        marginBottom: 8,
    },

    label: {
        fontWeight: 'bold',
    },

    button: {
        marginTop: 8,
    },
})
export default ProfileScreen;
