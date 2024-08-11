import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';

import ThemeContext from './../ThemeContext';
import Button from "./Button";
import FloatingModal from "./FloatingModal";

import LANG from "./../../lang";

function FoodCard ({ ID, screen, style, photo, name, price, isKg, list, setList, callback, onlyVisual }) {
    const [ floatingModal, setFloatingModal ] = useState(false); 
    const [ amount, setAmount ] = useState(0);
    const navigation = useNavigation();

    const {
        currentLang, setcurrentLang,
        styles
    } = useContext(ThemeContext);

    const handleButton = () => {
        if ( screen ) {
            return () => {navigation.navigate(screen, { ID });
        }
        } else if (onlyVisual) {
            return () => {}
        } else { 
            return () => {setFloatingModal(true);}
        }
    }

    const handleAddToList = () => {
        const tempList = list;
        let isOnList = false;

        // Check if is not in the list
        tempList.forEach((food, index) => {
            if (food.ID === ID) {
                isOnList = true;
                tempList[index].Amount = Number(tempList[index].Amount) + Number(amount);
                tempList[index].Price = Number(tempList[index].Price) + Number(amount)*Number(price);
            }
        })
        if (!isOnList) { 
            tempList.push({
                "Name": name,
                "Amount": amount,
                "Price": Number(amount)*Number(price),
                "IsKg": isKg,
                "ID": ID
            });
        }
        setList(tempList);
        callback();
        setFloatingModal(false);
    }

    const handleInput = (setValue) => {
        return (text) => {
            setValue(text);
        };
    };

    return (
        <View
            style={[StyleSheet.create({
                width: '50%',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }), style]}
        >
            <Button
                type='pressable'
                onPress={handleButton()}
            >
                <View
                    style={styles.card}>
                    <Image
                        style={styles.foodImage}
                        source={{
                            uri: photo ? photo : 'https://w7.pngwing.com/pngs/2/583/png-transparent-hamburger-fast-food-cheeseburger-vegetarian-cuisine-vactor-food-cheese-cheeseburger.png'                           ,
                        }}
                    />
                    <Text>{name}</Text>
                    <Text>{price}{isKg ? "/kg" : " unit"}</Text>
                </View>
            </Button>

            <FloatingModal
                visible={floatingModal}
                onClose={() => {setFloatingModal(false)}}
            >
                <Text>{LANG[currentLang].Amount}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={LANG[currentLang].Amount}
                    keyboardType="numeric"
                    onChangeText={handleInput(setAmount)}
                    value={amount}
                />
                <Text>{amount}{isKg ? "kg " : " "}{name}</Text>
                <Button
                    title={LANG[currentLang].AddMeal}
                    onPress={handleAddToList}
                />
                <View style={styles.margin} />
            </FloatingModal>
        </View>
    )
};

export default FoodCard;