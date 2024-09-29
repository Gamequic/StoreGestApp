import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { CartesianChart, Line } from 'victory-native';

import ThemeContext from '../ThemeContext';
import inter from './../../assets/Inter-Medium.ttf';
import FoodDeck from './../components/FoodDeck';

import MoneyService from './../services/money.service';
import OrdersService from './../services/orders.service';

import styles from './../style';
import LANG from './../../lang';

const moneyService = new MoneyService();
const ordersService = new OrdersService();

function DashboardScreen() {
  const { currentLang } = useContext(ThemeContext);

  const [DATA, setDATA] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [ordersNumber, setOrdersNumber] = useState(0);
  const [average, setAverage] = useState(0);
  const [productData, setProductData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const dashStyles = {
    container: {
      flex: 1,
    },
    verticalContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    leftView: {
      flex: 1,
    },
  };

  const getDates = (date, days) => {
    return Array.from({ length: days }, (_, i) => {
      let pastDate = new Date(date.getTime() - i * 86400000);
      return pastDate.toISOString().split('T')[0];
    });
  };

  const updateGraph = async () => {
    try {
      setLoading(true);

      // Get a list of dates
      const currentDate = new Date();
      let datesList = getDates(currentDate, 10);

      // Get the data from the server
      const data = await moneyService.GetRecordByDateRange(datesList[datesList.length - 1], datesList[0]);

      // Process the data to show on the graph
      let daysWithOrders = data.map((record, index) => ({
        index: index,
        date: formatDate(record.CreatedAt),
        record: record,
      }));

      // Check which dates have orders
      const tempDATA = [];
      let index = 0;
      for (let i = datesList.length - 1; i >= 0; i--) {
        const date = datesList[i];
        const foundOrder = daysWithOrders.find(order => order.date === date);
        if (foundOrder) {
          tempDATA.push({
            day: index,
            highTmp: foundOrder.record.Amount,
          });
        } else {
          tempDATA.push({
            day: index,
            highTmp: 0,
          });
        }
        index++;
      }
      setDATA(tempDATA);

    } catch (error) {
      console.error('Error updating dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format the date
  const formatDate = isoString => isoString.split('T')[0];

  const updateCurrent = async () => {
    try {
      const LastOne = await moneyService.FindLastOne();
      if (LastOne != 'No data for now') {
        setCurrent(LastOne.Current);
      } else {
        // setCurrent(0);
      }
    } catch (error) {
      console.error('Error updating current:', error);
    }
  };

  const updateOrders = async () => {
    try {
      // Get a list of dates
      const currentDate = new Date();
      let datesList = getDates(currentDate, 10);

      // Get the data from the server
      const data = await ordersService.statistics(datesList[datesList.length - 1], datesList[0]);

      setProductData(data.Products);
      setAverage(data.Average);
      setOrdersNumber(data.OrdersNumber);
    } catch (error) {
      console.error('Error updating orders:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([updateCurrent(), updateGraph(), updateOrders()]);
      setDataLoaded(true);
    };

    fetchData();
  }, []);

  if (loading || !dataLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={dashStyles.container}>
      <View style={styles.cardF}>
        <Text style={styles.title}>{LANG[currentLang].Amount + ': ' + current + '$'}</Text>
        <View style={dashStyles.verticalContainer}>
          <CartesianChart
            data={DATA}
            xKey="day"
            yKeys={['highTmp']}
            axisOptions={inter}
          >
            {({ points }) => (
              <Line points={points.highTmp} color="red" strokeWidth={2.5} />
            )}
          </CartesianChart>
        </View>
      </View>
      <View style={styles.cardF}>
        <Text style={styles.title}>{LANG[currentLang].TheMostSold}</Text>
        <FoodDeck productData={productData} />
      </View>
      <View style={styles.cardF}>
        <Text style={styles.title}>{LANG[currentLang].Orders}</Text>
        <View style={StyleSheet.create({
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        })}>
          <Text style={[styles.title2, StyleSheet.create({ textAlign: 'center', width: '50%' })]}>
            {LANG[currentLang].OrdersAttended + '\n' + ordersNumber}
          </Text>
          <Text style={[styles.title2, StyleSheet.create({ textAlign: 'center', width: '50%' })]}>
            {LANG[currentLang].Average + '\n' + average + '$'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default DashboardScreen;
