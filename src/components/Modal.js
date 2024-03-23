import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BottomModal = ({ visible, onClose, children, title }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalContainer} onPress={onClose}>

                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{title}</Text>
                    {children}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
    },
});

export default BottomModal;
