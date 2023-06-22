import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { styles } from './Tools.style';
const Tools = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                key={props.id}
            >
                <Text style={styles.cardTitle}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Tools;