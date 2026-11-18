import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';
import Button from '../Button';
import { MessageModalPropsType } from '../../@Types/MessageModalPropsType';


export function MessageModal(modalProps: MessageModalPropsType) {
    const [showModalLocal, setShowModalLocal] = useState<boolean>(modalProps.showModal);
    const justifyFooter = modalProps.children ? "space-between" : "center";

    useEffect(() => {
        if (modalProps.showModal) {
            setShowModalLocal(true);
        } else setShowModalLocal(false)
    }, [modalProps.showModal]);

    // useEffect(() => { //esconde a modal automat
    //     setTimeout(() => {
    //         hideModal();
    //     }, 5000);
    // }, [showModalLocal])

    const hideModal = () => {
        modalProps.closeModal()
    }

    const renderChildren = () => {
        return modalProps.children && (
            <View style={styles.footerElement}>
                {modalProps.children}

            </View>
        )
    }

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={showModalLocal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalPanel}>
                    <Text style={styles.modalTitle}>{modalProps.message}</Text>
                    <View style={[styles.modalFooter, { justifyContent: justifyFooter }]}>
                        <View style={styles.footerElement}>
                            <Button
                                onClick={hideModal}
                                text="Fechar" />
                        </View>
                        {renderChildren()}
                    </View>
                </View>

            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalPanel: {
        width: "80%",
        display: "flex",
        alignItems: "center",
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "black",
        elevation: 20,
    },

    modalTitle: {
        fontSize: 20
    },

    modalFooter: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },

    footerElement: {
        flex: 1
    }
});
