import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { DataTable } from 'react-native-paper'; 
import { ScrollView, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useFocusEffect } from '@react-navigation/native';

import MoneyService from "./../../services/money.service";

import Button from "../../components/Button";
import FloatingModal from "../../components/FloatingModal";

import ThemeContext from '../../ThemeContext';

import LANG from '../../../lang';

const service = new MoneyService()

function MoneyRecord ({ navigation }) {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ moneyRecordUx, setMoneyRecordUx ] = useState();
    // Get current date
    const [ selectedDay, setSelectedDay ] = useState(new Date().toISOString().split('T')[0]);

    const {
        currentLang, setcurrentLang,
        styles
    } = useContext(ThemeContext);

    const HandleRecord = async () => {
        const MoneyRecord = await service.GetRecordByDate(selectedDay);
        let MoneyRecordTmp = [];
    
        // Function to the format the date
        const formatDateTime = (dateTimeString) => {
            const date = new Date(dateTimeString);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            return `${formattedDate}\n${formattedTime}`;
        };
    
        for (let Money in MoneyRecord) {
            MoneyRecordTmp.push(
                // <Button key={Money} type={'pressable'} onPress={() => { navigation.navigate('MoneyUpdate') }}>
                <Button key={Money} type={'pressable'}>
                    <DataTable.Row>
                        <DataTable.Cell><Text>{formatDateTime(MoneyRecord[Money].CreatedAt)}</Text></DataTable.Cell>
                        <DataTable.Cell>{MoneyRecord[Money].Amount}</DataTable.Cell>
                        <DataTable.Cell>{MoneyRecord[Money].Reason}</DataTable.Cell>
                        <DataTable.Cell>{MoneyRecord[Money].Description}</DataTable.Cell>
                    </DataTable.Row>
                </Button>
            );
        }
        setMoneyRecordUx(MoneyRecordTmp);
    };

    useFocusEffect(
        useCallback(() => {
            HandleRecord();
        }, [])
    );

    // Reload list when selectedDay change
    useEffect(() => {
        if (selectedDay) {
            HandleRecord();
        }
    }, [selectedDay]);

    return (
        <View style={styles.container}>
            <DataTable> 
                <DataTable.Header>
                    <DataTable.Title>{LANG[currentLang].Date}</DataTable.Title> 
                    <DataTable.Title>{LANG[currentLang].Amount}</DataTable.Title> 
                    <DataTable.Title>{LANG[currentLang].Reason}</DataTable.Title>
                    <DataTable.Title>{LANG[currentLang].Description}</DataTable.Title> 
                </DataTable.Header>

                <ScrollView
                    style={StyleSheet.create({ height: '75%'})}
                >
                    {moneyRecordUx}
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

export default MoneyRecord;