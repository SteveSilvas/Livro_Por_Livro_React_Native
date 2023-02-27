import React from 'react';
import { Modal, View, Text } from 'react-native';
import { MessageModal } from '../MessageModal/MessageModal';
import Button from '../Button';

type ConfirModalPropsType = {
    message: string,
    showModal: boolean,
    closeModal: () => void,
    confirmModal: () => void
}

export function ConfirmModal(props: ConfirModalPropsType) {
    const renderButtonConfirm = () => {
        return <Button
            onClick={props.confirmModal}
            text="Confirmar"
        />
    }
    return (
        <MessageModal
            showModal={props.showModal}
            message={props.message}
            closeModal={props.closeModal}
        >
            {renderButtonConfirm()}

        </MessageModal>
    );
}