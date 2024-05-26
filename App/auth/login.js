import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput } from 'react-native';

import Button from '../components/Button';
import ThemeContext from './../ThemeContext';

import LANG from './../../lang';

function LogIn() {
  const {
    currentLang, setcurrentLang,
    styles
  } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text>Bienvenido a la aplicacion</Text>
      <TextInput
        style={styles.input}
        placeholder={LANG[currentLang].User}
      />
      <TextInput
        style={styles.input}
        placeholder="Contrsenna"
      />
      <Button onPress={() => {console.log(currentLang)}}>Iniciar sesion</Button>
      <Button onPress={() => {setcurrentLang("ES")}}>es</Button>
      <Button onPress={() => {setcurrentLang("US")}}>us</Button>
      <StatusBar style="auto" />
    </View>
  );
}

export default LogIn;
