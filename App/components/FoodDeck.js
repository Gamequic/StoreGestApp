import React from 'react';
import { View, StyleSheet } from 'react-native';

import PhotoService from './../services/photos.service';

import FoodCard from './FoodCard';

const service = new PhotoService();

function FoodDeck ( productData ) {
    const firstProduct = productData?.productData?.[0];
    const secondProduct = productData?.productData?.[1];
    const thirdProduct = productData?.productData?.[2];

    return (
        <View
            style={StyleSheet.create({
                flex: 1,
                flexDirection: 'row',
                position: "absolute",
                transform: [{ translateY: 25 }],
                zIndex: 2
            })}
        >
            {
                secondProduct ? (
                    <FoodCard
                        style={StyleSheet.create({ zIndex: 0, transform: [{ rotate: '-35deg' }, { translateX: 50 }, { translateY: 75 }]})}
                        photo={service.FindOne(secondProduct.Photo)}
                        name={secondProduct.Name}
                        isKg={secondProduct.Name}
                        price={secondProduct.Amount}
                        onlyVisual
                    ></FoodCard>
                ) : undefined
            }
            {
                firstProduct ? (
                    <FoodCard
                        style={StyleSheet.create({zIndex: 1})}
                        photo={service.FindOne(firstProduct.Photo)}
                        name={firstProduct.Name}
                        isKg={firstProduct.Name}
                        price={firstProduct.Amount}
                        onlyVisual
                    ></FoodCard>
                ) : undefined
            }
            {
                thirdProduct ? (
                    <FoodCard
                        style={StyleSheet.create({ zIndex: 0, transform: [{ rotate: '35deg' }, { translateX: -50 }, { translateY: 90 }]})}
                        photo={service.FindOne(thirdProduct.Photo)}
                        name={thirdProduct.Name}
                        isKg={thirdProduct.Name}
                        price={thirdProduct.Amount}
                        onlyVisual
                    ></FoodCard>
                ) : undefined
            }
        </View>
    )
}

export default FoodDeck;