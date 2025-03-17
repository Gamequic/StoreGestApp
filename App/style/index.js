import { StyleSheet } from "react-native";

const colors = {
  background: '#ffffff',

  red: "#CE430B",
  green: '#36EC1D',

  textInput: '#F9F3ED',
  button: '#7597a1',

  desert1: '#e9ac6d',
  desert2: '#eec185',
  desert3: 'f4a854',
  desert4: '#f9eab6',
  desert5: '#ffffce',

  margin: 4,
}

const styles = StyleSheet.create({
    backgroundBlue: {
      backgroundColor: "#0482d6",
      height: "40%",
      width: "100%",
      alignItems: 'center',
      position: "absolute",
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerH: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      justifyContent: 'center'
    },
    containerL: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerHL: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: "#ccd6db",
      borderRadius: 12,
      padding: 4,
      margin: colors.margin,
      alignItems: 'center',
      justifyContent: 'center',
      margin: colors.margin,
      shadowColor: "purple",
      shadowOffset: {
        width: 6,
        height: 6,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 16, // Android
    },
    cardF: {
      backgroundColor: "#e1ecf2",
      borderRadius: 12,
      padding: 4,
      margin: colors.margin*6,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "purple",
      shadowOffset: {
        width: 6,
        height: 6,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 16, // Android
      flex: 1,
      marginVertical: 4,
    },
    margin: {
      margin: colors.margin
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
    foodImage: {
      width: 120,
      height: 120,
      borderRadius: 12,
      margin: colors.margin
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
    buttonWarning: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: colors.red,
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
    title2: {
      fontSize: 24
    },
    title2White: {
      fontSize: 24,
      color: 'white'
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