import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import NavPane from '../NavPane/NavPane';

const styles = StyleSheet.create({
    bannerContainer: {
        position: 'relative', // Set the position to absolute
        top: 0,
        width: '100%',
        backgroundColor: '#6C56F5',
        height: 80,
        zIndex: 99, // Set a higher zIndex value to ensure the banner is on top
    },
    settingIcon: {
        position: 'absolute',
        top: '55%',
        left: 0,
        zIndex: 100,
        marginLeft: 10,
    },
    backIcon: {
        position: 'absolute',
        top: '63%',
        right: 0,
        zIndex: 100,
        marginRight: 15
    },
    navPaneContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 99,
    },
    header: {
        left: '50%',
        width: 78,
        height: 31,
    },
});

const Banner = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false);
    const slideAnimation = useState(new Animated.Value(-300))[0];

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        Animated.timing(slideAnimation, {
            toValue: isVisible ? -300 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    const handlePress = (page) => {
        console.log('Page Pressed:', page);
        navigation.navigate('Dashboard');
    };
    return (
        <View style={styles.bannerContainer}>
            <Image style={[styles.settingIcon]} source={require('../../../assets/images/INAS_mobile_logo_2.png')}></Image>

            {/* Menu toggle */}
            <TouchableOpacity onPress={toggleVisibility} style={styles.backIcon}>
            {
                isVisible ? <Image source={require('../../../assets/images/cancel_icon.png')} style={{width: 23, height: 23}}></Image> : 
                <Image source={require('../../../assets/images/nav.png')} style={{width: 23, height: 23}}></Image>
            }
            </TouchableOpacity>
            {/* Will be updated!*/}
            {/* <TouchableOpacity
                style={[styles.backIcon, { backgroundColor: '#F53030', borderRadius: 11, marginTop: 10, marginLeft: 390, width: 22, height: 22 }]}
                onPress={() => handlePress('Dashboard')}>
                <Text style={{ color: 'white', width: 11, position: 'absolute', marginLeft: 5.5 }}>{navigation.getParam('data').email[0]}</Text>
            </TouchableOpacity> */}
            
            {isVisible && (
                <Animated.View
                    style={[styles.navPaneContainer, { transform: [{ translateX: slideAnimation }] }]}>
                    <NavPane navigation={navigation} />
                </Animated.View>
            )}
        </View>
    );
};

export default Banner;
