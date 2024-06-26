import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CartesianChart, Line } from "victory-native";

import ThemeContext from '../ThemeContext';
import inter from "./../../assets/Inter-Medium.ttf";
import FoodDeck from './../components/FoodDeck';
import FoodCard from './../components/FoodDeck';

import styles from './../style';
import LANG from './../../lang';

function DashboardScreen() {
  const {
    currentLang, setcurrentLang
  } = useContext(ThemeContext);

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
  }

  const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  }));

  return (
    <View style={ dashStyles.container }>
      <View style={ styles.cardF } >
        <Text style={styles.title}>{LANG[currentLang].Amount + ": 800$"}</Text>
        <View style={dashStyles.verticalContainer}>
          <CartesianChart
            data={DATA}
            xKey="day"
            yKeys={["highTmp"]}
            axisOptions={ inter }
          >
            {({ points }) => (
              <Line points={points.highTmp} color="red" strokeWidth={2.5} />
            )}
          </CartesianChart>
        </View>
      </View>
      <View style={ styles.cardF } >
        <Text style={styles.title}>{LANG[currentLang].TheMostSold}</Text>
        <FoodDeck></FoodDeck>
      </View>
      <View style={ styles.cardF } >
        <Text style={styles.title}>{LANG[currentLang].Orders}</Text>
        <View style={ StyleSheet.create({
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        })}>
          <Text style={[styles.title2, StyleSheet.create({textAlign: 'center', width:'50%'})]}>{LANG[currentLang].OrdersAttended + '\n20'}</Text>
          <Text style={[styles.title2, StyleSheet.create({textAlign: 'center', width:'50%'})]}>{LANG[currentLang].Average + '\n343.5$'}</Text>
        </View>
      </View>
    </View>
  );
}

export default DashboardScreen;
