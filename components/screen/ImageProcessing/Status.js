import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Linking, Button } from 'react-native';
import FastImage from 'react-native-fast-image';

const PopupPage = ({ status, data, navigation, user }) => {
    const [isVisible, setIsVisible] = useState(true);
    // console.log('data ====>', data);

    const PARSE_MESSAGE = {
        'far': {
            reason: 'Ảnh quá xa',
            recommend: 'Chụp ảnh gần hơn'
        },
        'light': {
            reason: 'Ảnh quá sáng',
            recommend: 'Ảnh cần giảm bớt độ chói'
        },
        'rotated': {
            reason: 'Ảnh bị nghiêng',
            recommend: 'Cần xoay ảnh lại đúng chiều'
        },
        'blur': {
            reason: 'Ảnh bị mờ',
            recommend: 'Cần chụp ảnh rõ nét hơn'
        },
        'image_invalid': {
            reason: 'Ảnh không hợp lệ',
            recommend: 'Ảnh sai quy định, cần chụp ảnh vào màn hình máy đo'
        },
    };
    console.log(data);
    useEffect(() => {
        setIsVisible(status === true || status === false);
    }, [status]);

    const closePopup = () => {
        setIsVisible(false);
    };
    const onNavigate = () => {
        // format data
        const convertRes = { datas: data, navigation: navigation };
        // Will be updated! 
        // navigation with data
        navigation.navigate('ResultPage', convertRes);
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
                            <Image style={{ width: 20, height: 20, alignSelf: 'flex-end' }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <View style={styles.imageStatusContainer}>
                            {/* <Image source={require('../../../assets/images/success.png')} style={styles.image} /> */}
                            <FastImage
                                style={{ width: 300, height: 300 }}
                                source={require('../../../assets/images/Success_Micro_interaction.gif')}
                            />
                            <Text style={[styles.modalText, { color: '#02CB4C' }]}>Xử lý thành công</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.title}>{formattedDate}</Text>
                            <Text style={[styles.title, { marginTop: 10, marginBottom: 5 }]}>📷 Giá trị ảnh</Text>
                            <Text style={{ fontSize: 16, fontWeight: 500 }}>✅ Trở suất: {data[0].R || 'N/A'}</Text>
                            <Text style={{ fontSize: 16, fontWeight: 500, }}>✅ Hiệu điện thế: {data[0].U || 'N/A'}</Text>
                            <TouchableOpacity onPress={onNavigate}>
                                <Text style={[styles.title, { color: '#4EAFE5', padding: 10 }]}>👉 Xem chi tiết tại đây</Text>
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
                            <Image style={{ width: 20, height: 20, alignSelf: 'flex-end' }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <View style={styles.imageStatusContainer}>
                            {/* <Image source={require('../../../assets/images/fail.png')} style={styles.image} /> */}
                            <FastImage
                                // key={`${option}_${key}`} // Use key prop with option and key value
                                style={{ width: 120, height: 120 }}
                                source={require('../../../assets/images/cancel_icon.jpeg')}
                            />
                            <Text style={[styles.modalText, { marginTop: 30 }]}>Xử lý thất bại</Text>
                            <Text style={{ marginBottom: 30 }}>Lỗi ảnh, vui lòng thực hiện lại! </Text>
                            <View style={styles.dateContainer}>
                                <Text style={[styles.title, { paddingBottom: 10, textAlign: 'center' }]}>{formattedDate}</Text>
                                <Text style={{ fontSize: 16, fontWeight: 500, }}>
                                    ❗️Status: {data[0]?.class || 'N/A'}
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: 500 }}>
                                    ❗️Nguyên nhân lỗi: {data[0]?.message 
                                    && Object.keys(PARSE_MESSAGE).includes(data[0]?.message) ? PARSE_MESSAGE[data[0]?.message].reason : data[0]?.message}
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: 500, }}>
                                    🔑 Đề xuất: {data[0]?.message 
                                    && Object.keys(PARSE_MESSAGE).includes(data[0]?.message) ? PARSE_MESSAGE[data[0]?.message].recommend : data[0]?.message}
                                </Text>
                                <TouchableOpacity onPress={onNavigate}>
                                    <Text style={[styles.title, { color: '#4EAFE5', padding: 10 }]}>👉 Xem chi tiết tại đây</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={closePopup}>
                                <Text style={styles.button1}>QUAY VỀ</Text>
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
        width: '95%',
        height: '65%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        justifyContent: 'flex-start', // Align content to the left
        // borderRadius: 20,
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
        alignSelf: 'center',
        paddingTop: 5
    },
    title: {
        color: 'black',
        fontSize: 16,
        // fontFamily: 'Roboto',
        fontWeight: '600',
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
        width: 200,
        height: 50,
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: 15,
        marginTop: 10,
        fontWeight: '900'
    },
    button2: {
        color: '#4EAFE5',
        borderWidth: 1,
        borderColor: '#4EAFE5',
        borderRadius: 7,
        width: 200,
        height: 50,
        fontSize: 11,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 10,
    }
});

export default PopupPage;

