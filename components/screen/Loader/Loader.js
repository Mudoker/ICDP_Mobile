import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Linking, Button } from 'react-native';
import FastImage from 'react-native-fast-image';

const PopupPage = ({ status = true, data, navigation, option = 'scan' }) => {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = currentDate.toLocaleString('vi-VN', options);
    const [key, setKey] = useState(0); // Add state for the key

    return (
        <Modal animationType="none" transparent={true} >
            <View style={styles.modalContainer}>
                {status === true && option === 'scan' &&
                    <View style={styles.modalContent}>
                        <FastImage
                            key={`${option}_${key}`} // Use key prop with option and key value
                            style={{ width: 60, height: 60 }}
                            source={require('../../../assets/images/image_scan.gif')}
                        />
                    </View>}
                {status === true && option === 'loading' &&
                    <View style={styles.modalContent}>
                        <FastImage
                            key={`${option}_${key}`} // Use key prop with option and key value
                            style={{ width: 60, height: 60 }}
                            source={require('../../../assets/images/loading.gif')}
                        />
                    </View>}
                {status === true && option === 'success' &&
                    <View style={styles.modalContent}>
                        <FastImage
                            key={`${option}_${key}`} // Use key prop with option and key value
                            style={{ width: 80, height: 80 }}
                            source={require('../../../assets/images/scanning_successful.gif')}
                        />
                    </View>}
                {status === true && option === 'fail' &&
                    <View style={styles.modalContent}>
                        <FastImage
                            key={`${option}_${key}`} // Use key prop with option and key value
                            style={{ width: 80, height: 80 }}
                            source={require('../../../assets/images/scanning_fail.gif')}
                        />
                    </View>}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    // Other style definitions...

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 155,
        height: 65,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        justifyContent: 'center', // Align content to the left
        alignItems: 'center',
        borderRadius: 20,
    },
    imageStatusContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 48,
        height: 48,
    },
    modalText: {
        fontSize: 23,
        marginBottom: 10,
        fontWeight: '700',
        // fontFamily: 'Roboto',
        color: 'black',
    },
    divider: {
        marginTop: 10,
        width: 223,
        height: 2,
        backgroundColor: '#988D8D',
    },
    dateContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        color: 'black',
        fontSize: 13,
        // fontFamily: 'Roboto',
        fontWeight: '700',
        textAlign: 'left',
    },
    closeButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    button1: {
        backgroundColor: '#234EE8',
        color: 'white',
        borderWidth: 1,
        borderColor: '#4EAFE5',
        borderRadius: 7,
        width: 80,
        height: 29,
        fontSize: 11,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 10,
    },
    button2: {
        color: '#4EAFE5',
        borderWidth: 1,
        borderColor: '#4EAFE5',
        borderRadius: 7,
        width: 80,
        height: 29,
        fontSize: 11,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 10,
    }
    // Other style definitions...
});

export default PopupPage;
