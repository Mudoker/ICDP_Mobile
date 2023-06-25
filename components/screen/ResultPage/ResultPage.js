import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Animated } from 'react-native';
import Banner from '../Banner/Banner';
import { styles } from './ResultPage.style';

const ResultPage = ({ navigation, data }) => {
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

  const cardData = [
    { id: 1, title: 'Image 1', data: { R: navigation.getParam('image').R, U: navigation.getParam('image').U }, imageUri: navigation.getParam('image').original },
    // Rest of the cardData array...
  ];

  const handleCardPress = (cardId) => {
    // format data
    const convertRes = { data: navigation.getParam('data') };
    // Will be updated!
    // navigation with data
    navigation.navigate('PhotoSelectionPage', convertRes);
  };

  return (
    <View style={styles.container}>
      <Banner navigation={navigation} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Kết quả</Text>
        <Image style={styles.icon} source={require('../../../assets/images/light_bulb.png')}></Image>
      </View>
      <View style={styles.cardContainer}>
        {cardData.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => handleCardPress(card.id)}
          >
            <Image source={{ uri: card.imageUri }} />
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardCategory}>{card.data.R}|{card.data.U}</Text>
            <Image style={styles.cardImage} source={{ uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw2XDKhwCwWUdL089wcw279J&ust=1687783603537000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKD4sIK63v8CFQAAAAAdAAAAABAE' }} />
            <Text>{navigation.getParam('image').result2}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ResultPage;
