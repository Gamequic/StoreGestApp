import React, { useContext, useState } from "react";
import { View } from "react-native";
import { DataTable } from 'react-native-paper'; 
import { ScrollView, StyleSheet } from "react-native";

import { Calendar } from "react-native-calendars";
import Button from "../../components/Button";
import FloatingModal from "../../components/FloatingModal";

import ThemeContext from '../../ThemeContext';

import LANG from '../../../lang';

function MoneyRecord () {
    const [ modalVisible, setModalVisible ] = useState(false);
    // Get current date
    const [ selectedDay, setSelectedDay ] = useState(new Date().toISOString().split('T')[0]);

    const {
        currentLang, setcurrentLang,
        styles
      } = useContext(ThemeContext);

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
                    <Button type={'pressable'}>
                        <DataTable.Row> 
                            <DataTable.Cell>23-12-12</DataTable.Cell>
                            <DataTable.Cell>1200</DataTable.Cell> 
                            <DataTable.Cell>sell</DataTable.Cell>
                            <DataTable.Cell>hotdog</DataTable.Cell> 
                        </DataTable.Row>
                    </Button>
                
                    <Button type={'pressable'}>
                        <DataTable.Row> 
                            <DataTable.Cell>23-12-12</DataTable.Cell>
                            <DataTable.Cell>1200</DataTable.Cell> 
                            <DataTable.Cell>sell</DataTable.Cell>
                            <DataTable.Cell>Cangreburger</DataTable.Cell> 
                        </DataTable.Row>
                    </Button>
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
                                console.log(day.dateString);
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