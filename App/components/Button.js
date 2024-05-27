import React, { useContext, useRef } from 'react';
import { Text, Pressable, Animated } from 'react-native';

import ThemeContext from '../ThemeContext';

function Button({ onPress, title }) {
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

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={styles.button}
            >
                    <Text style={styles.text}>{title}</Text>
            </Pressable>
        </Animated.View>
    );
}

export default Button;
