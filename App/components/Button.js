import React, { useContext, useRef, useState } from 'react';
import { Text, Pressable, Animated, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ThemeContext from '../ThemeContext';

import FloatingModal from './FloatingModal';

import LANG from './../../lang';

function Button({ icon, type, onPress, title, children }) {
    const { styles, currentLang } = useContext(ThemeContext);

    const [ modalVisible, setModalVisible ] = useState(false);

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
    } else if (type === 'pressable') {
        return (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={onPress}
                    style={buttonStyle}
                >
                    {children}
                </Pressable>
            </Animated.View>
        )
    } else if (type === "Warning") {

        const warningOnPress = () => {
            setModalVisible(true)
        }

        return (
            <>
                <FloatingModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                >
                    <Text style={[styles.title2, StyleSheet.create({textAlign: "center"})]}>{LANG[currentLang].AreYouSure}</Text>
                    <Animated.View style={{ transform: [{ scale: scaleValue }], margin: 4 }}>
                        <Pressable
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            onPress={onPress}
                            style={styles.buttonWarning}
                        >
                            <Text style={styles.text}>{LANG[currentLang].Continue}</Text>
                        </Pressable>
                    </Animated.View>
                </FloatingModal>
                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                    <Pressable
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={warningOnPress}
                        style={styles.buttonWarning}
                    >
                        <Text style={styles.text}>{title}</Text>
                    </Pressable>
                </Animated.View>
            </>
        );
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
