import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';

import ThemeContext from './../ThemeContext';
import Button from "./Button";
import FloatingModal from "./FloatingModal";

import LANG from "./../../lang";

function FoodCard ({ ID, screen, style, name, price, isKg }) {
    const [ floatingModal, setFloatingModal ] = useState(false); 
    const navigation = useNavigation();

    const {
        currentLang, setcurrentLang,
        styles
    } = useContext(ThemeContext);

    const handleButton = () => {
        if ( screen ) {
            return () => {navigation.navigate(screen, { ID });
        }
        } else { 
            return () => {setFloatingModal(true);}
        }
    }

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
                        uri: 'https://w7.pngwing.com/pngs/2/583/png-transparent-hamburger-fast-food-cheeseburger-vegetarian-cuisine-vactor-food-cheese-cheeseburger.png',
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
                />
                <Text>2 Hotdogs</Text>
                <Text>2 kilos de queso</Text>
            </FloatingModal>
        </View>
    )
};

export default FoodCard;