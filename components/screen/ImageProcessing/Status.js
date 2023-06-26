import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Linking, Button } from 'react-native';

const PopupPage = ({ status, data, navigation, user }) => {
    const [isVisible, setIsVisible] = useState(true);

    const closePopup = () => {
        setIsVisible(false);
    };

    const onNavigate = () => {
        // format data
    const convertRes = {data : navigation.getParam('data'), image: data};
    // Will be updated! 
    // navigation with data
    navigation.navigate('ResultPage',convertRes);
    }
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = currentDate.toLocaleString('vi-VN', options);
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContainer}>
                {status === true &&
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={closePopup}>
                            <Image style={{ width: 13, height: 13, alignSelf: 'flex-end' }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <View style={styles.imageStatusContainer}>
                            <Image source={require('../../../assets/images/success.png')} style={styles.image} />
                            <Text style={styles.modalText}>Quét thành công</Text>
                        </View>
                        <Text style={styles.divider} />
                        <View style={styles.dateContainer}>
                            <Text style={styles.title}>{formattedDate}</Text>
                            <Text style={[styles.title, { marginTop: 5 }]}>Giá trị ảnh</Text>
                            <Text style={{ fontSize: 12, fontWeight: 700, }}>{data.R} | {data.U}</Text>
                            <Text style={[styles.title, { marginTop: 5 }]}>Link kiểm tra</Text>
                            <TouchableOpacity>
                                <Text style={{ color: '#4EAFE5', borderBottomWidth: 1, borderBottomColor: '#4EAFE5' }}> Press here</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity> */}
                    </View>
                }
                {status === false &&
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={closePopup}>
                            <Image style={{ width: 13, height: 13, alignSelf: 'flex-end' }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <View style={styles.imageStatusContainer}>
                            <Image source={require('../../../assets/images/fail.png')} style={styles.image} />
                            <Text style={styles.modalText}>'Quét thất bại'</Text>
                            <Text>Lỗi trong quá trình quét đã được phát hiện. Vui lòng thực hiện lại. Nếu vẫn còn lỗi, chọn Get More Help. </Text>
                            <TouchableOpacity onPress={closePopup}>
                                <Text style={styles.button1}>Return home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.button2}>Get More Help</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
        width: 271,
        height: 265,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        justifyContent: 'flex-start', // Align content to the left
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
});

export default PopupPage;
