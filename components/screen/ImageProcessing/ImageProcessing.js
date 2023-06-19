import React, { useState } from 'react';
import { styles } from './ImageProcess.style';
import { View, Button, Image, Touchable } from 'react-native';
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
const PhotoSelectionPage = () => {

  // Array luu tru cac anh da chon
  const [selectedImages, setSelectedImages] = useState([]);

  // Toi da 5 anh
  const MAX_IMAGES = 5;

  // Chon anh tu thu vien
  const handleChoosePhoto = () => {

    // cau hinh cho ImagePicker
    const options = {
      title: 'Select Photo',
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
      multiple: true,
      maxFiles: MAX_IMAGES - selectedImages.length,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {

        // Them anh vao mang selectedImages
        const newImages = response.assets.map((asset) => ({
          uri: asset.uri,

          // Ten anh la image_ + thoi gian hien tai (neu khong co ten)
          name: asset.fileName || `image_${Date.now()}`,
        }));
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);

        // Goi API cho tung anh va xoa anh sau khi goi API
        newImages.forEach((image) => {
          callAPI(image, () => {
            deleteImage(image);
          });
        });
      }
    });
  };

  // Chup anh
  const handleTakePhoto = () => {

    // cau hinh cho ImagePicker
    const options = {
      title: 'Take Photo',
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {

        // Them anh vao mang selectedImages
        const newImage = {
          uri: response.uri,
          name: `image_${Date.now()}`,
        };
        setSelectedImages((prevImages) => [...prevImages, newImage]);

        // Goi API cho anh va xoa anh sau khi goi API
        callAPI(newImage, () => {
          deleteImage(newImage);
        });
      }
    });
  };

  // Goi API
  const callAPI = async (image, callback) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        // Cac file anh cho phep: jpeg, png, jpg
        type: 'image/jpeg' || 'image/png' || 'image/jpg',
        name: image.name,
      });

      // Goi API
      const response = await fetch('http://1.52.246.101:5000/handle-lcd/handle-lcd', {
        method: 'POST',
        body: formData,
      });

      // Lay ket qua tra ve tu API
      const data = await response.json();
      console.log('API Response:', data);

      // Goi callback
      if (typeof callback === 'function') {
        callback();
      }
    } catch (error) {
      console.log('API Error:', error);
    }
  };

  // Xoa anh
  const deleteImage = (imageToDelete) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image.uri !== imageToDelete.uri)
    );
  };

  return (
    <View>
      <View style={{backgroundColor: '#6C56F5', height:40}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={[styles.backIcon, {marginTop:5}]} source={require('../../../assets/images/nav.png')}></Image>
          <Image style={[styles.backIcon, {marginTop:10,marginLeft: 350, width:22, height:22}]} source={require('../../../assets/images/setting_icon.png')}></Image>
          <TouchableOpacity style={[styles.backIcon, {backgroundColor:'#F53030', borderRadius: 11,marginTop:10,marginLeft: 390, width:22, height:22}]} onPress={() => navigation.goBack()}> 
            <Text style={{color:'white', width:11 ,position:'absolute', marginLeft: 5.5}}>V</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Image style={[styles.header, {marginTop:5}]} source={require('../../../assets/images/INAS_mobile_logo_2.png')}></Image>
      </View>
      <Text style={styles.title}>Đọc máy đo</Text>
      <Text style={styles.footNote}>Bạn vui lòng chọn một trong hai để sử dụng hiệu quả.</Text>
      <TouchableOpacity
        style={[styles.buttonLibrary, {top:350} ,selectedImages.length >= MAX_IMAGES && styles.disabledButton]}
        onPress={handleChoosePhoto}
        disabled={selectedImages.length >= MAX_IMAGES}
      >
        <Image style={styles.buttonImage} source={require('../../../assets/images/image_lib.png')}></Image>
        <Text style={styles.buttonText}>
          Drag-n-Drop to upload
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonLibrary, {top: 500}]}
        onPress={handleTakePhoto}
      >
        <Image style={styles.buttonImage} source={require('../../../assets/images/image_photo.png')}></Image>
        <Text style={styles.buttonText}>
          Take a photo
        </Text>
      </TouchableOpacity>

      {/* Show selected images
      {selectedImages.map((image) => (
        <Image
          key={image.uri}
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      ))} */}
    </View>
  );
};

export default PhotoSelectionPage;
