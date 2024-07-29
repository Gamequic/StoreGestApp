import React, { useContext, useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { DataTable } from 'react-native-paper'; 
import { ScrollView, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { useFocusEffect } from '@react-navigation/native';

import Button from "./../../components/Button";
import FloatingModal from "./../../components/FloatingModal";
import OrderService from './../../services/orders.service';
import FoodService from './../../services/food.service'; // Delete in the future

import ThemeContext from './../../ThemeContext';

import LANG from './../../../lang';

const service = new OrderService();
const foodService = new FoodService(); // Delete in the future

function OrdersRecord ({ navigation }) {
    const [ modalVisible, setModalVisible ] = useState(false);
    // Get current date
    const [ selectedDay, setSelectedDay ] = useState(new Date().toISOString().split('T')[0]);
    const [ ordersUX, setOrdersUX ] = useState();

    const {
        currentLang, setcurrentLang,
        styles
    } = useContext(ThemeContext);

    const UpdateFind = async () => {

        // Function to the format the date
        const formatDateTime = (dateTimeString) => {
            const date = new Date(dateTimeString);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            return `${formattedDate}\n${formattedTime}`;
        };

        const orders = await service.GetRecordByDate(selectedDay);
        let tempOrders = []
        for ( let order in orders ) {
            // This is temporary due the version of backend (working on it)
            // In the future the backend shut provide food data all in one petition
            let tempDecription = ""
            for ( let foodIndex in orders[order].FoodList) {
                const foodID = orders[order].FoodList[foodIndex]
                const food = await foodService.FindOne(foodID)
                tempDecription = tempDecription + `${orders[order].FoodAmount[foodIndex]}${food.IsKg ? "kg " : " "}${food.Name}\n`
            }

            tempOrders.push(
                // <Button key={orders[order].ID} type={'pressable'} onPress={() => {navigation.navigate('OrdersUpdate')}}>
                <Button key={orders[order].ID} type={'pressable'}>
                    <DataTable.Row> 
                        <DataTable.Cell><Text>{formatDateTime(orders[order].CreatedAt)}</Text></DataTable.Cell>
                        <DataTable.Cell>{orders[order].Amount}</DataTable.Cell> 
                        <DataTable.Cell><Text>{tempDecription}</Text></DataTable.Cell>
                    </DataTable.Row>
                </Button>
            )
        }
        setOrdersUX(tempOrders)
    }

    useFocusEffect(
        useCallback(() => {
            UpdateFind();
        }, [])
    );

    // Reload list when selectedDay change
    useEffect(() => {
        if (selectedDay) {
            UpdateFind();
        }
    }, [selectedDay]);


    return (
        <View style={styles.container}>
            <DataTable> 
                <DataTable.Header>
                    <DataTable.Title>{LANG[currentLang].Date}</DataTable.Title> 
                    <DataTable.Title>{LANG[currentLang].Amount}</DataTable.Title> 
                    <DataTable.Title>Articulos</DataTable.Title>
                </DataTable.Header>

                <ScrollView
                    style={StyleSheet.create({ height: '75%'})}
                >
                    {ordersUX}
                </ScrollView>

                <View
                    style={styles.containerH}
                >
                    <Button
                        title={selectedDay}
                        onPress={() => setModalVisible(true)}
                    />
                    <FloatingModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                    >
                        <Calendar
                            onDayPress={day => {
                                setSelectedDay(day.dateString);
                            }}
                            markedDates={{
                                [selectedDay]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                            }}
                        />
                    </FloatingModal>
                </View>
            </DataTable> 
        </View>
    )
}

export default OrdersRecord;