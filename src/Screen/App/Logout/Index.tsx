import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { AuthContext } from '../../../Context/AuthContext';
import { ConfirmModal } from '../../../UI/ConfirmModal';
import Button from '../../../UI/Button';

export default function Index() {

    const { auth, setAuth } = useContext(AuthContext);
    const [showConfirm, setShowConfir] = useState<boolean>(false);
    const loggout = () => {
        setShowConfir(false)
        setAuth({
            Email: "",
            Pass: "",
            LoggedIn: false
        });
    }

    const handleCloseModal = () => {
        setShowConfir(false)
    }

    const handleConfirmModal = () => {
        loggout();
    }

    const renderConfirmModal = () => {
        return showConfirm
            && <ConfirmModal
                message="Deseja realmente sair?"
                showModal={showConfirm}
                closeModal={handleCloseModal}
                confirmModal={handleConfirmModal} />
    }

    return (
        <SafeAreaView>
            {renderConfirmModal()}
            <ScrollView>
                <Text>Home</Text>
                <Button text="Loggout" onClick={() => { setShowConfir(true) }}
                />
            </ScrollView>
        </SafeAreaView >
    );
}

