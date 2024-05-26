import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error on saving file: ', error);
  }
};

const getData = async (key, defaultValue) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return defaultValue;
    }
  } catch (error) {
    console.error('Error on safe files:', error);
    return defaultValue;
  }
};

export { saveData, getData };
