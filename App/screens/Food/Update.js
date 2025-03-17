import React, { useContext, useState, useCallback } from "react";
import { Text, View, TextInput, Image } from "react-native";
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import Button from "../../components/Button";

import FoodService from "../../services/food.service";
import PhotoService from './../../services/photos.service';

import ThemeContext from '../../ThemeContext';
import styles from "../../style";

import LANG from '../../../lang';

const service = new FoodService();
const photoService = new PhotoService();

function FoodUpdate({ navigation }) {
    const [ selectedImage, setSelectedImage ] = useState();
    const [ anotherImage, setAnotherImage ] = useState(false);
    const [ photoName, setPhotoName ] = useState("");
    const [ name, setName ] = useState();
    const [ amount, setAmount ] = useState();
    const [ isKg, setIsKg ] = useState(false);
    const [ warning, setWarning ] = useState();

    const route = useRoute();
    const { ID } = route.params;

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
            setAnotherImage(true)
        } else {
          alert('You did not select any image.');
        }
    };

    const UpdateFind = async () => {
        const food = await service.FindOne(ID);
        setName(food.Name)
        setAmount(String(food.Amount))
        setIsKg(food.IsKg)
        setSelectedImage(food.Photo)
        setPhotoName(food.Photo)
    }

    const HandleUpdate = async () => {
        setWarning();
        try {
            const rta = await service.Update({
                ID,
                Amount: Number(amount),
                Name: name,
                IsKg: Boolean(isKg),
                Photo: photoName
            })
            console.log(anotherImage)
            if (anotherImage) {
                photoService.Update(selectedImage, photoName)
            }
            navigation.goBack()
        } catch (error) {
            setWarning(error.response.data)
        }
    }

    const HandleDelete = async () => {
        setWarning();
        try {
            const rta = await service.Delete(ID)
            navigation.goBack()
        } catch (error) {
            setWarning(error.response.data)
        }
    }
    
    useFocusEffect(
        useCallback(() => {
            UpdateFind();
        }, [])
    );

      const handleInput = (setValue) => {
        return (text) => {
            setValue(text);
        };
    };

    return (
        <View style={styles.container}>
            <Image
                source={ anotherImage ? selectedImage : {uri: photoService.FindOne(selectedImage)}}
                style={styles.image}
            />
            <Button onPress={() => {pickImageAsync()}} title={LANG[currentLang].Image} />
            <Text>{LANG[currentLang].Name}</Text>
            <TextInput
                style={styles.input}
                placeholder={LANG[currentLang].Name}
                value={name}
                onChangeText={handleInput(setName)}
            />
            <Text>{isKg ? LANG[currentLang].PriceKG : LANG[currentLang].PriceUnit}</Text>
            <TextInput
                style={styles.input}
                placeholder={isKg ? LANG[currentLang].PriceKG : LANG[currentLang].PriceUnit}
                keyboardType="numeric"
                value={amount}
                onChangeText={handleInput(setAmount)}
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

            <Text>{warning}</Text>

            <View style={[ styles.containerH, styles.margin ]}>
                <Button onPress={() => {navigation.goBack()}} title={LANG[currentLang].Cancel} />
                <View style={styles.margin} />
                <Button onPress={HandleUpdate} title={ LANG[currentLang].UpdateMenu } />
            </View>
            <Button onPress={HandleDelete} title={ LANG[currentLang].Delete } type={"Warning"} />
        </View>
    )
}

export default FoodUpdate;