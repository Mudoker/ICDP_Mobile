import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import { View, TouchableOpacity, Text, Image, ImageView } from 'react-native';
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

  const onCancel = () => {
    navigation.navigate('PhotoSelectionPage')
  }
  return (
    <View style={styles.container}>
      {/* <ImageView
              images={[
              {
                  source: {uri: urlPhoto},
                  title: 'Result',
                  width: 806,
                  height: 720,
              },
            ]}
            isVisible={isVisible ? true : false}
            onClose={() => { setIsVisible(false) }}
            /> */}
      <Banner navigation={navigation.getParam('navigation')} />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Kết quả </Text>
        <Image style={styles.icon} source={require('../../../assets/images/light_bulb.png')}></Image>
        <TouchableOpacity onPress={onCancel} style={{ position: 'absolute', right: 10, top: 10 }}>
          <Image style={{ width: 30, height: 30 }} source={require('../../../assets/images/cancel.png')} />
        </TouchableOpacity>
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
