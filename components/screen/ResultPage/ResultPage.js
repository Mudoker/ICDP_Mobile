import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import ImageView from 'react-native-image-view';
import { styles } from './ResultPage.style';

const ResultPage = ({ cardData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [urlPhoto, setUrlPhoto] = useState('');
  

//   const cardData = [
//     {
//         "R": "6.0 Ohm",
//         "U": "13.32  V",
//         "class": "not ok",
//         "id": "ccb63f42341ceb42b20d_2023-06-27-20-35-27",
//         "message": "light",
//         "original": "http://1.52.246.101:5000/get-image-upload/ccb63f42341ceb42b20d_2023-06-27-20-35-27.jpg",
//         "result1": "http://1.52.246.101:5000/get-image-result/output_1_ccb63f42341ceb42b20d_2023-06-27-20-35-27.jpg",
//         "result2": "http://1.52.246.101:5000/get-image-result/output_2_ccb63f42341ceb42b20d_2023-06-27-20-35-27.jpg",
//         "score_confidence": 1
//     },
//     {
//         "R": "6.6 m Ohm",
//         "U": "13.33 V",
//         "class": "ok",
//         "id": "9543d54ddf13004d5902_2023-06-27-20-35-29",
//         "message": "good",
//         "original": "http://1.52.246.101:5000/get-image-upload/9543d54ddf13004d5902_2023-06-27-20-35-29.jpg",
//         "result1": "http://1.52.246.101:5000/get-image-result/output_1_9543d54ddf13004d5902_2023-06-27-20-35-29.jpg",
//         "result2": "http://1.52.246.101:5000/get-image-result/output_2_9543d54ddf13004d5902_2023-06-27-20-35-29.jpg",
//         "score_confidence": 1
//     },
//     {
//         "R": "6.5 m Ohm",
//         "U": "13.33 V",
//         "class": "not ok",
//         "id": "1ed3f7d8fd8622d87b97_2023-06-27-20-35-29",
//         "message": "light",
//         "original": "http://1.52.246.101:5000/get-image-upload/1ed3f7d8fd8622d87b97_2023-06-27-20-35-29.jpg",
//         "result1": "http://1.52.246.101:5000/get-image-result/output_1_1ed3f7d8fd8622d87b97_2023-06-27-20-35-29.jpg",
//         "result2": "http://1.52.246.101:5000/get-image-result/output_2_1ed3f7d8fd8622d87b97_2023-06-27-20-35-29.jpg",
//         "score_confidence": 1
//     },
//     {
//         "R": "5.6 m",
//         "U": ".35 V",
//         "class": "not ok",
//         "id": "04ddded6d4880bd65299_2023-06-27-20-35-30",
//         "message": "light",
//         "original": "http://1.52.246.101:5000/get-image-upload/04ddded6d4880bd65299_2023-06-27-20-35-30.jpg",
//         "result1": "http://1.52.246.101:5000/get-image-result/output_1_04ddded6d4880bd65299_2023-06-27-20-35-30.jpg",
//         "result2": "http://1.52.246.101:5000/get-image-result/output_2_04ddded6d4880bd65299_2023-06-27-20-35-30.jpg",
//         "score_confidence": 1
//     }
// ];

  const handleCardPress = (cardId, url) => {
    setIsVisible(true);
    setUrlPhoto(url);
  };

  return (
    <View style={styles.container}>
      <ImageView
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
            />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Kết quả </Text>
        <Image style={styles.icon} source={require('../../../assets/images/light_bulb.png')}></Image>
      </View>
      <View style={styles.cardContainer}>
        {cardData.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[styles.card, {backgroundColor: card.class === 'ok' ? '#01B14F' : '#E60A32'}]}
            onPress={() => handleCardPress(card.id,  card.result2)}
          >
            <Image source={{ uri: card.result2 }}
              style={{width:'100%', height: 150, marginBottom: 7}} />
            <Text style={styles.cardTitle}>{card.id}</Text>
            <Text style={styles.cardCategory}>Điện trở: {card.R || 'N/A'}</Text>
            <Text style={styles.cardCategory}>Hiệu điện thế: {card.U || 'N/A'}</Text>
            <Text style={styles.cardCategory}>Status: {card.class}</Text>
            <Text style={styles.cardCategory}>Ghi chú: {card.message}</Text>
            <Image style={styles.cardImage} source={{ uri: card.result2 }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ResultPage;
