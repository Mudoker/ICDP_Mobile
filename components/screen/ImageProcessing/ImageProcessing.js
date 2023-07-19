import React, { useState, useEffect } from 'react';
import { styles } from './ImageProcess.style';
import { View, Button, Image, Touchable, Alert, Permission, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import FormData, { on } from 'form-data';
import Toast from 'react-native-toast-message';
import Banner from '../Banner/Banner';
import Status from './Status';
import Loader from '../Loader/Loader';
import FastImage from 'react-native-fast-image';
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
  const MAX_IMAGES = 10;

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
      selectionLimit: MAX_IMAGES,
      // maxFiles: MAX_IMAGES - selectedImages.length,
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
          console.log(newImages);
          setSelectedImages((prevImages) => [...prevImages, ...newImages]);

          // Trigger API call for each image and delete it after API call
          setOption('process');
          setLoad(true);
          // Set isLoad back to false after 1 second
          setTimeout(() => {
            setLoad(false);
            callAPIVer2(newImages, () => {
              deleteImage(newImages);
            });
            // Toast.show({
            //   type: 'success',
            //   text1: `Kết quả: R = ${resultLCD?.data[0]?.R}; V = ${resultLCD?.data[0]?.U}`,
            // });
          }, 3800);
        }
      } catch (error) {
        console.log(error);
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
        setOption('scan');
        setLoad(true);
        console.log(newImage);
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
  };

  const callAPIVer2 = async (image) => {
    try {
      let data = new FormData();
      if (Array.isArray(image)) {
        image.forEach(element => {
          data.append('image', {
            uri: element?.uri,  // ! Path image
            // type: 'image/jpg',
            name: element?.name + '.jpg'// ! Name image add
          });
        });
      }
      else {
        data.append('image', {
          uri: image?.uri,  // ! Path image
          // type: 'image/jpg',
          name: image?.name + '.jpg' // ! Name image add
        });
      }

      let config = {
        method: 'post',
        url: 'http://1.52.246.101:5000/handle-lcd/handle-lcd-v2',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: data
      };
      const payload = await axios(config);
      data = payload.data.data;
      if (Object.keys(data).length === 0 || payload.data.data[0].class !== 'ok') {
        setStatus('');
        setStatus(false);
        setData(data);
        return;
      } else if (Object.keys(data).length === 1) {
        setStatus('');

        setData(data);
        setStatus(true);
      } else {
        setStatus('');
        setData(data);
        setStatus('ok');
        // format data
        const convertRes = { datas: data, navigation: navigation };
        // Will be updated! 
        // navigation with data
        navigation.navigate('ResultPage', convertRes);
      }
      return payload.data;
    } catch (error) {
      setStatus('');
      setStatus(false);
      console.log('API Error:', error);
    }
  };

  // Function: Delete image
  const deleteImage = (imageToDelete) => {
    // Delete a specific image from selectedImages array
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image.uri !== imageToDelete.uri)
    );
    // Reset status and data when an image is deleted
    setStatus('');
    setData({});
  };

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <Banner navigation={navigation} />
      <Text style={styles.title}>Đọc máy đo</Text>
      <Text style={styles.footNoteTitle}>⚠️ Điều kiện hình ảnh:</Text>
      <Text style={styles.footNote}>✅ Ảnh không quá mờ.</Text>
      <Text style={styles.footNote}>✅ Ảnh không bị chói sáng hoặc quá tối.</Text>
      <Text style={styles.footNote}>✅ Ảnh chụp màn hình máy đo đủ khoảng cách, không quá xa hoặc quá gần.</Text>
      <Text style={styles.footNote}>✅ Ảnh chụp có góc nghiêng không quá 30 độ.</Text>
      {/* Upload IMAGE */}
      <TouchableOpacity
        style={[styles.buttonLibrary, { top: 350 }, selectedImages.length >= MAX_IMAGES && styles.disabledButton]}
        onPress={handleChoosePhoto}
        disabled={selectedImages.length >= MAX_IMAGES}
      >
        <Image style={styles.buttonImage} source={require('../../../assets/images/image_lib.png')}></Image>
        <Text style={styles.buttonText}>
          Thêm ảnh từ thiết bị
        </Text>
      </TouchableOpacity>

      {/* Take a picture */}
      <TouchableOpacity
        style={[styles.buttonLibrary, { top: 500, borderColor: '#c4b93f' }]}
        onPress={handleTakePhoto}
      >
        <Image style={styles.buttonImage} source={require('../../../assets/images/image_photo.png')}></Image>
        <Text style={styles.buttonText}>
          Chụp thông số máy đo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[{ top: 580, boxSizing: 'border-box', position: 'absolute', left: '50%', marginLeft: -124, }]}
      >
        <FastImage
          style={{ width: 250, height: 250, alignSelf: 'center', }}
          source={require('../../../assets/images/robot.gif')}
        />
      </TouchableOpacity>
      {/* Display selected images */}
      {isLoad !== false && <Loader status={isLoad} option={option} />}
      {status !== '' && <Status status={status} data={data} navigation={navigation} isVisible={true} />}
    </View>
  );
};

export default PhotoSelectionPage;
