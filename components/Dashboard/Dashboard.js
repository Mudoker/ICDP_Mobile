import { View } from 'react-native'

export default function Dashboard() {
    return
    (
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={[styles.backIcon, { marginTop: 5 }]} source={require('../../../assets/images/nav.png')}></Image>
                <Image style={[styles.backIcon, { marginTop: 10, marginLeft: 350, width: 22, height: 22 }]} source={require('../../../assets/images/setting_icon.png')}></Image>
                <TouchableOpacity style={[styles.backIcon, { backgroundColor: '#F53030', borderRadius: 11, marginTop: 10, marginLeft: 390, width: 22, height: 22 }]} onPress={() => navigation.goBack()}>

                    {/* 'V' will be replaced with the actual username */}
                    <Text style={{ color: 'white', width: 11, position: 'absolute', marginLeft: 5.5 }}>V</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}