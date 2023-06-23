import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import NavPane from '../NavPane/NavPane';

const styles = StyleSheet.create({
    bannerContainer: {
        position: 'absolute', // Set the position to absolute
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#6C56F5',
        height: 40,
        zIndex: 9999, // Set a higher zIndex value to ensure the banner is on top
    },
    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 31,
        height: 31,
    },
    navPaneContainer: {
        position: 'absolute',
        top: 40,
        left: 0,
        zIndex: 9998, // Set a lower zIndex value for the NavPane
    },
    header: {
        left: '50%',
        width: 78,
        height: 31,
        marginLeft: -39,
    },
});

const Banner = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(true);
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
            <TouchableOpacity onPress={toggleVisibility}>
                <Image style={[styles.backIcon, { marginTop: 5 }]} source={require('../../../assets/images/nav.png')}></Image>
            </TouchableOpacity>
            <Image style={[styles.backIcon, { marginTop: 10, marginLeft: 350, width: 22, height: 22 }]} source={require('../../../assets/images/setting_icon.png')}></Image>
            {/* Will be updated!*/}
            <TouchableOpacity style={[styles.backIcon, { backgroundColor: '#F53030', borderRadius: 11, marginTop: 10, marginLeft: 390, width: 22, height: 22 }]} onPress={() => handlePress('Dashboard')}>
                {/* 'V' will be replaced with the actual username */}
                <Text style={{ color: 'white', width: 11, position: 'absolute', marginLeft: 5.5 }}>{navigation.getParam('data').email[0]}</Text>
            </TouchableOpacity>
            <Image style={[styles.header, { marginTop: 5 }]} source={require('../../../assets/images/INAS_mobile_logo_2.png')}></Image>
            
            {isVisible && (
                <Animated.View style={[styles.navPaneContainer ,{ transform: [{ translateX: slideAnimation }] }]}>
                    <NavPane navigation={navigation} />
                </Animated.View>
            )}
        </View>
    );
};

export default Banner;
