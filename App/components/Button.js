import React, { useContext, useRef } from 'react';
import { Text, Pressable, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ThemeContext from '../ThemeContext';

function Button({ icon, type, onPress, title }) {
    const { styles } = useContext(ThemeContext);

    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 1.1,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const buttonStyle = styles[type] || styles.buttonPrimary;

    if (type === 'buttonBigGreen' || type === 'buttonBigRed') {
        return (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={onPress}
                    style={buttonStyle}
                >
                    <Text style={styles.titleWhite}>{title}</Text>
                    <MaterialCommunityIcons name={icon} color={'#ffffff'} size={64} />
                </Pressable>
            </Animated.View>
        )
    } else {
        return (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={onPress}
                    style={styles.buttonPrimary}
                >
                    <Text style={styles.text}>{title}</Text>
                </Pressable>
            </Animated.View>
        );
    }
}

export default Button;
