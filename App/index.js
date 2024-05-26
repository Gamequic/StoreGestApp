import { useState, useEffect } from 'react';

import ThemeContext from './ThemeContext';
import { saveData, getData } from './localStorage';
import styles from './style';

import LogIn from './auth/login';

export default function App() {
  const [ currentLang, setcurrentLang ] = useState('ES');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await saveData('Lang', 'ES');
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
    styles
  }

  return (
    <ThemeContext.Provider value={Context}>
      <LogIn />
    </ThemeContext.Provider>
  );
}
