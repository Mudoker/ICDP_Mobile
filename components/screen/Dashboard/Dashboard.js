import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Animated, ScrollView } from 'react-native';
import { styles } from './Tools.style';
import Banner from '../Banner/Banner';
const DashboardPage = ({ navigation }) => {
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
    { id: 1, title: 'Kế hoạch', category: 'Calendar', image: require('../../../assets/images/calendar_icon.png') },
    { id: 2, title: 'Tổng quan', category: 'Statistics', image: require('../../../assets/images/stat_icon.png') },
    { id: 3, title: 'Thông tin', category: 'KPI', image: require('../../../assets/images/info_icon.png') },
    { id: 4, title: 'Nhiệt độ', category: 'Management', image: require('../../../assets/images/temp_icon.png') },
    { id: 5, title: 'Thiết bị', category: 'Management', image: require('../../../assets/images/device_icon.png') },
    { id: 6, title: 'Tool AI', category: 'Đọc máy đo', image: require('../../../assets/images/ref_icon.png') },
    { id: 7, title: 'POP', category: 'Management', image: require('../../../assets/images/pop_icon.png') },
    { id: 8, title: 'Tham chiếu', category: 'KPI', image: require('../../../assets/images/hr_icon.png') },
    { id: 9, title: 'Phân quyền', category: 'Admin', image: require('../../../assets/images/role_icon.png') },
  ];

  const handleCardPress = (cardId) => {
    console.log('Card ID: ', cardId)
    // format data
    const convertRes = {data : navigation.getParam('data')};
    // Will be updated! 
    // navigation with data
    navigation.navigate('PhotoSelectionPage',convertRes);
    
  };

  return (
    <View style={styles.container}>
      <Banner navigation={navigation}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Công cụ nổi bật </Text>
        <Image style={styles.icon} source={require('../../../assets/images/light_bulb.png')}></Image>
      </View>
      {/* Center align card */}
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
      style={styles.scrollDashboard}>
      <View style={styles.cardContainer}>
        {cardData.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => handleCardPress(card.id)}
          >
            <Image source={card.image} style={{width: 30, height: 30}}/>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardCategory}>{card.category}</Text>
            <Image style={styles.cardImage} source={require('../../../assets/images/arrow.png')}></Image>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>
    </View>
    
  );
};

export default DashboardPage;
