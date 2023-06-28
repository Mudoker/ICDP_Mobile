import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, Dimensions } from 'react-native';

const NavigationMenu = ({ navigation }) => {
    const [isCongCuOpen, setCongCuOpen] = useState(false);
    const [isKpiOpen, setKpiOpen] = useState(false);


    const handleMenuItemPress = (menuItem) => {
        console.log('Selected menu item:', menuItem);
        // Add logic to handle the selected menu item
        navigation.navigate('Dashboard');
    };

    const toggleCongCuDropdown = () => {
        setCongCuOpen(!isCongCuOpen);
    };

    const toggleKpiDropdown = () => {
        setKpiOpen(!isKpiOpen);
    };

    return (
        <View style={styles.container}>
            <View
                animationType="fade"
                transparent={true}
            >
                <TouchableOpacity
                    style={styles.modalBackdrop}
                    activeOpacity={1}
                >
                    <View style={styles.modalContent}>
                    {/* BANNER */}
                        <View style={styles.banner}>
                            <Image style={styles.bannerImage} source={require('../../../assets/images/Rectangle.png')} />
                            <View style={styles.bannerTextContainer}>
                                <Image
                                    source={require('../../../assets/images/iconUser.png')}
                                    style={[styles.iconImage, {
                                        marginTop: 15,
                                        marginLeft: 20,
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50
                                    }]} />
                                <Text style={[styles.bannerText, { marginLeft: 15 }]}>{navigation.getParam('data')?.email}</Text>
                            </View>
                            <Text style={[styles.footNote, { marginTop: -15, marginLeft: 88 }]}>{navigation.getParam('data')?.role}</Text>
                        </View>
                    {/* Selection */}
                        <View style={{ height: Dimensions.get('window').height }}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => handleMenuItemPress('Dashboard')}
                            >
                                <View style={styles.bannerTextContainer}>
                                    <Image source={require('../../../assets/images/hatang_icon.png')} style={styles.iconImage} />
                                    <Text style={[styles.menuItemText, {marginTop:20}]}>Hạ tầng</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => handleMenuItemPress('Dashboard')}
                            >
                                <View style={styles.bannerTextContainer}>
                                    <Image source={require('../../../assets/images/lichtruc.png')} style={styles.iconImage} />
                                    <Text style={styles.menuItemText}>Lịch trực</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => handleMenuItemPress('Dashboard')}
                            >
                                <View style={styles.bannerTextContainer}>
                                    <Image source={require('../../../assets/images/plan.png')} style={styles.iconImage} />
                                    <Text style={styles.menuItemText}>Kế hoạch</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItem, styles.dropdownItem]}
                                onPress={toggleCongCuDropdown}
                            >
                                <View style={styles.dropdownHeader}>
                                    <View style={styles.bannerTextContainer}>
                                        <Image source={require('../../../assets/images/Tools.png')} style={styles.iconImage} />
                                        <Text style={styles.menuItemText}>Công cụ</Text>
                                    </View>
                                    <Image source={require('../../../assets/images/arrow_2.png')} />
                                </View>
                                {isCongCuOpen && (
                                    <View style={styles.dropdownContent}>
                                        <TouchableOpacity style={styles.dropdownMenuItem}>
                                            <Text style={styles.dropdownMenuItemText}> Tổng quan</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItem, styles.dropdownItem]}
                                onPress={toggleKpiDropdown}
                            >
                                <View style={styles.dropdownHeader}>
                                    <View style={styles.bannerTextContainer}>
                                        <Image source={require('../../../assets/images/kpi.png')} style={styles.iconImage} />
                                        <Text style={styles.menuItemText}>KPI</Text>
                                    </View>
                                    <Image source={require('../../../assets/images/arrow_2.png')} />
                                </View>
                                {isKpiOpen && (
                                    <View style={styles.dropdownContent}>
                                        <TouchableOpacity style={styles.dropdownMenuItem}>
                                            <Text style={styles.dropdownMenuItemText}> Cá nhân</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.dropdownMenuItem}>
                                            <Text style={styles.dropdownMenuItemText}> Tham Chiếu</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => handleMenuItemPress('Thông tin')}
                            >
                                <View style={styles.bannerTextContainer}>
                                    <Image source={require('../../../assets/images/user_icon.png')} style={styles.iconImage} />
                                    <Text style={styles.menuItemText}>Thông tin</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.menuItem, { marginTop: 100 }]}
                                onPress={() => handleMenuItemPress('Help')}
                            >
                                <View style={styles.bannerTextContainer}>
                                    <Image source={require('../../../assets/images/help_icon.png')} style={styles.iconImage} />
                                    <Text style={styles.menuItemText}>Help</Text>
                                </View>
                            </TouchableOpacity>
                            {/* Add more menu items as needed */}
                            <View style={styles.footer}>
                                <Image source={require('../../../assets/images/foot_image.png')} style={styles.footerImage} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: '#6C56F5',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        height: '100%',
        backgroundColor: 'rgb(253, 249, 255)',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        borderRightColor: 'rgb(232, 223, 236)',
        borderRightWidth: 1
    },
    menuItem: {
        paddingVertical: 10,
        borderBottomColor: 'rgb(232, 223, 236)',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingRight: 10,
        paddingLeft: 5
    },
    menuItemText: {
        fontSize: 16,
        paddingLeft: 8
    },
    banner: {
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
        width: 240,
        height: 80,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 15,
    },
    bannerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    iconImage: {
        marginRight: 5,
    },
    bannerText: {
        fontSize: 13,
        color: 'white',
        fontWeight: '800',
        letterSpacing: 0.455,
        // fontFamily: 'Neue Haas Grotesk Text Pro',
    },
    dropdownItem: {
        position: 'relative',
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownContent: {
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        // borderTopColor: 'rgb(232, 223, 236)'
    },
    dropdownMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    dropdownMenuItemText: {
        fontSize: 16,
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerImage: {
        width: 181,
        height: 63,
        flexShrink: 0,
    },
    footNote: {
        fontSize: 10,
        // fontFamily: 'Neue Haas Grotesk Text Pro',
        fontWeight: '500',
        letterSpacing: 0.35,
        color: 'white',
    },
});

export default NavigationMenu;
