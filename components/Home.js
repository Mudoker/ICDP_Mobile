import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import axios from 'axios';

export default function Login() {
  const [isLoading, setLoading] = useState(true);
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);

  // fetch data
  useEffect(() => {
    const getChartTotalSC = async () => {
      try {
        const data = await axios.get(
          'http://172.27.17.68:8000/v1/dashboard/chart-so-luong-su-co-khg-ah-tg-xlsc/weekly/_total_su_co?queue=0',
        );
        const barPayload = data.data.payload.data.map(item => {
          return {
            value: item[1],
            label: item[0],
          };
        });
        setBarData(barPayload);

        const lineData = data.data.payload.data.map(item => {
          return {
            value: item[1],
            dataPointText: item[0],
          };
        });

        setLineData(lineData);
        setLoading(false);
        return data.data;
      } catch (error) {
        return [];
      }
    };
    getChartTotalSC();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.overviewTitile}>Overview Infrastructure</Text>
      <View style={styles.containerChart}>
        <Text
          style={{color: 'blue', fontSize: 17, marginTop: 5, marginBottom: 10}}>
          Só lượng Sự cố toàn Miền Nam theo Tháng
        </Text>
        {!isLoading ? (
          <BarChart
            frontColor={'#177AD5'}
            data={barData}
            width={340}
            barWidth={5}
            barBorderRadius={0}
            yAxisThickness={1}
            xAxisThickness={1}
            noOfSections={5}
            backgroundColor={'#e6f7ff'}
            showFractionalValues
            showYAxisIndices
            showXAxisIndices
            isAnimated
            labelWidth={50}
            rotateLabel={350}
          />
        ) : null}
        <Text
          style={{
            color: 'blue',
            fontSize: 17,
            marginTop: 35,
            marginBottom: 10,
          }}>
          Só lượng Sự cố toàn Miền Nam theo Qúy
        </Text>
        <View style={{paddingTop: 20}}>
          <LineChart
            width={340}
            data={lineData}
            spacing={22}
            textShiftY={-8}
            textShiftX={-10}
            textFontSize={13}
            thickness={5}
            yAxisColor="#0BA5A4"
            xAxisColor="black"
            backgroundColor={'#e6f7ff'}
            color="#0BA5A4"
            showFractionalValues
            showYAxisIndices
            showXAxisIndices
            isAnimated
            labelWidth={50}
            rotateLabel={350}
            noOfSections={5}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overviewTitile: {
    width: '100%',
    textAlign: 'center',
    color: 'orange',
    fontWeight: '700',
    fontSize: 27,
    marginTop: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerChart: {
    width: '100%',
    left: '1%',
    right: '1%',
  },
});
