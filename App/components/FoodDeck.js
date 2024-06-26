import React from 'react';
import { View, StyleSheet } from 'react-native';

import FoodCard from './FoodCard';

function FoodDeck () {
    return (
        <View
            style={StyleSheet.create({ flex: 1, flexDirection: 'row'})}
        >
            <FoodCard
                style={StyleSheet.create({ zIndex: 0, transform: [{ rotate: '-35deg' }, { translateX: 50 }, { translateY: 50 }]})}
            ></FoodCard>
            <FoodCard
                style={StyleSheet.create({zIndex: 1})}
            ></FoodCard>
            <FoodCard
                style={StyleSheet.create({ zIndex: 0, transform: [{ rotate: '35deg' }, { translateX: -50 }, { translateY: 50 }]})}
            ></FoodCard>
        </View>
    )
}

export default FoodDeck;