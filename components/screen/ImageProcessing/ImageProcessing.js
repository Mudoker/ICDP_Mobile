import React, { useState, useEffect } from 'react';
import { styles } from './ImageProcess.style';
import { View, Button, Image, Touchable, Alert, Permission, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import FormData from 'form-data';
import Toast from 'react-native-toast-message';
import Banner from '../Banner/Banner';
import { requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Status from './Status';
import Loader from '../Loader/Loader';
// import MaskLoader, { MaskLoaderType } from 'react-native-mask-loader';
import {
  Text,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

var ImagePicker = require('react-native-image-picker');
const PhotoSelectionPage = ({ navigation }) => {
  const [status, setStatus] = useState('');
  const [option, setOption] = useState('loading');
  const [data, setData] = useState({});
  const [isLoad, setLoad] = useState(false);
  // Array stores selected images from library or camera
  const [selectedImages, setSelectedImages] = useState([]);

  // Maximum number of images can be selected at a time
  const MAX_IMAGES = 5;

  // Function: Choose photo from library
  const handleChoosePhoto = async () => {

    // ImagePicker configuration
    const options = {
      title: 'Select Photo',
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      // Highest quality
      // quality: 1,
      multiple: true,
      selectionLimit: 5,
      maxFiles: MAX_IMAGES - selectedImages.length,
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      try {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          // Add images to selectedImages array
          const newImages = response.assets.map((asset) => ({
            uri: asset.uri,
            // url: './testok.jpg',
            // If File name is not available -> generate a custom file name
            name: asset.fileName || `image_${Date.now()}`,
          }));
          setSelectedImages((prevImages) => [...prevImages, ...newImages]);

          // Trigger API call for each image and delete it after API call
          const resultLCD = await callAPIVer2(newImages);

          console.log(resultLCD);
          Toast.show({
            type: 'success',
            text1: `Kết quả: R = ${resultLCD?.data[0]?.R}; V = ${resultLCD?.data[0]?.U}`,
          });
          // deleteImage(image);
        }
      } catch (error) {

      }

    });
  };

  // Function: Take photo from camera
  const handleTakePhoto = async () => {
    // ImagePicker configuration
    const options = {
      title: 'Take Photo',
      // mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      // includeBase64: true,
      // Highest quality
      // quality: 1,
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {

        // Add image to selectedImages array
        const newImage = {
          uri: response.uri || response.assets[0]?.uri,
          // Custom file name
          name: `image_${Date.now()}`,
        };
        console.log(newImage);
        setOption('scan');
        setLoad(true);
        setSelectedImages((prevImages) => [...prevImages, newImage]);
        // Set isLoad back to false after 1 second
        setTimeout(() => {
          setLoad(false);
          // Trigger API call for the image and delete it after API call
          callAPIVer2(newImage, () => {
            deleteImage(newImage);
          });
        }, 3800);
      }
    });
    // const rq = await request('camera', { type: 'always' });
    // console.log(rq);
    // const granted = await requestMultiple([PERMISSIONS.IOS.CAMERA]);
    // if (granted['ios.permission.CAMERA'] === RESULTS.GRANTED) {
    //   const payload = await ImagePicker.launchCamera(options);
    //   console.log(payload);
    // }
  };

  const callAPIVer2 = async (image) => {
    try {
      let data = new FormData();
      if (Array.isArray(image)) {
        image.forEach(element => {
          data.append('image', {
            uri: element?.uri,  // ! Path image
            type: 'image/jpeg',
            name: element?.name // ! Name image add
          });
        });
      }
      else {
        data.append('image', {
          uri: image?.uri,  // ! Path image
          type: 'image/jpeg',
          name: image?.name // ! Name image add
        });
      }

      let config = {
        method: 'post',
        url: 'http://1.52.246.101:5000/handle-lcd/handle-lcd',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: data
      };
      const payload = await axios(config);
      data = payload.data.data[0];
      if (Object.keys(data).length === 0 || payload.data.data[0].class !== 'ok') {
        // setOption('fail');
        // setLoad(true);
        setStatus(false);
        // setTimeout(() => {
        //   // setLoad(false);
        //   // Trigger API call for the image and delete it after API call
        // }, 3800);
        setData({});
        return;
      }
      // setOption('success');
      // setLoad(true);
      // setTimeout(() => {
      //   setLoad(false);
      //   // Trigger API call for the image and delete it after API call
      // }, 3800);
      setStatus(true);
      setData(data);
      return payload.data
    } catch (error) {
      // setOption('fail');
      // setLoad(true);
      // setTimeout(() => {
      //   setLoad(false);
      //   // Trigger API call for the image and delete it after API call
      // }, 3800);
      setStatus(false);
      console.log('API Error:', error);
    }
  };
  // useEffect(() => {
  //   if (status !== '') {
  //     const timer = setTimeout(() => {
  //       setStatus('');
  //       setData({});
  //     }, 3800);

  //     return () => clearTimeout(timer);
  //   }
  // }, [status]);
  // Function: Delete image
  const deleteImage = (imageToDelete) => {
    // Delete a specific image from selectedImages array
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image.uri !== imageToDelete.uri)
    );
  };

  return (
    <View>
      {/* <Banner navigation={navigation} /> */}
      <Text style={styles.title}>Đọc máy đo</Text>
      <Text style={styles.footNote}>Bạn vui lòng chọn một trong hai để sử dụng hiệu quả.</Text>
      {/* Upload IMAGE */}
      <TouchableOpacity
        style={[styles.buttonLibrary, { top: 350 }, selectedImages.length >= MAX_IMAGES && styles.disabledButton]}
        onPress={handleChoosePhoto}
        disabled={selectedImages.length >= MAX_IMAGES}
      >
        <Image style={styles.buttonImage} source={require('../../../assets/images/image_lib.png')}></Image>
        <Text style={styles.buttonText}>
          Drag-n-Drop to upload
        </Text>
      </TouchableOpacity>

      {/* Take a picture */}
      <TouchableOpacity
        style={[styles.buttonLibrary, { top: 500 }]}
        onPress={handleTakePhoto}
      >
        <Image style={styles.buttonImage} source={require('../../../assets/images/image_photo.png')}></Image>
        <Text style={styles.buttonText}>
          Take a photo
        </Text>
      </TouchableOpacity>
      {/* Display selected images */}
      {isLoad !== false && <Loader status={isLoad} option={option} />}
      {status !== '' && <Status status={status} data={data} navigation={navigation} />}
    </View>
  );
};

export default PhotoSelectionPage;

