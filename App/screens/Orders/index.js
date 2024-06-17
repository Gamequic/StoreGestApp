import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import Button from '../../components/Button'

import ThemeContext from '../../ThemeContext';

import LANG from '../../../lang';

function OrderScreen({ navigation }) {
  const {
    currentLang, setcurrentLang,
    styles
  } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Button
        title={LANG[currentLang].GenerateOrder}
        type={'buttonBigGreen'}
        icon={'food'}
        onPress={() => navigation.navigate('OrdersCreate', {remove: false})}
      />
      <Button
        title={LANG[currentLang].Record}
        onPress={() => navigation.navigate('OrdersRecord')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default OrderScreen;