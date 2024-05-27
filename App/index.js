import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

import ThemeContext from './ThemeContext';
import { saveData, getData } from './localStorage';
import styles from './style';

import LogIn from './auth/login';

export default function App() {
  const [ currentLang, setcurrentLang ] = useState('ES');
  const [ colorScheme, setColorScheme ] = useState(useColorScheme());

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await saveData('Lang', 'ES');
        const storedLang = await getData('Lang', 'ES');
        setcurrentLang(storedLang);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const Context = {
    currentLang, setcurrentLang,
    styles,
    colorScheme, setColorScheme
  }

  return (
    <ThemeContext.Provider value={Context}>
      <LogIn />
    </ThemeContext.Provider>
  );
}
