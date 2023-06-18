import React from 'react';
import OTPTextView from "react-native-otp-textinput";
import Clipboard from '@react-native-clipboard/clipboard';

import { styles } from "./OTP.style";

export default function OTPScreen({ setOtpInput }) {
  const handleOnPaste = (content) => {
    alert('paste detected! content: '.concat(content));
  }

  const handleOnChangeText = async (content) => {
    if (content === '') return;
    console.log(await Clipboard.getString())
    const copiedContent = await Clipboard.getString();
    
    if (copiedContent === '') return;
    const isPasted = content.includes(copiedContent);
    if (isPasted) handleOnPaste(content);
  }

  return (
    <OTPTextView
      handleTextChange={(e) => {setOtpInput(e)}}
      inputCount={6}
      containerStyle={styles.container}
      textInputStyle={styles.text}
    />
  )
}
