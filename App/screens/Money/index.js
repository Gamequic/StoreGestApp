import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import Button from '../../components/Button'

import ThemeContext from '../../ThemeContext';

import LANG from '../../../lang';

function MoneyScreen({ navigation }) {
  const {
    currentLang, setcurrentLang,
    styles
  } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title} >{LANG[currentLang].Balance + ": 100$"}</Text>
      <Button
        title={LANG[currentLang].DepositMoney}
        type={'buttonBigGreen'}
        icon={'cash-plus'}
        onPress={() => navigation.navigate('MoneyUpdate')}
      />
      <Button
        title={LANG[currentLang].Withdrawals}
        type={'buttonBigRed'}
        icon={'cash-minus'}
        onPress={() => navigation.navigate('MoneyUpdate')}
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