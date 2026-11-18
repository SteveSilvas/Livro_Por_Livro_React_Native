import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { ConfirmModal } from '../../../UI/ConfirmModal';
import Button from '../../../UI/Button';
import { useAuth } from '../../../Context/AuthContext';

export default function Logout() {
    const { logout, user } = useAuth();
    const [showConfirm, setShowConfirm] = useState<boolean>(false);

    const handleCloseModal = () => {
        setShowConfirm(false)
    }

    const handleConfirmModal = () => {
        setShowConfirm(false)
        logout();
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
                <Text>Olá, {user?.Name ?? 'leitor'}!</Text>
                <Button text="Loggout" onClick={() => { setShowConfirm(true) }}
                />
            </ScrollView>
        </SafeAreaView >
    );
}
