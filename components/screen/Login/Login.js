import React, { useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import { delay } from '../../../utils/helpers.utils';
import { CountDownText } from 'react-native-countdown-timer-text';
import OTPView from '../OTP/OTPView.js';
import { fetchAPI } from '../../../utils/api.utils';
import { Snackbar } from 'react-native-paper';

// import {AuthContext} from '../Context/AuthContext';
import { styles } from './login.style';
import { ImageBackground } from 'react-native';
export default function Login({ navigation }) {
  const LOGIN_AUTHEN_URL = 'role-management/user/login-authen-2fa';
  const REGISTER_GET_OTP = 'role-management/user/register-authen-2fa';

  const [data, setData] = React.useState({
    username: '',
    token: '',
    checkTextInputChange: false,
    isValidUser: false,
  });

  const [otp, setOtp] = React.useState(false);
  const [getOtp, setGetOtp] = React.useState(false);
  const [otpInput, setOtpInput] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState('');

  // const {signIn} = React.useContext(AuthContext);

  const textInputChange = value => {
    if (value.length !== 0) {
      if (
        value.trim().includes('@fpt.net') ||
        value.trim().includes('@vienthongtin.com') ||
        value.trim().includes('@fpt.com.vn')
      ) {
        setData({
          ...data,
          username: value,
          checkTextInputChange: true,
          isValidUser: true,
        });
      } else {
        setData({
          ...data,
          username: value,
          checkTextInputChange: true,
          isValidUser: false,
        });
      }
    } else {
      setData({
        ...data,
        username: value,
        checkTextInputChange: false,
        isValidUser: false,
      });
    }
  };

  const inputPasswordRef = useRef('txtPassword');
  const onPressLogin = async () => {
    if (!data.isValidUser) {
      setSnackBarText('Invalid Email!');
      setVisible(true);
    } else {
      alert('Login successfully')
      setOtp(prev => !prev)
    };
  };

  const confirmOTP = async () => {
    if (!data.isValidUser) {
      setSnackBarText('Invalid Email!');
      setVisible(true);
    } else if (otpInput.length < 6) {
      setSnackBarText('Invalid OTP!');
      setVisible(true);
    } else {
      const url = `${LOGIN_AUTHEN_URL}/${data.username}/${otpInput}`;
      const res = await fetchAPI(url, null, 'get');
      if (!res) {
        setSnackBarText('Unauthorize! Wrong OTP or email!');
        setVisible(true);
      } else {
        navigation.navigate('Home');
      }
    }
  };

  const onGetOTP = async () => {
    if (!data.isValidUser) {
      setSnackBarText('Invalid Email!');
      setVisible(true);
    } else {
      if (!otp || getOtp) setOtp(prev => !prev);
      setGetOtp(prev => !prev);
      setSnackBarText(
        'An Email has been sent to your Outlook! Please check to get QR Code!',
      );
      setVisible(true);
      const url = `${REGISTER_GET_OTP}/${data.username}`;
      const res = await fetchAPI(url, null, 'get');
      await delay(180_000);
      setGetOtp(prev => !prev);
    }
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <LinearGradient style={styles.backGround}
      colors={['rgba(44, 11, 245, 0.6808)', 'rgba(255, 253, 253, 0.92)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={[styles.container, { paddingTop: 120 }]}>
      {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}> */}
        <Text style={styles.title}>FTEL - KTKT - INF MN</Text>
        <StatusBar barStyle="light-content" />
        
          <TouchableWithoutFeedback
            style={styles.container}
            accessible={true}
            onPress={Keyboard.dismiss}>
            <View style={styles.logoContainer}>
              <View style={styles.wrapLogo}>
                <Image
                  style={styles.logo}
                  source={require('../../../assets/images/INAS_mobile_logo.png')}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.notifyContainer}>
                  Welcome to App ICDP
                </Text>
                <Text style={styles.footNote}>Hướng dẫn đăng nhập hệ thống <Text style={styles.footNoteLink} >Tại đây</Text> </Text>
                <TextInput
                  
                  style={styles.input}
                  placeholder="Email ID"
                  placeholderTextColor="rgb(80, 78, 112)"
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={value => textInputChange(value)}
                  onSubmitEditing={() => inputPasswordRef.current.focus()}
                />
                <Image
                  style={styles.icon} source={require('../../../assets/images/email_icon.png')} />
                <View style={styles.otpContainer}>
                  {otp ? <OTPView setOtpInput={setOtpInput} /> : null}
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={onPressLogin}>
                      ĐĂNG NHẬP
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.helpTextContainer}>
                    <Text style={styles.helpText}><View style={styles.stroke} />Trợ giúp<View style={styles.stroke} /></Text>
                    <Text style={styles.funcText}>GỬI LẠI MÃ OTP</Text>
                    <Text style={styles.funcText}>KHÔNG THỂ ĐĂNG NHẬP?</Text>
                  </View>

                  {/* <TouchableOpacity
                    style={!getOtp ? styles.button : styles.buttonDisabled}
                    disabled={getOtp}
                    onPress={onGetOTP}>
                    <Text style={styles.buttonText}>
                      GET OTP
                      {getOtp ? (
                        <CountDownText
                          countType="seconds"
                          auto={true}
                          afterEnd={() => { }}
                          timeLeft={180}
                          step={-1}
                          startText=""
                          endText=""
                          intervalText={sec => sec + 's'}
                        />
                      ) : null}
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
              <Image style={styles.authorContainer} source={require('../../../assets/images/foot_image.png')}></Image>
              <Snackbar
                visible={visible}
                duration={2000}
                onDismiss={onDismissSnackBar}
                wrapperStyle={{ top: -120 }}
                style={{ borderRadius: 30 }}
                action={{
                  label: 'Ok!',
                  onPress: () => { },
                }}>
                {snackBarText}
              </Snackbar>
            </View>
          </TouchableWithoutFeedback>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    </LinearGradient>
  );
}
