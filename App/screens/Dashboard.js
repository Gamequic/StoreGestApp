import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput } from 'react-native';

import ThemeContext from '../ThemeContext';

import LANG from '../../lang';

function DashboardScreen() {
  const {
    currentLang, setcurrentLang,
    styles
  } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title} >{LANG[currentLang].Welcome + ', Demian'}</Text>
      <Text>Dashboard</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default DashboardScreen;
