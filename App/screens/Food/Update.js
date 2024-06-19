import React, { useContext, useState } from "react";
import { Text, View, TextInput, Image } from "react-native";
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';

import Button from "../../components/Button";

import ThemeContext from '../../ThemeContext';
import styles from "../../style";

import LANG from '../../../lang';

function FoodUpdate({ navigation }) {
    const [ selectedImage, setSelectedImage ] = useState(require('./../../../assets/defaultFood.png'));
    const [ isKg, setIsKg ] = useState(false);

    const {
        currentLang, setcurrentLang
    } = useContext(ThemeContext);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
            setSelectedImage({ uri: result.assets[0].uri })
        } else {
          alert('You did not select any image.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={selectedImage}
                style={styles.image}
            />
            <Button onPress={() => {pickImageAsync()}} title={LANG[currentLang].Image} />
            <Text>{LANG[currentLang].Name}</Text>
            <TextInput style={styles.input} placeholder={LANG[currentLang].Name} />
            <Text>{isKg ? LANG[currentLang].PriceKG : LANG[currentLang].PriceUnit}</Text>
            <TextInput
                style={styles.input}
                placeholder={isKg ? LANG[currentLang].PriceKG : LANG[currentLang].PriceUnit}
                keyboardType="numeric"
            />

            <View style={[ styles.containerH, styles.margin ]}>
                <Checkbox
                    value={isKg}
                    onValueChange={setIsKg}
                    color={isKg ? '#4630EB' : undefined}
                />
                <View style={styles.margin} />
                <Text>Kg</Text>
            </View>

            <View style={[ styles.containerH, styles.margin ]}>
                <Button onPress={() => {navigation.goBack()}} title={LANG[currentLang].Cancel} />
                <View style={styles.margin} />
                <Button onPress={() => {navigation.goBack()}} title={ LANG[currentLang].AddToMenu } />
            </View>
            <Button onPress={() => {navigation.goBack()}} title={ LANG[currentLang].Delete } />
        </View>
    )
}

export default FoodUpdate;