import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from './Tools.style';

const DashboardPage = () => {
  const cardData = [
    { id: 1, title: 'Kế hoạch', category: 'Calendar', image: require('../../../assets/images/calendar_icon.png') },
    { id: 2, title: 'Tổng quan', category: 'Statistics', image: require('../../../assets/images/stat_icon.png') },
    { id: 3, title: 'Thông tin', category: 'KPI', image: require('../../../assets/images/info_icon.png') },
    { id: 4, title: 'Nhiệt độ', category: 'Management', image: require('../../../assets/images/temp_icon.png') },
    { id: 5, title: 'Thiết bị', category: 'Management', image: require('../../../assets/images/device_icon.png') },
    { id: 6, title: 'Nhân sự', category: 'KPI', image: require('../../../assets/images/hr_icon.png') },
    { id: 7, title: 'POP', category: 'Management', image: require('../../../assets/images/pop_icon.png') },
    { id: 8, title: 'Tham chiếu', category: 'KPI', image: require('../../../assets/images/ref_icon.png') },
    { id: 9, title: 'Phân quyền', category: 'Admin', image: require('../../../assets/images/role_icon.png') },
    { id: 10, title: 'Brach-Mb-Btht1', category: '', image: require('../../../assets/images/branch_icon.png') },
  ];

  const handleCardPress = (cardId) => {
    console.log('Card Pressed:', cardId);
  };

  return (
    <View>
      <View style={{ backgroundColor: '#6C56F5', height: 40 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={[styles.backIcon, { marginTop: 5 }]} source={require('../../../assets/images/nav.png')}></Image>
          <Image style={[styles.backIcon, { marginTop: 10, marginLeft: 350, width: 22, height: 22 }]} source={require('../../../assets/images/setting_icon.png')}></Image>
          <TouchableOpacity style={[styles.backIcon, { backgroundColor: '#F53030', borderRadius: 11, marginTop: 10, marginLeft: 390, width: 22, height: 22 }]} onPress={() => navigation.goBack()}>

            {/* 'V' will be replaced with the actual username */}
            <Text style={{ color: 'white', width: 11, position: 'absolute', marginLeft: 5.5 }}>V</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Image style={[styles.header, { marginTop: 5 }]} source={require('../../../assets/images/INAS_mobile_logo_2.png')}></Image>
      </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tools</Text>
          <Image style={styles.icon} source={require('../../../assets/images/light_bulb.png')}></Image>
        </View>
        <View style={styles.cardContainer}>
          {cardData.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              onPress={() => handleCardPress(card.id)}
            >
              <Image source={card.image} />
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardCategory}>{card.category}</Text>
              <Image style={styles.cardImage} source={require('../../../assets/images/arrow.png')}></Image>
            </TouchableOpacity>
          ))}
        </View>
      </View>
  );
};

export default DashboardPage;
