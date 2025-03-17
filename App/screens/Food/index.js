import React, { useContext, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import ThemeContext from './../../ThemeContext';

import FoodCard from './../../components/FoodCard';
import Button from './../../components/Button';

import LANG from '../../../lang';

import FoodService from './../../services/food.service';
import PhotoService from './../../services/photos.service';

const service = new FoodService();
const photoService = new PhotoService();

function FoodScreen({ navigation }) {
  const [ foodListUx, setFoodListUx ] = useState();

  const {
    currentLang, setcurrentLang,
    styles
  } = useContext(ThemeContext);

  const UpdateFind = async () => {
    const FoodList = await service.Find()
    let tempFoodListUx = []
    FoodList.forEach((food, index) => {
      tempFoodListUx.push(
        <FoodCard key={food.ID} screen={'FoodUpdate'} name={food.Name} price={food.Amount} isKg={food.IsKg} ID={food.ID} photo={photoService.FindOne(food.Photo)} />
      )
    })
    setFoodListUx(tempFoodListUx)
  }
  
  useFocusEffect(
    useCallback(() => {
      UpdateFind();
    }, [])
  );
  

  return (
    <LinearGradient
      colors={['#0482d6', '#f0f0f0']}
      style={[styles.container, StyleSheet.create({backgroundColor: "#f0f0f0"})]}
    >
        <ScrollView contentContainerStyle={StyleSheet.create({
            flexGrow: 1,
            justifyContent: 'flex-start',
            })}
        >
            <View
                style={StyleSheet.create({
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    justifyContent: 'center',
                    padding: 32,
                })}
            >
              {foodListUx}
            </View>
        </ScrollView>
        <View style={styles.margin}>
          <Button
            title={LANG[currentLang].AddMeal}
            onPress={() => {navigation.navigate('FoodCreate')}}
          />
        </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

export default FoodScreen;