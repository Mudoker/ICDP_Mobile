import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';

const NavigationMenu = ({ navigation }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isCongCuOpen, setCongCuOpen] = useState(false);
    const [isKpiOpen, setKpiOpen] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const handleMenuItemPress = (menuItem) => {
        console.log('Selected menu item:', menuItem);
        // Add logic to handle the selected menu item
        navigation.navigate(menuItem);
    };

    const toggleCongCuDropdown = () => {
        setCongCuOpen(!isCongCuOpen);
    };

    const toggleKpiDropdown = () => {
        setKpiOpen(!isKpiOpen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleMenu}>
                <Text style={styles.buttonText}>Open Menu</Text>
            </TouchableOpacity>

            <Modal
                visible={isMenuVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={toggleMenu}
            >
                <TouchableOpacity
                    style={styles.modalBackdrop}
                    activeOpacity={1}
                    onPress={toggleMenu}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.banner}>
                            <Image style={styles.bannerImage} source={require('../../../assets/images/Rectangle.png')} />
                            <View style={styles.bannerTextContainer}>
                                <Image source={require('../../../assets/images/Ellipse.png')} style={styles.iconImage} />
                                <Text style={styles.bannerText}>Doan Huu Quoc</Text>
                            </View>
                            <Text style={styles.footNote}>Staff FPT Telecom</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => handleMenuItemPress('Dashboard')}
                        >
                            <Text style={styles.menuItemText}>Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => handleMenuItemPress('Dashboard')}
                        >
                            <View style={styles.bannerTextContainer}>
                                <Image source={require('../../../assets/images/hatang_icon.png')} style={styles.iconImage} />
                                <Text style={styles.menuItemText}>Hạ tầng</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => handleMenuItemPress('Dashboard')}
                        >
                            <View style={styles.bannerTextContainer}>
                                <Image source={require('../../../assets/images/lichtruc.png')} style={styles.iconImage} />
                                <Text style={styles.menuItemText}>Lịch trực vận hành</Text>
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
                                        <Text style={styles.dropdownMenuItemText}>Tổng quan</Text>
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
                                        <Text style={styles.dropdownMenuItemText}>Cá nhân</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dropdownMenuItem}>
                                        <Text style={styles.dropdownMenuItemText}>Tham Chiếu</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => handleMenuItemPress('Thông tin cá nhân')}
                        >
                            <View style={styles.bannerTextContainer}>
                                <Image source={require('../../../assets/images/user_icon.png')} style={styles.iconImage} />
                                <Text style={styles.menuItemText}>Thông tin cá nhân</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => handleMenuItemPress('Thông tin cá nhân')}
                        >
                            <View style={styles.bannerTextContainer}>
                                <Image source={require('../../../assets/images/help_icon.png')} style={styles.iconImage} />
                                <Text style={styles.menuItemText}>Help & getting started</Text>
                            </View>
                        </TouchableOpacity>
                        {/* Add more menu items as needed */}
                        <View style={styles.footer}>
                            <Image source={require('../../../assets/images/foot_image.png')} style={styles.footerImage} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
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
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuItemText: {
        fontSize: 16,
    },
    banner: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        width: 257,
        height: 89,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontWeight: '500',
        letterSpacing: 0.455,
        fontFamily: 'Neue Haas Grotesk Text Pro',
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
    },
    dropdownMenuItem: {
        paddingVertical: 5,
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
        fontFamily: 'Neue Haas Grotesk Text Pro',
        fontWeight: 500,
        letterSpacing: 0.35,
        color: 'white',
    },
});

export default NavigationMenu;
