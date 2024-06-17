import React, { useContext, useState } from "react";
import { Text, View, TextInput, ScrollView, StyleSheet } from "react-native";
import { DataTable } from 'react-native-paper'; 
import { Calendar } from "react-native-calendars";
import { useRoute } from '@react-navigation/native';

import Button from "../../components/Button";
import FloatingModal from "../../components/FloatingModal";
import FoodCard from "../../components/FoodCard";

import ThemeContext from '../../ThemeContext';
import styles from "../../style";

import LANG from '../../../lang';

function OrdersUpdate({ navigation }) {
    const [ modalVisibleCalendar, setModalVisibleCalendar ] = useState(false);
    const [ modalVisibleFood, setModalVisibleFood ] = useState(false);
    const [ modalVisibleAddFood, setModalVisibleAddFood ] = useState(false);
    const [ selectedDay, setSelectedDay ] = useState(new Date().toISOString().split('T')[0]);

    const {
        currentLang, setcurrentLang
    } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <Text>{LANG[currentLang].Date}</Text>
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
            </FloatingModal>
            
            <DataTable> 
                <DataTable.Header>
                    <DataTable.Title>{LANG[currentLang].Name}</DataTable.Title> 
                    <DataTable.Title>{LANG[currentLang].Amount}</DataTable.Title> 
                    <DataTable.Title>{LANG[currentLang].Price}</DataTable.Title>
                </DataTable.Header>

                <ScrollView
                    style={StyleSheet.create({ height: '45%'})}
                >
                    <Button type={'pressable'} onPress={() => {setModalVisibleFood(true)}}>
                        <DataTable.Row> 
                            <DataTable.Cell>Hot dog</DataTable.Cell>
                            <DataTable.Cell>2</DataTable.Cell> 
                            <DataTable.Cell>80</DataTable.Cell>
                        </DataTable.Row>
                    </Button>
                
                    <Button type={'pressable'} onPress={() => { setModalVisibleFood(true) }}>
                        <DataTable.Row> 
                            <DataTable.Cell>Queso oaxaca</DataTable.Cell>
                            <DataTable.Cell>0.5 kg</DataTable.Cell> 
                            <DataTable.Cell>120</DataTable.Cell>
                        </DataTable.Row>
                    </Button>

                    <Button type={'pressable'} onPress={() => {setModalVisibleFood(true)}}>
                        <DataTable.Row> 
                            <DataTable.Cell>Hot dog</DataTable.Cell>
                            <DataTable.Cell>2</DataTable.Cell> 
                            <DataTable.Cell>80</DataTable.Cell>
                        </DataTable.Row>
                    </Button>

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
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                            <FoodCard></FoodCard>
                    </View>
                </ScrollView>
            </FloatingModal>

            <Text style={StyleSheet.create({ fontSize: 32, margin: 24 })}>{LANG[currentLang].Price + ": 280$"}</Text>

            <View style={styles.containerH}>
                <Button onPress={() => {navigation.goBack()}} title={LANG[currentLang].Cancel} />
                <View style={styles.margin} />
                <Button onPress={() => {navigation.goBack()}} title={ LANG[currentLang].UpdateOrder} />
            </View>
        </View>
    )
}

export default OrdersUpdate;