import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, StyleSheet } from 'react-native';

import ThemeContext from './../../ThemeContext';

import FoodCard from './../../components/FoodCard';
import Button from './../../components/Button';

function FoodScreen({ navigation }) {
  const {
    currentLang, setcurrentLang,
    styles
  } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={StyleSheet.create({
            flexGrow: 1,
            justifyContent: 'flex-start',
            })}
        >
            <View
                style={StyleSheet.create({
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                })}
            >
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
                <FoodCard screen></FoodCard>
            </View>
        </ScrollView>
        <View style={styles.margin}>
          <Button
            title={'Agregar comida'}
            onPress={() => {navigation.navigate('FoodCreate')}}
          />
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default FoodScreen;