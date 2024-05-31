import { StyleSheet } from "react-native";

const colors = {
  background: '#fffff0',

  red: "#CE430B",
  green: '#36EC1D',

  textInput: '#F9F3ED',
  button: '#DE925A',

  desert1: '#e9ac6d',
  desert2: '#eec185',
  desert3: 'f4a854',
  desert4: '#f9eab6',
  desert5: '#ffffce',
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerH: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors.background,
      justifyContent: 'center'
    },
    input: {
      height: "1rem",
      width: "80%",
      margin: 12,
      padding: 10,
      borderRadius: 8,
      backgroundColor: colors.textInput
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 18,
    },
    buttonPrimary: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: colors.button,
    },
    buttonBigRed: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: colors.red,
      width: 250,
      height: 200,
      margin: 10
    },
    pressable: {},
    buttonBigGreen: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: colors.green,
      width: 250,
      height: 200,
      margin: 10
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    title: {
      fontSize: 32
    },
    titleWhite: {
      fontSize: 32,
      color: 'white'
    }
  }
);

export default styles