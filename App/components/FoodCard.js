import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";

import ThemeContext from './../ThemeContext';
import Button from "./Button";
import FloatingModal from "./FloatingModal";

function FoodCard () {
    const [ floatingModal, setFloatingModal ] = useState(false); 

    const {
        styles
    } = useContext(ThemeContext);

    return (
        <View
            style={StyleSheet.create({
                width: '50%',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
            })}
        >
            <Button
                type='pressable'
                onPress={() => {setFloatingModal(true)}}
            >
                <View
                    style={styles.card}>
                    <Image
                        style={styles.foodImage}
                        source={{
                        uri: 'https://img.freepik.com/foto-gratis/deliciosos-hot-dogs-mostaza-cebolla_23-2148768194.jpg?w=1380&t=st=1718421376~exp=1718421976~hmac=5adfc8f6d06910ccab6ad8ec4dd12ddf2274c1bc3154a517cc83e0ef87d34732',
                        }}
                    />
                    <Text>Hot dog</Text>
                </View>
            </Button>

            <FloatingModal
                visible={floatingModal}
                onClose={() => {setFloatingModal(false)}}
            >
                <Text>Ingrese la cantidad</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Cantidad"}
                />
                <Text>Comprando 2 Hotdogs</Text>
                <Text>Comprando 2 kilos de queso</Text>
            </FloatingModal>
        </View>
    )
};

export default FoodCard;