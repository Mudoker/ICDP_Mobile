import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import { View, TouchableOpacity, Text, Image, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { styles } from './ResultPage.style';

const ResultPage = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [urlPhoto, setUrlPhoto] = useState('');

  const cardData = navigation.getParam('datas');

  const handleCardPress = (cardId, url) => {
    setIsVisible(true);
    setUrlPhoto(url);
  };

  const onCancel = () => {
    navigation.navigate('PhotoSelectionPage');
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal visible={isVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Image source={{ uri: urlPhoto }} style={{ width: 350, height: 350 }} />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Banner navigation={navigation.getParam('navigation')} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Kết quả</Text>
        <Image style={styles.icon} source={require('../../../assets/images/light_bulb.png')} />
        <TouchableOpacity onPress={onCancel} style={{ position: 'absolute', right: 10, top: 10 }}>
          <Image style={{ width: 20, height: 20 }} source={require('../../../assets/images/cancel.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView>

      <View style={styles.cardContainer}>
        {cardData.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: card.class === 'ok' ? '#01B14F' : '#E60A32' }]}
            onPress={() => handleCardPress(card.id, card.result2)}
          >
            <Image source={{ uri: card.result2 }} style={{ width: '100%', height: 150, marginBottom: 7 }} />
            <Text style={styles.cardTitle}>{card.id}</Text>
            <Text style={styles.cardCategory}>Điện trở: {card.R || 'N/A'}</Text>
            <Text style={styles.cardCategory}>Hiệu điện thế: {card.U || 'N/A'}</Text>
            <Text style={styles.cardCategory}>Status: {card.class}</Text>
            <Text style={styles.cardCategory}>Ghi chú: {card.message}</Text>
            <Image style={styles.cardImage} source={{ uri: card.result2 }} />
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>

    </View>
  );
};

export default ResultPage;
