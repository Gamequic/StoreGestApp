import React, { useContext } from 'react';
import { Modal, View, Button, StyleSheet } from 'react-native';

import ThemeContext from './../ThemeContext';

import LANG from './../../lang';

const FloatingModal = ({ visible, onClose, children }) => {
    const {
        currentLang, setcurrentLang,
    } = useContext(ThemeContext);
  
    return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <Button title={LANG[currentLang].Close} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FloatingModal;
