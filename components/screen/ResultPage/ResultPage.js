import React, { useState, useEffect } from 'react';
import Banner from '../Banner/Banner';
import { View, TouchableOpacity, Text, Image } from 'react-native';
// import ImageView from 'react-native-image-view';
import { styles } from './ResultPage.style';

const ResultPage = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [urlPhoto, setUrlPhoto] = useState('');

  const cardData = navigation.getParam('datas')
  const handleCardPress = (cardId, url) => {
    setIsVisible(true);
    setUrlPhoto(url);
  };

  return (
    <View style={styles.container}>
    {/* <TouchableOpacity>
      <ImageView
              images={[
              {
                  source: {uri: urlPhoto},
                  title: 'Result',
                  width: 806,
                  height: 720,
              },
            ]}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            />
            </TouchableOpacity> */}
      <Banner navigation={navigation.getParam('navigation')} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Kết quả </Text>
        <Image style={styles.icon} source={require('../../../assets/images/light_bulb.png')}></Image>
      </View>
      <View style={styles.cardContainer}>
        {cardData.map((card) => (
          <TouchableOpacity
            key={card.id + Date.now()}
            style={[styles.card, { backgroundColor: card.class === 'ok' ? '#01B14F' : '#E60A32' }]}
            onPress={() => handleCardPress(card.id, card.result2)}
          >
            <Image source={{ uri: card.result2 }}
              style={{ width: '100%', height: 150, marginBottom: 7 }} />
            <Text style={styles.cardTitle}>{card.id}</Text>
            <Text style={styles.cardCategory}>Điện trở: {card.R || 'N/A'}</Text>
            <Text style={styles.cardCategory}>Hiệu điện thế: {card.U || 'N/A'}</Text>
            <Text style={styles.cardCategory}>Status: {card.class}</Text>
            <Text style={styles.cardCategory}>Ghi chú: {card.message}</Text>
            <Image style={styles.cardImage} source={{ uri: card.result2 }} />
            {/* <Text>{card.result2}</Text> */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ResultPage;
