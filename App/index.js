import { useState, useEffect, useContext } from 'react';
import { useColorScheme, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import ThemeContext from './ThemeContext';
import { saveData, getData } from './localStorage';
import styles from './style';
import { TabNavigator } from './components/NavigationTabs';

import LogIn from './auth/login';

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [currentLang, setCurrentLang] = useState('ES');
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await saveData('Lang', 'ES');
        const storedLang = await getData('Lang') || 'ES';
        setCurrentLang(storedLang);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const contextValue = {
    currentLang,
    setCurrentLang,
    styles,
    colorScheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {isLogged ? (
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      ) : (
        <LogIn setLogin={setIsLogged} />
      )}
    </ThemeContext.Provider>
  );
}
