import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');
const PhotoSelectionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
      title: 'Select Photo',
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setSelectedImage(response.uri);
      }
    });
  };

  const handleTakePhoto = () => {
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
        setSelectedImage(response.uri);
      }
    });
  };

  return (
    <View>
      <Button title="Choose Photo from Library" onPress={handleChoosePhoto} />
      <Button title="Take a Photo" onPress={handleTakePhoto} />

      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
};

export default PhotoSelectionPage;
