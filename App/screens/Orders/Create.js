import React, { useContext, useState, useEffect, useCallback } from "react";
import { Text, View, TextInput, ScrollView, StyleSheet } from "react-native";
import { DataTable } from 'react-native-paper'; 
import { Calendar } from "react-native-calendars";
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import Button from "../../components/Button";
import FloatingModal from "../../components/FloatingModal";
import FoodCard from "../../components/FoodCard";

import ThemeContext from '../../ThemeContext';
import styles from "../../style";
import FoodService from './../../services/food.service';
import OrderService from './../../services/orders.service';
import PhotoService from './../../services/photos.service';

import LANG from '../../../lang';

const foodService = new FoodService();
const photoService = new PhotoService();
const service = new OrderService();

// Mostrar la lista de cosas y actualizarla

function OrdersCreate({ navigation }) {
    // const [ modalVisibleCalendar, setModalVisibleCalendar ] = useState(false);
    const [ modalVisibleFood, setModalVisibleFood ] = useState(false);
    const [ modalVisibleAddFood, setModalVisibleAddFood ] = useState(false);
    // const [ selectedDay, setSelectedDay ] = useState(new Date().toISOString().split('T')[0]);
    const [ ordersUx, setOrdersUx ] = useState();
    const [ foodListUX, setFoodListUX ] = useState();
    const [ foodListId, setFoodListId ] = useState([]);
    const [ total, setTotal ] = useState(0);

    const {
        currentLang, setcurrentLang
    } = useContext(ThemeContext);

    // Hacer que cuando la presiones se pueda agregar a la lista (todavia no existe esa lista)
    const UpdateFind = async () => {
        const FoodList = await foodService.Find()
        let tempFoodListUx = []
        FoodList.forEach((food, index) => {
          tempFoodListUx.push(
            <FoodCard 
                key={food.ID}
                name={food.Name}
                price={food.Amount}
                isKg={food.IsKg}
                ID={food.ID} 
                list={foodListId}
                photo={photoService.FindOne(food.Photo)}
                setList={setFoodListId}
                callback={handleFoodListId}
            />
          )
        })
        setFoodListUX(tempFoodListUx)
      }

    useFocusEffect(
        useCallback(() => {
            UpdateFind();
        }, [])
    );

    const handleFoodListId = () => {
        let tempOrdersUx = [];
        let tempTotal = 0;
        foodListId.forEach((food, index) => {
            tempOrdersUx.push(
                // <Button type={'pressable'} onPress={() => {setModalVisibleFood(true)}}>
                <Button type={'pressable'} key={food.ID}>
                    <DataTable.Row> 
                        <DataTable.Cell>{food.Name}</DataTable.Cell>
                        <DataTable.Cell>{food.Amount}{food.IsKg ? "kg" : " unit"}</DataTable.Cell> 
                        <DataTable.Cell>{food.Price}</DataTable.Cell>
                    </DataTable.Row>
                </Button>
            )
            tempTotal = Number(tempTotal) + Number(food.Price)
        })
        setOrdersUx(tempOrdersUx);
        setTotal(tempTotal);
    }

    const handleCreate = () => {
        service.Create({ Amount: Number(total), foodListId });
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {/* <Text>{LANG[currentLang].Date}</Text>
            <Button
                title={selectedDay}
                onPress={() => setModalVisibleCalendar(true)}
            />
            <FloatingModal
                visible={modalVisibleCalendar}
                onClose={() => setModalVisibleCalendar(false)}
            >
                <Calendar
                    onDayPress={day => {
                        setSelectedDay(day.dateString);
                        console.log(day.dateString);
                    }}
                    markedDates={{
                        [selectedDay]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                    }}
                />
            </FloatingModal> */}
            
            <DataTable> 
                <DataTable.Header>
                    <DataTable.Title>{LANG[currentLang].Name}</DataTable.Title> 
                    <DataTable.Title>{LANG[currentLang].Amount}</DataTable.Title> 
                    <DataTable.Title>{LANG[currentLang].Price}</DataTable.Title>
                </DataTable.Header>

                <ScrollView
                    style={StyleSheet.create({ height: '45%'})}
                >
                    {ordersUx}
                    <FloatingModal
                        visible={ modalVisibleFood }
                        onClose={() => setModalVisibleFood(false)}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder={LANG[currentLang].Price}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={LANG[currentLang].Amount}
                        />
                        <Button
                            title={LANG[currentLang].Delete}
                        />
                        <View style={styles.margin} />
                    </FloatingModal>

                </ScrollView>
            </DataTable> 

            <Button
                title={LANG[currentLang].AddMeal}
                onPress={() => setModalVisibleAddFood(true)}
            />
            <FloatingModal
                visible={modalVisibleAddFood}
                onClose={() => setModalVisibleAddFood(false)}
            >
                <ScrollView contentContainerStyle={StyleSheet.create({
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                })}>
                    <View
                        style={StyleSheet.create({
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                        })}
                    >
                        {foodListUX}
                    </View>
                </ScrollView>
            </FloatingModal>

            <Text style={StyleSheet.create({ fontSize: 32, margin: 24 })}>{LANG[currentLang].Price + ": " + total + "$"}</Text>

            <View style={styles.containerH}>
                <Button onPress={() => {navigation.goBack()}} title={LANG[currentLang].Cancel} />
                <View style={styles.margin} />
                <Button onPress={handleCreate} title={ LANG[currentLang].GenerateOrder} />
            </View>
        </View>
    )
}

export default OrdersCreate;