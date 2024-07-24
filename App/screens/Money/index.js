import { useState, useContext, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Button from '../../components/Button'
import MoneyService from '../../services/money.service';

import ThemeContext from '../../ThemeContext';

import LANG from '../../../lang';

const service = new MoneyService()

function MoneyScreen({ navigation }) {
  const [ amount, setAmount ] = useState("0")

  const {
    currentLang, setcurrentLang,
    styles
  } = useContext(ThemeContext);

  const UpdateLastOne = async () => {
    const LastOne = await service.FindLastOne()
    setAmount(LastOne.Current)
  }
  useFocusEffect(
    useCallback(() => {
      UpdateLastOne();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title} >{LANG[currentLang].Balance + ": " + amount + "$"}</Text>
      <Button
        title={LANG[currentLang].DepositMoney}
        type={'buttonBigGreen'}
        icon={'cash-plus'}
        onPress={() => navigation.navigate('MoneyCreate', {remove: false})}
      />
      <Button
        title={LANG[currentLang].Withdrawals}
        type={'buttonBigRed'}
        icon={'cash-minus'}
        onPress={() => navigation.navigate('MoneyCreate', {remove: true})}
      />
      <Button
        title={LANG[currentLang].Record}
        onPress={() => navigation.navigate('MoneyRecord')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default MoneyScreen;