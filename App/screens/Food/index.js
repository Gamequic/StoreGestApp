import React, { useContext, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as base64 from 'base64-js';

import ThemeContext from './../../ThemeContext';

import FoodCard from './../../components/FoodCard';
import Button from './../../components/Button';

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
    <View style={styles.container}>
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
                })}
            >
              {foodListUx}
            </View>
        </ScrollView>
        <View style={styles.margin}>
          <Button
            title={'Agregar comida'}
            onPress={() => {navigation.navigate('FoodCreate')}}
          />
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default FoodScreen;