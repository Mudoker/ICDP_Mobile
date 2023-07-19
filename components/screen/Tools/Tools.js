import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, TouchableOpacity, Image, Modal, PanResponder, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
const [isBaotriOpen, setBaoTriOpen] = useState(false);
const [isTKOpen, setTKOpen] = useState(false);
const [isDiDoiOpen, setDiDoiOpen] = useState(false);
const [isThayTheOpen, setThayTheOpen] = useState(false);
const Tools = ({ addPlanModal }) => {
    return (
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableWithoutFeedback onPress={() => { }}>
                    <View style={{ backgroundColor: '#fff', padding: 10, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderColor: 'grey', borderWidth: 3 }}>
                        <ScrollView style={{ maxHeight: 700, minHeight: 400 }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'grey', width: 66, height: 5, borderRadius: 10, marginBottom: 5 }}></View>
                                <Text style={{ fontSize: 20, color: 'black', fontFamily: 'SF UI Text', fontWeight: 600 }}>
                                    Add New Plan
                                </Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={[styles.menuItem, styles.dropdownItem]}
                                    onPress={toggleBaoTriDropdown}
                                >
                                    <View style={styles.dropdownHeader}>
                                        <View style={styles.bannerTextContainer}>
                                            <Image source={require('../../../assets/images/baotri_icon.png')} style={styles.iconImage} />
                                            <Text style={styles.menuItemText}>Bảo Trì</Text>
                                        </View>
                                        <Image source={require('../../../assets/images/arrow_2.png')} />
                                    </View>
                                    {isBaotriOpen && (
                                        <View style={styles.dropdownContent}>
                                            <TouchableOpacity style={styles.dropdownMenuItem} onPress={("Reboot POP")}>
                                                <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                <Text style={styles.dropdownMenuItemText}> Reboot POP</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.menuItem, styles.dropdownItem]}
                                    onPress={toggleTKDropdown}
                                >
                                    <View style={styles.dropdownHeader}>
                                        <View style={styles.bannerTextContainer}>
                                            <Image source={require('../../../assets/images/tk_icon.png')} style={styles.iconImage} />
                                            <Text style={styles.menuItemText}>Triển khai mới</Text>
                                        </View>
                                        <Image source={require('../../../assets/images/arrow_2.png')} />
                                    </View>
                                    {isTKOpen && (
                                        <View style={styles.dropdownContent}>
                                            <TouchableOpacity style={styles.dropdownMenuItem} onPress={addPlanModal("Cấu hình OLT mới")}>
                                                <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                <Text style={styles.dropdownMenuItemText}> Cấu hình OLT mới</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.dropdownMenuItem} onPress={addPlanModal("Cấu hình POP mới")}>
                                                <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                <Text style={styles.dropdownMenuItemText}> Cấu hình POP mới</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.dropdownMenuItem} onPress={addPlanModal("UP SWITCH FTI")}>
                                                <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                <Text style={styles.dropdownMenuItemText}> UP SWITCH FTI</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.dropdownMenuItem} onPress={addPlanModal("Cấu hình SW CE")}>
                                                <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                <Text style={styles.dropdownMenuItemText}> Cấu hình SW CE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.menuItem, styles.dropdownItem]}
                                    onPress={addPlanModal}
                                >
                                    <View style={styles.dropdownHeader}>
                                        <View style={styles.bannerTextContainer}>
                                            <Image source={require('../../../assets/images/didoi_icon.png')} style={styles.iconImage} />
                                            <Text style={styles.menuItemText}>Di dời</Text>
                                        </View>
                                        <Image source={require('../../../assets/images/arrow_2.png')} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.menuItem, styles.dropdownItem]}
                                    onPress={toggleThayTheDropdown}
                                >
                                    <View style={styles.dropdownHeader}>
                                        <View style={styles.bannerTextContainer}>
                                            <Image source={require('../../../assets/images/thaythe_icon.png')} style={styles.iconImage} />
                                            <Text style={styles.menuItemText}>Thay thế</Text>
                                        </View>
                                        <Image source={require('../../../assets/images/arrow_2.png')} />
                                    </View>
                                    {isThayTheOpen && (
                                        <View style={styles.dropdownContent}>
                                            <TouchableOpacity style={styles.dropdownMenuItem} onPress={addPlanModal("Thay thế SW CE")}>
                                                <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                <Text style={styles.dropdownMenuItemText}> Thay thế SW CE</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.dropdownMenuItem} onPress={addPlanModal("Thay thế OLT")}>
                                                <Image source={require('../../../assets/images/options_icon.png')}></Image>
                                                <Text style={styles.dropdownMenuItemText}> Thay thế OLT</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                            {/* Add more options as needed */}
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    )
}
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
        borderBottomWidth: 0.8,
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
        borderTopWidth: 0.8,
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
export default Tools;