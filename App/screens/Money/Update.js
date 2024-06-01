import React, { useContext, useState } from "react";
import { Text, View, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";

import Button from "../../components/Button";
import FloatingModal from "../../components/FloatingModal";
import DropdownComponent from './../../components/Dropdown';

import ThemeContext from '../../ThemeContext';
import styles from "../../style";

import LANG from '../../../lang';

function MoneyUpdate({ navigation }) {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ selectedDay, setSelectedDay ] = useState(new Date().toISOString().split('T')[0]);
    const [ reason, setReason ] = useState();

    const {
        currentLang, setcurrentLang
    } = useContext(ThemeContext);

    const reasons = [
      { label: 'Item 1', value: '1' },
      { label: 'Item 2', value: '2' },
      { label: 'Item 3', value: '3' },
      { label: 'Item 4', value: '4' },
      { label: 'Item 5', value: '5' },
      { label: 'Item 6', value: '6' },
      { label: 'Item 7', value: '7' },
      { label: 'Item 8', value: '8' },
    ];

    return (
        <View style={styles.container}>
            <Text>{LANG[currentLang].Date}</Text>
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
            <Text>{LANG[currentLang].Amount}</Text>
            <TextInput style={styles.input} placeholder={LANG[currentLang].Amount} />
            <Text>{LANG[currentLang].Reason}</Text>
            <DropdownComponent
                placeholder={LANG[currentLang].Reason}
                data={reasons}
                value={reason}
                setValue={setReason}
            />
            <Text>{LANG[currentLang].Description}</Text>
            <TextInput
                style={styles.input}
                placeholder={LANG[currentLang].Description}
                multiline
                numberOfLines={4}
            />

            <View style={styles.containerH}>
                <Button onPress={() => {navigation.goBack()}} title={LANG[currentLang].Cancel} />
                <View style={styles.margin} />
                <Button onPress={() => {navigation.goBack()}} title={LANG[currentLang].Apply} />
            </View>
        </View>
    )
}

export default MoneyUpdate;