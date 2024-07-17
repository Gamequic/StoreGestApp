import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Switch } from 'react-native';
import { Image } from 'expo-image';

import AuthService from './../services/auth.service';

import Button from './../components/Button';

import ThemeContext from './../ThemeContext';

import LANG from './../../lang';

const Service = new AuthService();

function LogIn({ setLogin }) {
  const {
    currentLang,
    styles
  } = useContext(ThemeContext);
  
  const [ message, setMessage ] = useState("");
  const [ email, setEmail ] = useState('demiancalleros0@gmail.com');
  const [ password, setPassword ] = useState('12345678');
  const [ showPassword, setShowPassword ] = useState(false);

  const handleLogIn = async () => {
    setMessage("")
    try {
      await Service.LogIn({email, password});
    } catch (error) {
      if (error.message === "Request failed with status code 404") {
        setMessage(LANG[currentLang]["404"])
      }
      if (error.message === "Request failed with status code 401") {
        setMessage(LANG[currentLang]["401"])
      }
    }
  };

  const handleInput = (setValue) => {
    return (text) => {
      setValue(text);
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{LANG[currentLang].Welcome}</Text>
      <Image
        style={styles.image}
        source={require('./../../assets/icon.png')}
      />
      <TextInput
        style={styles.input}
        placeholder={LANG[currentLang].User}
        value={email}
        onChangeText={handleInput(setEmail)}
      />
      <TextInput
        style={styles.input}
        placeholder={LANG[currentLang].Password}
        value={password}
        onChangeText={handleInput(setPassword)}
        secureTextEntry={!showPassword}
      />
      {message && <Text>{message}</Text>}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{LANG[currentLang].ShowPassword}</Text>
        <Switch
          value={showPassword}
          onValueChange={setShowPassword}
        />
      </View>
      <Button
        title={LANG[currentLang].LogIn}
        onPress={handleLogIn}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default LogIn;
