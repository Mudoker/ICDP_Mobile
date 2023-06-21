import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    buttonLibrary: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: 248,
        height: 120,
        left: '50%',
        top: '50%',
        marginTop: -60,
        marginLeft: -124,
        background: '#F9F8F8',
        borderWidth: 2,
        borderColor: '#2CCDCD',
        borderRadius: 7,
        borderStyle: 'dashed',
    },
    buttonText: {
        position: 'absolute',
        width: 143,
        height: 35,
        left: '50%',
        marginLeft: -71.5,
        top: '85%',
        marginTop: -17.5,
        // fontFamily: 'Neue Haas Grotesk Text Pro',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', // Center the text horizontally
        letterSpacing: 0.05,
        color: '#000000',
    },

    buttonImage: {
        position: 'absolute',
        width: 52,
        height: 52,
        left: '50%',
        marginLeft: -26,
        top: '45%',
        marginTop: -26,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        position: 'absolute',
        width: 146,
        height: 56,
        left: 6,
        top: 39,
        // fontFamily: 'Neue Haas Grotesk Text Pro',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 21,
        lineHeight: 28,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: 0.095,
        color: '#000000',
    },

    footNote: {
        position: 'absolute',
        width: 372,
        height: 20,
        left: 6,
        top: 85,
        // fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 16,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: 0.095,
        color: '#898080',
    },
    header: {
        left: '50%',
        width: 78,
        height: 31,
        marginLeft: -39,
    },

    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 31,
        height: 31,
    },

    navBar: {
        backgroundColor: 'black',
    }
})
