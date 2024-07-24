import React, { useContext, useState } from "react";
import { Text, View, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRoute } from '@react-navigation/native';

import Button from "../../components/Button";
import FloatingModal from "../../components/FloatingModal";
import DropdownComponent from './../../components/Dropdown';

import MoneyService from '../../services/money.service';

import ThemeContext from '../../ThemeContext';
import styles from "../../style";

import LANG from '../../../lang';

const service = new MoneyService()

function MoneyCreate({ navigation }) {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ selectedDay, setSelectedDay ] = useState(new Date().toISOString().split('T')[0]);
    const [ reason, setReason ] = useState();
    const [ description, setDescription ] = useState("");
    const [ amount, setAmount ] = useState("");
    const [ warning, setWarning ] = useState("");

    const route = useRoute();
    const { remove } = route.params;

    const {
        currentLang, setcurrentLang
    } = useContext(ThemeContext);

    const reasons = [
        { label: 'Ingreso por ventas', value: 'Ingreso por ventas' },
        { label: 'Reembolso de préstamo', value: 'Reembolso de préstamo' },
        { label: 'Inversión', value: 'Inversión' },
        { label: 'Gasto operativo', value: 'Gasto operativo' },
        { label: 'Compra de inventario', value: 'Compra de inventario' },
        { label: 'Pago de salario', value: 'Pago de salario' },
        { label: 'Facturas de servicios públicos', value: 'Facturas de servicios públicos' },
        { label: 'Alquiler', value: 'Alquiler' },
        { label: 'Gasto en marketing', value: 'Gasto en marketing' },
        { label: 'Mantenimiento', value: 'Mantenimiento' },
        { label: 'Gasto misceláneo', value: 'Gasto misceláneo' },
        { label: 'Reembolsos', value: 'Reembolsos' },
        { label: 'Pago de impuestos', value: 'Pago de impuestos' },
        { label: 'Prima de seguro', value: 'Prima de seguro' },
        { label: 'Depósito de efectivo', value: 'Depósito de efectivo' },
        { label: 'Retiro de efectivo', value: 'Retiro de efectivo' },
        { label: 'Pago a proveedores', value: 'Pago a proveedores' },
        { label: 'Pago de clientes', value: 'Pago de clientes' },
      ];
      

    const HandleCreate = () => {
        setWarning("")
        try {
            var tmpAmount
            if (remove) {
                tmpAmount = "-" + amount
            } else {
                tmpAmount = amount
            }
            const rta = service.Create({
                amount: tmpAmount, reason, description
            })
                .then(() => {
                    navigation.goBack()
                })
        } catch (error) {
            setWarning(error.response.data)
        }
    }

    const handleInput = (setValue) => {
        return (text) => {
            setValue(text);
        };
      };

    return (
        <View style={styles.container}>
            {/* <Text>{LANG[currentLang].Date}</Text> */}
            {/* <Button
                title={selectedDay}
                onPress={() => setModalVisible(true)}
            /> */}
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
            <TextInput
                style={styles.input}
                placeholder={LANG[currentLang].Amount}
                keyboardType="numeric"
                value={amount}
                onChangeText={handleInput(setAmount)}
            />
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
                value={description}
                onChangeText={handleInput(setDescription)}
            />
            
            <Text>{warning}</Text>

            <View style={styles.containerH}>
                <Button onPress={() => {navigation.goBack()}} title={LANG[currentLang].Cancel} />
                <View style={styles.margin} />
                <Button onPress={HandleCreate} title={ remove ? LANG[currentLang].Withdraw : LANG[currentLang].Deposit } />
            </View>
        </View>
    )
}

export default MoneyCreate;