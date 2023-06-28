import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import NavPane from '../NavPane/NavPane';

const styles = StyleSheet.create({
    bannerContainer: {
        position: 'relative', // Set the position to absolute
        top: 0,
        width: '100%',
        backgroundColor: '#6C56F5',
        height: 85,
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
        top: '65%',
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
    console.log('navigation banner', navigation);
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
                isVisible ? <Image style={{height: 21, width: 21}} source={require('../../../assets/images/cancel_icon.png')}></Image> : 
                <Image style={{height: 23, width: 23}} source={require('../../../assets/images/nav.png')}></Image>
            }
            </TouchableOpacity>
            
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
