import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Image } from 'expo-image';

import Button from '../components/Button';

import ThemeContext from './../ThemeContext';

import LANG from './../../lang';

function LogIn({ setLogin }) {
  const {
    currentLang, setcurrentLang,
    styles
  } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title} >{LANG[currentLang].Welcome}</Text>
      <Image
        style={styles.image}
        source={require('./../../assets/icon.png')}
      />
      <TextInput
        style={styles.input}
        placeholder={LANG[currentLang].User}
      />
      <TextInput
        style={styles.input}
        placeholder={LANG[currentLang].Password}
      />
      <Button
        title={LANG[currentLang].LogIn}
        onPress={() => {setLogin(true)}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default LogIn;
